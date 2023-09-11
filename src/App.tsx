import "./App.css"

import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Calendar from "./pages/Calendar";
import Notes from "./pages/Notes";
import Patients from "./pages/Patients";
import NavBar from "./components/NavBar"
import CustomAlert from "./components/CustomAlert";

import { UserType } from "./types";
import { appContext } from "./context";
import { useCallback, useEffect, useState } from "react";
import { serverUrl } from "./constants";

const theme = createTheme({
  typography: {
    fontFamily: "monospace"
  }
})

function App() {
  const [user, setUser] = useState({} as UserType)
  const [error, setError] = useState("")
  const location = useLocation()
  const navigator = useNavigate()

  const isLoginSignup = useCallback(() => {
    return (location.pathname === "/login" || location.pathname === "/signup")
  }, [])

  const getUser = useCallback(async () => {
    try {
      const resp = await fetch(serverUrl + "/user", { credentials: "include" })
      if (resp.status === 401 && isLoginSignup()) {
        return
      }

      const data = await resp.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setUser(data)
      if (isLoginSignup()) navigator("/calendar")
    } catch (err) {
      console.error(err)
      setError((err as Error).message)
      navigator("/login")
    }
  }, [])

  useEffect(() => { getUser().then() }, [])

  return (
    <appContext.Provider value={{ user, setUser, setError }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <CustomAlert severity="error" message={error} onClose={setError} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </ThemeProvider>
    </appContext.Provider>
  )
}

export default App
