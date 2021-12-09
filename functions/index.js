const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');


const { getAllTodos } = require('./APIs/getAllTodos')
app.get('/todos', auth, getAllTodos);

const { postOneTodo } = require('./APIs/postOneTodo')
app.post('/todos', auth, postOneTodo);

const { deleteTodo } = require('./APIs/deleteTodo')
app.delete('/todos/:todoId', auth, deleteTodo);

const { editTodo } = require('./APIs/editTodo')
app.put('/todos/:todoId', auth, editTodo);

const { 
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails
    
 } = require('./APIs/users')
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);