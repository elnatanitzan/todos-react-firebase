import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCancelToken } from './Hooks';

export const useFetch = () => {
    const { newCancelToken } = useCancelToken();
    const navigate = useNavigate();
    const authToken = localStorage.getItem('AuthToken');

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [todoId, setTodoId] = useState('');
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const [uiLoading, setUiLoading] = useState(true);
    const [buttonType, setButtonType] = useState('');
    const [viewOpen, setViewOpen] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'title') setTitle(e.target.value);
        if (e.target.name === 'body') setBody(e.target.value);
    };

    const getAllTodos = () => {
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/todos', { cancelToken: newCancelToken() })   
            .then((res) => {
                setTodos(res.data);
                setUiLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const deleteTodo = (todoId) => {
        if (!authToken) {
            navigate('/login')
        } else {
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .delete(`todos/${todoId}`)
                .then(() => {
                    getAllTodos();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const editTodo = (data) => {
        setTitle(data.todo.title);
        setBody(data.todo.body);
        setTodoId(data.todo.todoId);
        setButtonType('Edit');
        setOpen(true);
    };

    const handleViewOpen = (data) => {
        setTitle(data.todo.title);
        setBody(data.todo.body);
        setViewOpen(true);
    };
    
    const handleClickOpen = () => {
        setTodoId('');
        setTitle('');
        setBody('');
        setButtonType('');
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userTodo = {
            title: title,
            body: body
        };
        let options = {};
        if (buttonType === 'Edit') {
            options = {
                url: `/todos/${todoId}`,
                method: 'PUT',
                data: userTodo
            };
        } else {
            options = {
                url: '/todos',
                method: 'POST',
                data: userTodo
            };
        }
        if (!authToken) {
            navigate('/login')
        } else {
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios(options)
                .then( () => {
                    setOpen(false);
                    getAllTodos();
                    
                })
                .catch((err) => {
                    setOpen(true);
                    setErrors(err.res.data);
                    console.log(err);
                });
        }
    };

    const handleViewClose = () => { setViewOpen(false); };

    const handleClose = () => { setOpen(false); };

    // handle fetch user data from the server when home/accont pages is mounting
    useEffect(() => {
       getAllTodos();
    });

    return {
        todos,
        title,
        body,
        errors,
        open,
        uiLoading,
        buttonType,
        viewOpen,
        handleChange,
        deleteTodo,
        editTodo,
        handleViewOpen,
        handleClickOpen,
        handleSubmit,
        handleViewClose,
        handleClose
    }
}