import express from 'express';
//const express = require('express');
import { signup } from '../controllers/auth_controller.js';
import { login } from '../controllers/auth_controller.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

export default router;

