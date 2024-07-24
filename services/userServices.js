
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


export async function postLogin(username) {
    try {

        let userFromDb = await User.find({ username: username });
        return userFromDb;

    } catch (error) {
        throw error;

    }
}

export async function getAllusers()
{
   try {
    const allUsers = await User.find({});
    return allUsers;
   } catch (error) {
    throw error
   }
   
}