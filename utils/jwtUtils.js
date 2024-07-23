
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.SECRET_KEY;


export function createToken(data) {
    try {

        const payload = data;
        let token = jwt.sign(payload, secretKey);
        return token;
    } catch (error) {

        throw error

    }
}