import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { Severity } from "../types";

interface Props {
    severity: Severity
    message: string
    onClose: (str: string) => void
}

export default function CustomAlert({ severity, message, onClose }: Props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={message.length > 0}
            autoHideDuration={5000}
            onClose={() => onClose("")}
        >
            <Alert severity={severity}>
                <AlertTitle>{severity}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )
}