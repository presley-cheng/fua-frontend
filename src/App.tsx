import "./App.css"

import { Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// custom components
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NavBar from "./components/NavBar"

const theme = createTheme({
  typography: {
    fontFamily: 'monospace'
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
