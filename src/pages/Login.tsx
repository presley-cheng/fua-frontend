import { Button, TextField } from "@mui/material"
import { useState, useCallback, useContext, ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"

import SmallForm from "../components/SmallForm"

import { commonButtonStyle, textFieldStyle } from "../customStyles"
import { LoginType } from "../types"

import { serverUrl } from "../constants"
import { appContext } from "../context"

export default function Login() {
    const [input, setInput] = useState<LoginType>({ username: "", password: "" })
    const { setUser, setError } = useContext(appContext)
    const navigator = useNavigate()

    const onLogin = useCallback(async (login: LoginType) => {
        try {
            const resp = await fetch(serverUrl + "/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
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
        <SmallForm title="Login">
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
                label="Password"
            />
            <Button
                variant="contained"
                fullWidth
                onClick={() => onLogin(input)}
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