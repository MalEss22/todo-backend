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
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page if not provided
    const offset = (page - 1) * limit;  // Calculate the offset based on the page number
    try {
        // Fetch the paginated todos
        const [todos] = await db.query(
            'SELECT * FROM todos WHERE UserId = ? LIMIT ? OFFSET ?',
            [userId, limit, offset]
        );

        // Optionally, get the total number of todos to calculate the total pages
        const [[{ totalTodos }]] = await db.query(
            'SELECT COUNT(*) as totalTodos FROM todos WHERE UserId = ?',
            [userId]
        );

        const totalPages = Math.ceil(totalTodos / limit);

        res.json({
            todos,
            pagination: {
                page,
                limit,
                totalTodos,
                totalPages
            }
        });
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

