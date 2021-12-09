import React from 'react';
import clsx from 'clsx';

import { useFetch } from '../util/FetchUserData';

// @material-ui elements
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0
	},
	locationText: {
		paddingLeft: '15px'
	},
	buttonProperty: {
		position: 'absolute',
		top: '50%'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	progess: {
		position: 'absolute'
	},
	uploadButton: {
		marginLeft: '8px',
		margin: theme.spacing(1)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	submitButton: {
		marginTop: '10px'
	}
});

function Account(props) {
	const { firstName, lastName, email, username, uiLoading, imageError, buttonLoading, profilePictureHandler, handleChange, updateFormValues } = useFetch();
    
	const { classes, ...rest} = props;

    if (uiLoading) {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
            </main>
        );
    } else {
        return (
            <main className={classes.content}>
				<div className={classes.toolbar} />
				<Card {...rest} className={clsx(classes.root, classes)}>
					<CardContent>
						<div className={classes.details}>
							<div>
								<Typography className={classes.locationText} gutterBottom variant="h4">
									{firstName} {lastName}
								</Typography>
								<Button
									variant="outlined"
									color="primary"
									type="submit"
									size="small"
									startIcon={<CloudUploadIcon />}
									className={classes.uploadButton}
									onClick={profilePictureHandler}
								>
									Upload Photo
								</Button>
								<input type="file" name="image" onChange={handleChange} />

								{imageError ? (
									<div className={classes.customError}>
										Wrong Image Format || Supported Format are PNG and JPG
									</div>
								) : (false)}
							</div>
						</div>
						<div className={classes.progress} />
					</CardContent>
					<Divider />
				</Card>
				<br />
				<Card {...rest} className={clsx(classes.root, classes)}>
					<form autoComplete="off" noValidate>
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={3} xs={6}>
									<TextField
										fullWidth
										label="First name"
										margin="dense"
										name="firstName"
										variant="outlined"
										value={firstName}
										onChange={handleChange}
									/>
								</Grid>

								<Grid item md={3} xs={6}>
									<TextField
										fullWidth
										label="Last name"
										margin="dense"
										name="lastName"
										variant="outlined"
										value={lastName}
										onChange={handleChange}
									/>
								</Grid>

								<Grid item md={3} xs={6}>
									<TextField
										fullWidth
										label="Email"
										margin="dense"
										name="email"
										variant="outlined"
										disabled={true}
										value={email}
									/>
								</Grid>
								
								<Grid item md={3} xs={6}>
									<TextField
										fullWidth
										label="User Name"
										margin="dense"
										name="userHandle"
										disabled={true}
										variant="outlined"
										value={username}
									/>
								</Grid>

							</Grid>
						</CardContent>
						<Divider />
						<CardActions />
					</form>
				</Card>
				<Button
					color="primary"
					variant="contained"
					type="submit"
					className={classes.submitButton}
					onClick={updateFormValues}
					disabled={ buttonLoading || firstName.length < 2 || lastName.length < 2 }
				>
					Save details
					{buttonLoading && <CircularProgress size={30} className={classes.progess} />}
				</Button>
			</main>
        );
    }
}

export default withStyles(styles)(Account);