import express from 'express';
//const express = require('express');
import { signup } from '../controllers/auth_controller';
import { login } from '../controllers/auth_controller';

 router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

export default router;

