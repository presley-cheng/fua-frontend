import "./App.css"

import { Routes, Route, useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar"

import { UserType, LoginType, SignupType } from "./types";
import { appContext } from "./context";
import { useCallback, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "monospace"
  }
})

const serverUrl = "http://localhost:3000"

function App() {
  const navigator = useNavigate()
  const [user, setUser] = useState({} as UserType)

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

  const onSignup = async (signup: SignupType) => {
    navigator("/dashboard")
  }

  return (
    <appContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/signup" element={<Signup onSignup={onSignup} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </appContext.Provider>
  )
}

export default App
