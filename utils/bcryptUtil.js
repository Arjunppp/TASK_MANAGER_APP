import bcrypt from 'bcrypt';


export async function getHashedPassword(passoword) {
    try {
        const userPass = passoword;
        const hashedPass = await bcrypt.hash(userPass, 10);
        return hashedPass
    } catch (error) {
        throw error
    }
};


export async function compareHashedPassword(password, hasedPassword) {
    try {

        const isMatch = await bcrypt.compare(password, hasedPassword);
        return isMatch;
    } catch (error) {

        throw error

    }

}