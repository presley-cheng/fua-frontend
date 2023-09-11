import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Paper, Box } from '@mui/material'
import { EventClickArg, EventDropArg } from '@fullcalendar/core/index.js'

const events = [
    {
        id: "1",
        title: 'Event 1',
        start: '2023-09-11T10:00:00',
        end: '2023-09-11T12:00:00',
    },
    {
        id: "2",
        title: 'Event 2',
        start: '2023-09-12T14:00:00',
        end: '2023-09-12T16:00:00',
    },
]

export default function Calendar() {

    // TODO: update event in db by event id and update event state
    const onEventDrop = (info: EventDropArg) => {
        console.log(info.oldEvent.start)
        console.log(info.event.start)
    }

    // TODO: show a dialog for event details (start/end time, notes, ...)
    const onEventClick = (info: EventClickArg) => {
        console.log(info.event.id)
        console.log(info.event.start)
    }

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
                />
            </Paper>
        </Box>
    )
}