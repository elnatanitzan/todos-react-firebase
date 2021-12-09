import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// @material-ui elements
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AirplayRoundedIcon from '@mui/icons-material/AirplayRounded';

export default function Welcome({userName}) {

    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('AuthToken');
        navigate('/login');
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#cecece'
            }}
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                Welcome {userName}!
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                {'Successfully signed up for TodoApp,'}<br/>{'we hope you enjoy it.'}
                </Typography>
                <Typography variant="body1">Click on the icon below to go to your dashboard or {''}
                    <Link sx={{cursor: 'pointer'}} onClick={logOut}>Logout</Link>
                </Typography>
            </Container>
            <AirplayRoundedIcon 
                sx={{
                    fontSize: 200,
                    alignSelf: 'center',
                    marginTop: '3rem',
                    cursor: 'pointer'
                }} 
                onClick={() => navigate('/')}
            />
        </Box>
    )
}