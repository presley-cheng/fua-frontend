import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material"
import { commonButtonStyle, textFieldStyle } from "../customStyles"
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
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    borderRadius: '20px',
                    width: '50rem',
                }
            }}
        >
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
                    rows={10}
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    style={{
                        ...commonButtonStyle,
                        color: "gray",
                        borderColor: "gray"
                    }}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    style={{
                        ...commonButtonStyle,
                        backgroundColor: "#5c4d4d",
                        color: "white",
                    }}
                >{submitBtnText}</Button>
            </DialogActions>
        </Dialog>
    )
}