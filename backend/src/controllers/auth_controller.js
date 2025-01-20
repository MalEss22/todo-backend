import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/database';

export const signup = async (req, res) => {
    
    console.log(req.body);
    const { username, password } = req.body;

    if(!username ||!password){
        return res.status(400).json({ message: 'Username or password field is empty!' });
    }
    
    try {
        console.log('registering user...');
        console.log(`Hashing  user password ${password} and ${username} ...`)

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("creating user...");
        const result = await db.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        const userId = result[0].insertId;
        const token = jwt.sign({ userId}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: 'User created successfully', token});
    } catch (err) {
        console.log("error creating user..."+err.message)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Error signing up', error: err.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE username =?", [username]);
        const user = users[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {

            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        console.log(token);

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.log("error logging in..."+err.message);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};
