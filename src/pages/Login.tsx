import { Button } from "@mui/material"
import { useState, useCallback, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import SmallForm from "../components/SmallForm"
import InputField from "../components/InputField"

import { commonButtonStyle, textFieldStyle } from "../customStyles"
import { LoginType } from "../types"

import { serverUrl } from "../constants"
import { appContext } from "../context"

export default function Login() {
    const { setUser, setError } = useContext(appContext)
    const navigator = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
                onClick={() => onLogin({ username, password })}
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