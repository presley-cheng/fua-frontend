import {
    Container,
    Paper,
    Typography,
    Divider,
    Button,
} from "@mui/material"

import { commonButtonStyle } from "../customStyle/button"
import InputField from "../components/InputField"
import { useState } from "react"

const textFieldStyle = {
    borderRadius: "20px",
}

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Container maxWidth="md" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh'
        }}>
            <Paper elevation={5} sx={{
                width: '20rem',
                padding: '2rem 1.5rem',
                borderRadius: '20px'
            }}>
                <Typography sx={{ textAlign: 'center' }} variant="h4">Login</Typography>
                <Divider variant="middle" sx={{ mt: 2, mb: 3 }} />
                <InputField
                    type="text"
                    input={username}
                    setInput={setUsername}
                    required={true}
                    label="Username"
                    style={{ ...textFieldStyle, mb: 2 }}
                />
                <InputField
                    type="password"
                    input={password}
                    setInput={setPassword}
                    required={true}
                    label="Password"
                    style={{ ...textFieldStyle, mb: 3 }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        ...commonButtonStyle,
                        backgroundColor: "#5c4d4d",
                        color: "white",
                        marginBottom: "1rem"
                    }}>Login</Button>
                <Button
                    variant="outlined"
                    fullWidth
                    style={{
                        ...commonButtonStyle,
                        color: "gray",
                        borderColor: "gray"
                    }}>Sign up</Button>
            </Paper>
        </Container >
    )
}