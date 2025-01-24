const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



pool.query(
    `CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )`,
    (err, results) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table created or already exists.');
      }
    //   pool.end();
    }
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS todos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       UserId INT NOT NULL,
       task VARCHAR(255) NOT NULL,
       completed BOOLEAN DEFAULT FALSE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (UserId) REFERENCES users(id)
     )`,
    (err, results) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table todos created or already exists.');
      }
    }
  );
  


pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        process.exit(1); 
    } else {
        console.log('Connected to the database with ID ' + connection.threadId);
          // Check if the database exists
    connection.query('CREATE DATABASE IF NOT EXISTS todoapp', (err, result) => {
        if (err) {
            console.error('Error creating database: ', err);
        } else {
            console.log('Database "todoapp" created or already exists');
        }
        // connection.release();
    });
    }
});

module.exports = pool.promise();
