import db from '../models/database.js';

export const addTodo = async (req, res) => {
    const { task } = req.body;
    const userId = req.userId;

    try {
        const [result] = await db.query(
            'INSERT INTO todos (userId, task) VALUES (?, ?)',
            [userId, task]
        );
        console.log(result);
        res.status(201).json({ message: 'Todo added', todoId: result.insertId, task});
    } catch (err) {
        res.status(500).json({ message: 'Error adding todo', error: err.message });
    }
};

export const getTodos = async (req, res) => {
    const userId = req.userId;

    try {
        const [todos] = await db.query('SELECT * FROM todos WHERE UserId = ?', [userId]);
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos', error: err.message });
    }
};

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    try {
        await db.query(
            'UPDATE todos SET task = ?, completed = ? WHERE id = ?',
            [task, completed, id]
        );
        res.json({ message: 'Todo updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating todo', error: err.message });
    }
};

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM todos WHERE id = ?', [id]);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting todo', error: err.message });
    }
};

