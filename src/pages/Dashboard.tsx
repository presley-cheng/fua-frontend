import { useContext, useEffect } from "react"
import { serverUrl } from "../constants"
import { appContext } from "../context"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const { user, setUser, setError } = useContext(appContext)
    const navigator = useNavigate()

    useEffect(() => {
        fetch(serverUrl + "/dashboard", { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }

                setUser(data)
            })
            .catch(err => {
                console.error(err)
                setError((err as Error).message)
                navigator("/login")
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {Object.keys(user).length > 0 &&
                <h1>Welcome {user.name}!</h1>
            }
        </>
    )
}