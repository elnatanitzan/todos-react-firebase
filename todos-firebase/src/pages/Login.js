import React from 'react';

import { useAuth } from '../util/Auth';

// @material-ui elements
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@mui/icons-material/Face';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#0e7ebe'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
});

function Login(props) {
    const { email, password, errors, loading, loginSubmit, handleChange } = useAuth();
   
    const { classes } = props;
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FaceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        onChange={handleChange}
                    />

                    <TextField
                        dir="ltr"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={errors.general}
                        error={errors.general ? true : false}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        fullwidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={loginSubmit}
                        disabled={loading || !email || !password}
                    >
                        Login
                        {loading && <CircularProgress size={30} className={classes.progress} />}
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                Not registered for the app yet? Sign up
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
};

export default withStyles(styles)(Login);