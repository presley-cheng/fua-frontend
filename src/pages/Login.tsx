import { Button } from "@mui/material"
import { useContext, useEffect, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { commonButtonStyle } from "../customStyle/button"

import SmallForm from "../components/SmallForm"
import InputField from "../components/InputField"

import { LoginType } from "../types"
import { appContext } from "../context"

import { serverUrl } from "../constants"

const textFieldStyle = {
    borderRadius: "20px",
}

// interface Props {
//     onLogin: (login: LoginType) => Promise<void>
// }

export default function Login() {
    const { user, setUser } = useContext(appContext)
    const navigator = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (Object.keys(user).length > 0) navigator("/dashboard")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            navigator("/dashboard")
        } catch (err) {
            console.error(err)
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