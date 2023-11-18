// Import necessary modules and middleware
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import Teacher from '../model/teacher.js';
import { middleware, middlewareU } from './middlewere.js'

const AuthRouter = express.Router();
const ADMIN_SECRET_CODE = 'A1'; // Replace with your actual secret code

// User Registration Route
AuthRouter.post('/register', async (req, resp) => {
    try {
        const { email, password, confirmPassword, role, secretCode } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email: email });
        if (user) {
            return resp.status(401).json({ err: 'User already exists' });
        }

        // Check if the email is already registered as a teacher
        let teacherWithEmail = await Teacher.findOne({ email: email });
        if (!teacherWithEmail && role !== 'admin') {
            // Do not allow registration if the email is not registered in the Teacher model
            return resp.status(401).json({ err: 'This email is not registered as a teacher' });
        }

        if (password !== confirmPassword) {
            return resp.status(401).json({ err: 'Passwords do not match' });
        }

        // Check if the secret code is provided and matches the admin code
        if (role === 'admin' && secretCode !== ADMIN_SECRET_CODE) {
            return resp.status(401).json({ err: 'Invalid secret code for admin registration' });
        }

        // Create a new user and hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'teacher',
        });
        await newUser.save();
        resp.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        resp.status(500).json({ err: 'Internal Server Error' });
    }
});

// User Login Route
AuthRouter.post('/login', async (req, resp) => {
    try {
        const { email, password, role } = req.body;

        // Verify if email exists
        const user = await User.findOne({ email: email });
        if (user) {
            // Verify the password
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (isPasswordValid) {
                let payload = {};

                if (user.role === 'admin') {
                    payload = {
                        userA: {
                            id: user.id,
                            role: user.role,
                        },
                    };
                    jwt.sign(payload, 'AJR', { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            console.log(err);
                            resp.status(500).json({ msg: 'JWT Token generation Err' });
                        }
                        resp.status(200).json({ token });
                    });
                } else {
                    payload = {
                        userS: {
                            id: user.id,
                            role: user.role,
                        },
                    };
                    jwt.sign(payload, 'AJI', { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            console.log(err);
                            resp.status(500).json({ msg: 'JWT Token generation Err' });
                        }
                        resp.status(200).json({ token });
                    });
                }
            } else {
                resp.status(401).json({ msg: 'Incorrect password' });
            }
        } else {
            resp.status(401).json({ msg: 'Email/User does not exist' });
        }
    } catch (err) {
        console.log(err);
        resp.status(500).json({ msg: 'An error occurred during login' });
    }
});

// Dashboard Route (Admin Access)
AuthRouter.get('/dashboard', middleware, async (req, resp) => {
    try {
        let userA = await User.findById(req.userA.id);
        if (!userA) {
            return resp.status(401).json({ msg: 'User not found' });
        }
        resp.json(userA);
    } catch (err) {
        console.log(err);
        return resp.status(500).send('Server Error');
    }
});

// Product List Route (User Access)
AuthRouter.get('/teachersBoard', middlewareU, async (req, resp) => {
    try {
        let userS = await User.findById(req.userS.id);
        if (!userS) {
            return resp.status(401).json({ msg: 'User not found' });
        }
        resp.json(userS);
    } catch (err) {
        console.log(err);
        return resp.status(500).send('Server Error');
    }
});

export default AuthRouter;
