import { Button } from "@mui/material"
import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import SmallForm from "../components/SmallForm"
import InputField from "../components/InputField"

import { commonButtonStyle, textFieldStyle } from "../customStyles"
import { SignupType } from "../types"
import { serverUrl } from "../constants"
import { appContext } from "../context"

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const { setError } = useContext(appContext)
    const navigator = useNavigate()

    const onSignup = useCallback(async (signup: SignupType) => {
        try {
            const resp = await fetch(serverUrl + "/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signup)
            })

            if (!resp.ok) {
                const { error } = await resp.json()
                throw new Error(error)
            }

            navigator("/dashboard")
        } catch (err) {
            console.error(err)
            setError(err as string)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
    )

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