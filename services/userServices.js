
import { User } from "../models/userModel.js";

export async function postSignUp(username, email, password) {
    try {
        const user = new User({
            username, email, password
        });
        await user.save();

    } catch (error) {
        throw error;
    }
    

}