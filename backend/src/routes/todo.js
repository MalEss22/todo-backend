import express from 'express';
import {addTodo} from '../controllers/todo_controller'
import { getTodos } from '../controllers/todo_controller';
import { updateTodo } from '../controllers/todo_controller';
import { deleteTodo } from '../controllers/todo_controller';
import {authenticate} from '../middleware/auth_middleware';

const router = express.Router();

router.post('/', authenticate, addTodo);
router.get('/', authenticate, getTodos);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

export default router
