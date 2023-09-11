import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
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
            <Button
                onClick={onLogout}
                style={{ ...commonButtonStyle, color: 'white' }}
                color="inherit"
            >Logout</Button>
        )
    }

    const showLogin = () => {
        return (
            <div>
                <Link to="/signup">
                    <Button
                        style={{ ...commonButtonStyle, color: 'white' }}
                        color="inherit"
                    >Signup</Button>
                </Link>
                <Link to="/login">
                    <Button
                        style={{
                            ...commonButtonStyle,
                            backgroundColor: "#5c4d4d",
                            marginLeft: '0.5rem',
                            color: 'white'
                        }}
                        variant='contained'
                        color="inherit"
                    >Login</Button>
                </Link>
            </div>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#a96851" }}>
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Link to="/" style={linkStyle}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                            }}
                        >FUA</Typography>
                    </Link>
                    <h1>{Object.keys(user).length}</h1>
                    {Object.keys(user).length === 0 ? showLogin() : showLogout()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}