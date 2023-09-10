import "./App.css"

import { Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar"

import User from "./types/user";
import { appContext } from "./context";

const theme = createTheme({
  typography: {
    fontFamily: 'monospace'
  }
})

function App() {
  return (
    <appContext.Provider value={{ user: {} as User }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </appContext.Provider>
  )
}

export default App
