import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCancelToken } from './Hooks';

export const useFetch = () => {
    const { newCancelToken, isCancel } = useCancelToken();
    
    const navigate = useNavigate();
    const authToken = localStorage.getItem('AuthToken');
    
    const [error, setError] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [uiLoading, setUiLoading] = useState(true);
    const [image, setImage] = useState();
    const [imageError, setImageError] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'firstName') setFirstName(e.target.value);
        if (e.target.name === 'lastName') setLastName(e.target.value);
        if (e.target.name === 'image') setImage(e.target.files[0]);
    }

    // function to upload Profile Picture
    const profilePictureHandler = (e) => {
        e.preventDefault();
        setUiLoading(true);
        if (!authToken) {
            navigate('/login')
        } else {
            let form_data = new FormData();
            form_data.append('image', image);
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .post('/api/user/image', form_data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.response.status === 403) navigate('/login');
                    console.log(error);
                    setUiLoading(false);
                    setImageError('Error in posting the data');
                });
        }
    };


    const updateFormValues = (e) => {
		e.preventDefault();
		setButtonLoading(true)
		const authToken = localStorage.getItem('AuthToken');
        if (!authToken) {
            navigate('/login')
        } else {
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            const formRequest = {
                firstName: firstName,
                lastName: lastName
            };
            axios
                .post('/api/user', formRequest)
                .then(() => {
                    setButtonLoading(false);
                })
                .catch((error) => {
                    if (error.response.status === 403) navigate('/login');
                    console.log(error);
                    setButtonLoading(false);
                });
        }

	};

    // logout function
    const logoutHandler = () => {
        localStorage.removeItem('AuthToken');
        navigate('/login');
    }
    
    // handle fetch user data from the server when home/accont pages is mounting
    useEffect(() => {
        if (!authToken) {
            navigate('/login')
        } else {
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .get('/api/user', { cancelToken: newCancelToken() })
                
                .then((res) => {
                        setFirstName(res.data.userCredentials.firstName);
                        setLastName(res.data.userCredentials.lastName);
                        setEmail(res.data.userCredentials.email);
                        setUserName(res.data.userCredentials.username);
                        setProfilePicture(res.data.userCredentials.imageUrl);
                        setUiLoading(false);
                })
                .catch((error) => {
                    if (isCancel(error)) return;
                    if (error.response.status === 403);
                    console.log(error);
                    setError('Error in retrieving the data');
                    navigate('/login')
                })
        }
    },[newCancelToken, isCancel, navigate, authToken]);
    
    return { profilePictureHandler, handleChange, updateFormValues, logoutHandler, firstName, lastName, email, username, profilePicture, error, uiLoading, imageError, buttonLoading }; 
}