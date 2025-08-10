import { User } from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtHandlers.js';

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.find({ email, role });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ id: user.id, email: user.email, role: user.role });

        // Return success response
        res.cookie('access-token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: error.message });
    }
}

export const logoutUser = (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('access-token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({ message: error.message });
    }
}