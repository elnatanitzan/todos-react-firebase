import React from 'react';

// components & fuctions
import Welcome from '../components/Welcome';
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
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#0e7ebe'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
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

function Signup(props) {
    
    const { welcome,firstName, lastName, userName ,email, password, confirmPassword, errors, loading, signupSubmit, handleChange } = useAuth();
    
    const { classes } = props;

    if (welcome === false) {
        return (
            <Container component="main" maxWidth="xs">
                
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FaceIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Account
                    </Typography>
    
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    helperText={errors.firstName}
                                    error={errors.firstName ? true : false}
                                    onChange={handleChange}
                                />
                            </Grid>
    
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    helperText={errors.lastName}
                                    error={errors.lastName ? true : false}
                                    onChange={handleChange}
                                />
                            </Grid>
    
                            <Grid item xs={12} dir="ltr">
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Choose User Name"
                                    name="userName"
                                    autoComplete="userName"
                                    helperText={errors.username}
                                    error={errors.username ? true : false}
                                    onChange={handleChange}
                                />
                            </Grid>
    
                            <Grid item xs={12} dir="ltr">
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    onChange={handleChange}
                                />
                            </Grid>
    
                            <Grid item xs={12} dir="ltr">
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    onChange={handleChange}
                                />
                            </Grid>
    
                            <Grid item xs={12} dir="ltr">
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    helperText={errors.confirmPassword}
                                    error={errors.confirmPassword ? true : false}
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
    
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signupSubmit}
                            disabled= {loading ||
                                       firstName === ''||
                                       lastName === ''||
                                       userName === ''||
                                       email === ''||
                                       password === ''||
                                       confirmPassword === ''}
                        >
                            אישור
                            { loading && <CircularProgress size={30} className={classes.progress} /> }
                        </Button>
    
                        {errors.general && (
                            <Typography on variant="body2" className={classes.customError} >
                                {errors.general}
                            </Typography>    
                        )}
    
                        <Grid container justify="flex-start">
                            <Grid item>
                                <Link href="login" variant="body2">
                                Have you signed up for the app before? Log in! 
                                </Link>
                            </Grid>
                        </Grid>
            
                    </form>
                </div>
            </Container>
        );
    } else { return (< Welcome userName={userName} /> ) }
}

export default withStyles(styles)(Signup);