import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config({ path: './.env' });
const secret = process.env.SECRET_KEY

export const authMiddleware = async (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            success: false,
            msg: "Unauthorized"
        }).end();
    } else {

        token = token.split(" ")[1]

        jwt.verify(token, secret, (err) => {
            if (err) {
                res.status(403).json({
                    success: false,
                    msg: 'Invalid token' }).end();
                return;
            } else {
                next();
            }
        });

    }
}