const express = require('express');
const { addTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo_controller');
const authenticate = require('../middleware/auth_middleware');

const router = express.Router();

router.post('/', authenticate, addTodo);
router.get('/', authenticate, getTodos);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;
