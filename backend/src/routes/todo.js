import express from 'express';
import {addTodo} from '../controllers/todo_controller.js'
import { getTodos } from '../controllers/todo_controller.js';
import { updateTodo } from '../controllers/todo_controller.js';
import { deleteTodo } from '../controllers/todo_controller.js';
import {authenticate} from '../middleware/auth_middleware.js';

const router = express.Router();

router.post('/', authenticate, addTodo);
router.get('/', authenticate, getTodos);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

export default router
