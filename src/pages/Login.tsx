import { Button } from "@mui/material"

import { commonButtonStyle } from "../customStyle/button"
import InputField from "../components/InputField"
import { useState } from "react"
import { Link } from "react-router-dom"
import SmallForm from "../components/SmallForm"

const textFieldStyle = {
    borderRadius: "20px",
}

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <SmallForm title="Login">
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
            <Link to="/signup">
                <Button
                    variant="outlined"
                    fullWidth
                    style={{
                        ...commonButtonStyle,
                        color: "gray",
                        borderColor: "gray"
                    }}>No account? Sign up</Button>
            </Link>
        </SmallForm>
    )
}