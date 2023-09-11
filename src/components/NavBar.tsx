import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { appContext } from '../context';
import { useContext } from 'react';
import { commonButtonStyle } from '../customStyles';
import { serverUrl } from '../constants';
import { UserType } from '../types';

const linkStyle = {
    textDecoration: 'none',
    color: 'white'
}

const navButtonStyle = {
    ...commonButtonStyle,
    color: 'white',
}

export default function NavBar() {
    const { user, setUser } = useContext(appContext)
    const navigator = useNavigate()

    const onLogout = async () => {
        try {
            const resp = await fetch(serverUrl + "/logout", {
                credentials: "include"
            })

            if (!resp.ok) {
                throw new Error("unexpected error during logout")
            }

            setUser({} as UserType)
        } catch (err) {
            console.error(err)
        } finally {
            navigator("login")
        }
    }

    const showLogout = () => {
        return (
            <Button onClick={onLogout} style={navButtonStyle}>Logout</Button>
        )
    }

    const showLogin = () => {
        return (
            <div>
                <Link to="/signup">
                    <Button
                        style={navButtonStyle}
                        variant='outlined'
                        color="inherit"
                    >Signup</Button>
                </Link>
                <Link to="/login">
                    <Button
                        style={{
                            ...navButtonStyle,
                            backgroundColor: "#5c4d4d",
                            marginLeft: '0.5rem',
                        }}
                        variant='contained'
                        color="inherit"
                    >Login</Button>
                </Link>
            </div>
        )
    }

    const showFeatures = () => {
        return (
            <div>
                <Link to="/calendar">
                    <Button style={navButtonStyle}
                    >Calendar</Button>
                </Link>
                <Link to="/notes">
                    <Button style={{ ...navButtonStyle, marginLeft: '2rem' }}
                    >Notes</Button>
                </Link>
                <Link to="/patients">
                    <Button style={{ ...navButtonStyle, marginLeft: '2rem' }}
                    >Patients</Button>
                </Link>
            </div>
        )
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "#a96851" }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    pr: 1
                }}>
                <Link to="/" style={linkStyle}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >FUA</Typography>
                </Link>
                {Object.keys(user).length > 0 && showFeatures()}
                {Object.keys(user).length === 0 ? showLogin() : showLogout()}
            </Toolbar>
        </AppBar>
    );
}