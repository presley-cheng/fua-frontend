import { TextField } from "@mui/material"

interface Props {
    required: boolean
    style: object
    label: string
    input: string
    type: string
    setInput: (str: string) => void
}

export default function InputField({ required, type, style, label, input, setInput }: Props) {
    return (
        <TextField
            value={input}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            InputProps={{ sx: style }}
            fullWidth
            type={type}
            required={required}
            variant="outlined"
            label={label}
        />
    )
}