const { db } = require('../util/admin');

exports.editTodo = (req, res) => {
    if (req.body.todoId || req.body.createAt) {
        res.status(403).json({ error: 'Not allowed to edit' });
    }
    let document = db.collection('todos').doc(`${req.params.todoId}`)
    document.update(req.body)
    .then(() => {
        res.json({ message: 'Todo edited successfully' });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};