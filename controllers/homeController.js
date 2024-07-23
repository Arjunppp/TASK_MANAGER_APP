import { postSignUp } from "../services/userServices.js";
import { getHashedPassword } from "../utils/bcryptUtil.js";




export async function handleGetHome(req, res) {
  res.render('home');
};

export async function handleGetLogin(req, res) {
  res.render('login');
};

export async function handleGetSignup(req, res) {
  res.render('signUp');
};

export async function handlePostLogin(req, res) {
  console.log(req.body);
};

export async function handlePostSignUp(req, res) {
  try {
    const { username, email, passoword } = req.body;
    console.log(username, email, passoword);
    const hasedPass = await getHashedPassword(passoword);
    await postSignUp(username, email, hasedPass);
    res.status(200).redirect('/login');

  } catch (error) {
    console.error(error)
    let errMsg;
    if (error.keyValue.hasOwnProperty('username')) {
      errMsg = 'Username already exists';
    } else if (error.keyValue.hasOwnProperty('email')) {
      errMsg = 'Email already exists';
    } else {

      errMsg = 'some Unexpected error occured ,please try again';
    }
    res.status(409).json({ error: errMsg });
  }

}