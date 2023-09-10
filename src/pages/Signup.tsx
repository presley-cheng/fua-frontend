import { Button } from "@mui/material"
import { useState } from "react"
import { commonButtonStyle } from "../customStyle/button"

import SmallForm from "../components/SmallForm"
import InputField from "../components/InputField"

import { SignupType } from "../types"

const textFieldStyle = {
    borderRadius: "20px",
}

interface Props {
    onSignup: (signup: SignupType) => Promise<void>
}

export default function Signup({ onSignup }: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return (
        <SmallForm title="Sign up">
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
                onClick={() => onSignup({ name, username, password })}
                style={{
                    ...commonButtonStyle,
                    backgroundColor: "#5c4d4d",
                    color: "white",
                    marginBottom: "1rem"
                }}>Sign up</Button>
        </SmallForm>
    )
}