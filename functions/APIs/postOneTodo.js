const { db } = require('../util/admin');

exports.postOneTodo = (req, res) => {
    
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
    }
    if (req.body.title.trim() === '') {
        return res.status(400).json({ title: 'Title must not be empty' });
    }

    const newTodoItem = {
        title: req.body.title,
        body: req.body.body,
        createAt: new Date().toISOString(),
        username: req.user.username
    }

    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc) => {
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return res.json(responseTodoItem);
        })
        .catch ((err) => {
            res.status(500).json({ error: 'Something went wrong' });
            console.error(err);
        });
};