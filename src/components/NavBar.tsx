import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../customStyle/button';
import { Link } from 'react-router-dom';
import { appContext } from '../context';
import { useContext } from 'react';

const linkStyle = {
    textDecoration: 'none',
    color: 'white'
}

export default function NavBar() {
    const { user } = useContext(appContext)

    const showLogout = () => {
        return (
            <Button
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
                    {Object.keys(user).length === 0 ? showLogin() : showLogout()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}