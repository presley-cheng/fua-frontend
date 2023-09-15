import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Box } from '@mui/material'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventDropArg } from '@fullcalendar/core/index.js'

import { EventType, CalendarFormMeta } from '../types'
import { serverUrl } from '../constants'
import { appContext } from '../context'
import CalendarForm from '../components/CalendarForm'

export default function Calendar() {
    const [events, setEvents] = useState<EventType[]>()
    const [event, setEvent] = useState<EventType>({ title: "", note: "", date: "" })
    const [open, setOpen] = useState<boolean>(false)
    const [formMeta, setFormMeta] = useState<CalendarFormMeta>()
    const { setError } = useContext(appContext)
    const navigator = useNavigate()

    // TODO: update event in db by event id and update event state
    const onEventDrop = (info: EventDropArg) => {
        console.log(info.oldEvent.start)
        console.log(info.event.start)
    }

    // TODO: show an edit (with delete option) dialog for event details (start/end time, notes, ...)
    const onEventClick = (info: EventClickArg) => {
        console.log(info.event.id)
        console.log(info.event.start)
        setFormMeta({
            title: "Update Event",
            submitBtn: "Update",
            onSubmit: async () => {
                console.log("update!")
            }
        })
        setOpen(true)
    }

    // TODO: show a create event dialog with date filled in
    const onDateClick = (info: DateClickArg) => {
        setFormMeta({
            title: "Create Event",
            submitBtn: "Create",
            onSubmit: async () => {
                console.log("create!")
            }
        })
        setOpen(true)
        console.log(info.date + " clicked")
    }

    const handleCloseForm = () => {
        setEvent({ title: "", note: "", date: "" })
        setOpen(false)
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

            console.log(data)
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
            {
                formMeta &&
                <CalendarForm
                    dialogTitle={formMeta.title}
                    submitBtnText={formMeta.submitBtn}
                    onSubmit={formMeta.onSubmit}
                    open={open}
                    onClose={handleCloseForm}
                    event={event}
                    setEvent={setEvent}
                />
            }
        </Box>
    )
}