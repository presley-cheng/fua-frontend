import { Button, TextField } from "@mui/material"
import { ChangeEvent, useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import SmallForm from "../components/SmallForm"

import { commonButtonStyle, textFieldStyle } from "../customStyles"
import { SignupType } from "../types"
import { serverUrl } from "../constants"
import { appContext } from "../context"

export default function Signup() {
    const [input, setInput] = useState<SignupType>({
        name: "",
        username: "",
        password: "",
    })
    const { setUser, setError } = useContext(appContext)
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

            const data = await resp.json()

            if (!resp.ok) {
                throw new Error(data.error)
            }

            setUser(data)
            navigator("/calendar")
        } catch (err) {
            console.error(err)
            setError((err as Error).message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
    )

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <SmallForm title="Sign up">
            <TextField
                value={input.name}
                autoComplete="off"
                name="name"
                onChange={onInputChange}
                InputProps={{ sx: textFieldStyle }}
                fullWidth
                type="text"
                required
                variant="outlined"
                label="Name"
            />
            <TextField
                value={input.username}
                autoComplete="off"
                name="username"
                onChange={onInputChange}
                InputProps={{ sx: textFieldStyle }}
                fullWidth
                type="text"
                required
                variant="outlined"
                label="Username"
            />
            <TextField
                value={input.password}
                autoComplete="off"
                name="password"
                onChange={onInputChange}
                InputProps={{ sx: textFieldStyle }}
                fullWidth
                type="password"
                required
                variant="outlined"
                label="Name"
            />
            <Button
                variant="contained"
                fullWidth
                onClick={() => onSignup(input)}
                style={{
                    ...commonButtonStyle,
                    backgroundColor: "#5c4d4d",
                    color: "white",
                    marginBottom: "1rem"
                }}>Sign up</Button>
        </SmallForm>
    )
}