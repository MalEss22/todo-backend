/*
const express = require('express');
   const mysql = require('mysql');
   const bodyParser = require('body-parser');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');
    const cors = require('cors');
    require('dotenv').config();
   const app = express();
   const port = 3000;
   const secretKey = process.env.SECRET_KEY; // Use an environment variable in production

   // Middleware
   app.use(bodyParser.json());
    app.use(cors());

   // MySQL connection
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: '',
       database: 'todoapp',
      
   });

   db.connect(err => {
       if (err) throw err;
       console.log('Connected to MySQL Database');
   });

  
    // Register route
    app.post('/register', (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
 
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).send("There was a problem registering the user.");
            }
            res.status(201).send({ id: results.insertId, username });
        });
    });
 
    // Login route
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
 
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).send('User not found.');
            }
 
            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);
 
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }
 
            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
            res.status(200).send({ auth: true, token });
        });
    });
 
 // Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

// Add a new task
app.post('/tasks', verifyToken, (req, res) => {
    const newTask = req.body.task;
    const userId = req.userId; // Extract user ID from the token

    db.query('INSERT INTO tasks (task, user_id) VALUES (?, ?)', [newTask, userId], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, task: newTask, user_id: userId, completed: false });
    });
});

// Get all tasks for the logged-in user
app.get('/tasks', verifyToken, (req, res) => {
    const userId = req.userId; // Extract user ID from the token

    db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
        if (err) throw err;
        res.json(results.map(task => ({
            id: task.id,
            task: task.task,
            completed: task.completed
        })));
    });
});

// Edit a task by ID
app.put('/tasks/:id', verifyToken, (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;

    db.query('UPDATE tasks SET task = ? WHERE id = ? AND user_id = ?', [updatedTask, taskId, req.userId], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).send('Task not found or you do not have permission to edit this task.');
        }
        res.status(200).send('Task updated successfully.');
    });
});

// Delete a task by ID
app.delete('/tasks/:id', verifyToken, (req, res) => {
    const taskId = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, req.userId], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).send('Task not found or you do not have permission to delete this task.');
        }
        res.status(200).send('Task deleted successfully.');
    });
});

// Complete a task by ID
app.patch('/tasks/:id/complete', verifyToken, (req, res) => {
    const taskId = req.params.id;

    db.query('UPDATE tasks SET completed = TRUE WHERE id = ? AND user_id = ?', [taskId, req.userId], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).send('Task not found or you do not have permission to complete this task.');
        }
        res.status(200).send('Task marked as complete.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


*/

import cors from 'cors';
import express from 'express'
import bodyParser from 'body-parser';
import  authRoutes  from './src/routes/auth.js';
import todoRoutes from './src/routes/todo.js';
import  {checkDbConnection} from './src/middleware/database.js';

//require('dotenv').config();
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();

app.use(bodyParser.json());
app.use(cors())
// Check DB connection before all routes
app.use(checkDbConnection);

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
