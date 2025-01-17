const db = require('../models/database');

const checkDbConnection = async (req, res, next) => {
    try {
        console.log("database connected")

        // Attempt a simple query to test the database connection
        await db.query('SELECT 1');
        console.log("database connected")
        next(); // If successful, move to the next middleware or route handler
    } catch (err) {
        console.error('Database connection error:', err.message);
        res.status(500).json({ message: 'Database connection error', error: err.message });
    }
};

module.exports = checkDbConnection;
