import { verifyToken } from "../utils/jwtUtils.js";


export async function userAuth(req, res, next) {
    try {
        const token = req.cookies?.userToken;
        let user = verifyToken(token);
        if (user) {
            req.user = user;
            next();
        }
        else{
            throw new Error("User Must Logged in")
        }

    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }

}

export async function managerAuth(req, res, next) {
    try {
        const token = req.cookies?.managerToken;
        let user = verifyToken(token);
        if (user) {
            req.user = user;
            next();
        }
        else{
            throw new Error("User Must Logged in")
        }

    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }

}