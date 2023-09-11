import "./App.css"

import { Routes, Route } from "react-router-dom"
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
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "monospace"
  }
})

function App() {
  const [user, setUser] = useState({} as UserType)
  const [error, setError] = useState("")

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
