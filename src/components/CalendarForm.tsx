import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material"
import { textFieldStyle } from "../customStyles"
import { EventType } from "../types"
import { ChangeEvent } from "react"

interface Props {
    dialogTitle: string
    open: boolean
    onClose: () => void
    submitBtnText: string
    onSubmit: () => Promise<void>
    event: EventType,
    setEvent: React.Dispatch<React.SetStateAction<EventType>>
}

export default function CalendarForm({ dialogTitle, open, onClose, submitBtnText, onSubmit, event, setEvent }: Props) {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent((prev: EventType) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <TextField
                    value={event.title}
                    onChange={onInputChange}
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Event Title"
                    InputProps={{ sx: textFieldStyle }}
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    value={event.note}
                    onChange={onInputChange}
                    margin="dense"
                    label="Note"
                    name="note"
                    InputProps={{ sx: textFieldStyle }}
                    type="text"
                    multiline
                    rows={6}
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit}>{submitBtnText}</Button>
            </DialogActions>
        </Dialog>
    )
}