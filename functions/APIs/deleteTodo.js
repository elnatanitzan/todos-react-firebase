const { db } = require('../util/admin');

exports.deleteTodo = (req, res) => {
    const document = db.doc(`/todos/${req.params.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Todo not found' })
            }
            if(doc.data().username !== req.user.username){
                return res.status(403).json({error:"UnAuthorized"})
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: 'Todo deleted successfully' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};