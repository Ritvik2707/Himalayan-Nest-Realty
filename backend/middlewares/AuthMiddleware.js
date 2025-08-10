import { User } from '../config/db.js';
import { verifyToken } from '../utils/jwtHandlers.js';

const AuthMiddleware = async (req, res, next) => {
    const token = req.cookies['access-token'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user || user.role !== decoded.role) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const validateDealer = (req, res, next) => {
    if (req.user && req.user.role === 'dealer') {
        return next();
    }
    return res.status(403).json({ error: 'Access denied. Dealer Role required.' });
}

export default AuthMiddleware;