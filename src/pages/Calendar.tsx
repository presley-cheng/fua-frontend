import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Box } from '@mui/material'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventDropArg } from '@fullcalendar/core/index.js'

import { EventType } from '../types'
import { serverUrl } from '../constants'
import { appContext } from '../context'
import CalendarForm from '../components/CalendarForm'

export default function Calendar() {
    const [events, setEvents] = useState<EventType[]>([])
    const [event, setEvent] = useState<EventType>({ title: "", note: "", date: "" })
    const [open, setOpen] = useState<boolean>(false)

    const { setError } = useContext(appContext)
    const navigator = useNavigate()

    const [formTitle, setFormTitle] = useState("")
    const [btnText, setBtnText] = useState("")
    const [selectedDate, setSelectedDate] = useState("")

    const handleCloseForm = () => {
        setEvent({ title: "", note: "", date: "" })
        setOpen(false)
    }

    const handleUpdate = async () => {
        try {
            const resp = await fetch(serverUrl + "/calendar", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            })

            if (!resp.ok) {
                if (resp.status === 401) {
                    navigator("/login")
                }
                throw new Error('Error updating event: please sign in before proceeding')
            }

            setEvents(prev => prev.map(item => {
                if (item.id === event.id) {
                    item.title = event.title
                    item.note = event.note
                    item.date = event.date
                }

                return item
            }))
        } catch (err) {
            console.error(err)
            setError((err as Error).message)
        } finally {
            handleCloseForm()
        }
    }

    const handleCreate = async () => {
        try {
            const resp = await fetch(serverUrl + "/calendar", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...event,
                    date: selectedDate
                })
            })
            const data = await resp.json()

            if (!resp.ok) {
                if (resp.status === 401) {
                    navigator("/login")
                }
                throw new Error(data.error)
            }

            setEvents(prev => [...prev, data])
        } catch (err) {
            console.error(err)
            setError((err as Error).message)
        } finally {
            handleCloseForm()
        }
    }

    // TODO: update event in db by event id and update event state
    const onEventDrop = (info: EventDropArg) => {
        console.log(info.oldEvent.start)
        console.log(info.event.start)
    }

    // TODO: show an edit (with delete option) dialog for event details (start/end time, notes, ...)
    const onEventClick = (info: EventClickArg) => {
        const targetEvent = events.find(event => event.id === info.event.id)
        if (!targetEvent) {
            setError("unexpected error: cannot find event")
            return
        }

        setEvent(targetEvent)
        setFormTitle("Update Event")
        setBtnText("Update")
        setOpen(true)
    }

    const onDateClick = (info: DateClickArg) => {
        setFormTitle("Create Event")
        setBtnText("Create")
        setSelectedDate(info.dateStr)
        setOpen(true)
    }

    const getEvents = async () => {
        try {
            const resp = await fetch(serverUrl + "/calendar", {
                method: "GET",
                credentials: "include"
            })
            const data = await resp.json()

            if (!resp.ok) {
                if (resp.status === 401) {
                    navigator("/login")
                }
                throw new Error(data.error)
            }

            setEvents(data)
        } catch (err) {
            console.error(err)
            setError((err as Error).message)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getEvents().then() }, [])
    return (
        <Box sx={{
            padding: "1rem",
            display: 'flex',
            flexDirection: 'column',
            height: '92vh'
        }}>
            <Paper
                style={{ backgroundColor: "#f2e7d2" }}
                elevation={5}
                sx={{ padding: "1rem", flex: 1 }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    editable={true}
                    height={"100%"}
                    events={events}
                    eventDrop={onEventDrop}
                    eventClick={onEventClick}
                    dateClick={onDateClick}
                />
            </Paper>
            <CalendarForm
                dialogTitle={formTitle}
                submitBtnText={btnText}
                onSubmit={btnText === "Create" ? handleCreate : handleUpdate}
                open={open}
                onClose={handleCloseForm}
                event={event}
                setEvent={setEvent}
            />
        </Box>
    )
}