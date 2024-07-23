import bcrypt from 'bcrypt';


export async function getHashedPassword(passoword) {
    try {
        const userPass = passoword;
        const hashedPass = await bcrypt.hash(userPass, 10);
        return hashedPass
    } catch (error) {
        console.log(error);
    }
}