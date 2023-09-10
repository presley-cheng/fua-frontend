import { Button } from "@mui/material"

import { commonButtonStyle } from "../customStyle/button"
import InputField from "../components/InputField"
import { useState } from "react"
import SmallForm from "../components/SmallForm"

const textFieldStyle = {
    borderRadius: "20px",
}

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return (
        <SmallForm title="Signup">
            <InputField
                type="text"
                input={name}
                setInput={setName}
                required={true}
                label="Name"
                style={{ ...textFieldStyle, mb: 2 }}
            />
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
                }}>Signup</Button>
        </SmallForm>
    )
}