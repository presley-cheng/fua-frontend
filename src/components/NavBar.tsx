import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../customStyle/button';
import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none',
    color: 'white'
}

export default function NavBar() {
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}