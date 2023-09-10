import { useContext, useEffect } from "react"
import { serverUrl } from "../constants"
import { appContext } from "../context"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const { user, setUser } = useContext(appContext)
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
                navigator("/login")
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>Welcome {user.name}!</h1>
        </>
    )
}