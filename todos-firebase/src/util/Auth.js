import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAuth = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [welcome, setWelcome] = useState(false)

    const handleChange = (e) => {
        if (e.target.name === 'firstName') setFirstName(e.target.value);
        if (e.target.name === 'lastName') setLastName(e.target.value);
        if (e.target.name === 'userName') setUserName(e.target.value);
        if (e.target.name === 'email') setEmail(e.target.value);
        if (e.target.name === 'password') setPassword(e.target.value);
        if (e.target.name === 'confirmPassword') setConfirmPassword(e.target.value);
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        setLoading(true);
        axios
        .post('/login', userData)
        .then((res) => {
            localStorage.setItem('AuthToken', `Bearer ${res.data.token}`);
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            setErrors(error.response.data);
            setLoading(false);
            if (error.response.status === 500) setErrors({general: 'Wrong Email Adress or Password, please try again'})
        })
    };

    const signupSubmit = (e) => {
        e.preventDefault();
        const newUserData = {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        setLoading(true);
        axios
            .post('/signup', newUserData)
            .then((res) => {
                localStorage.setItem('AuthToken', `Bearer ${res.data.token}`);
                setLoading(false);
                setWelcome(true);
                // navigate('/');
            })
            .catch((error) => {
                console.log(error)
                setErrors(error.response.data);
                setLoading(false);
            }); 
    }

    return { welcome, firstName, lastName, userName ,email, password, confirmPassword, errors, loading, loginSubmit, signupSubmit, handleChange };
}