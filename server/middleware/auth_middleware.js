// middleware/tokenExpirationMiddleware.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const token_expiration_middleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration < 60000) {
            const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.SECRET, {
                expiresIn: '1h',
            });

            console.log('token refreshed');

            const decoded_refresh_token = jwt.verify(newAccessToken, process.env.SECRET);

            req.token = decoded_refresh_token;

            console.log(req.token)

            req.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token has expired due to inactivity. Refresh the page to login again!.' });
    }
}

export default token_expiration_middleware;