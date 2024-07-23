import { postLogin, postSignUp } from "../services/userServices.js";
import { compareHashedPassword, getHashedPassword } from "../utils/bcryptUtil.js";
import { createToken } from "../utils/jwtUtils.js";




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
  try {

    const { username, password } = req.body;

    const userFromDb = await postLogin(username, password);

    if(userFromDb.length == 0)
    {
      throw new Error("User does not exist");
    }
    else if(userFromDb.length > 1)
    {
      throw new Error("Multiple users exists");
    }
    else
    {
      let isMatch = await compareHashedPassword(password , userFromDb[0].password);
      if(!isMatch)
      {
        throw new Error("Password is incorrect")
      }
      else{
        
        let tokendata = {_id :userFromDb[0]._id , username:userFromDb[0].username ,role:userFromDb[0].role};
        console.log(tokendata);
        let token  = createToken(tokendata);
        res.cookie('userToken', token).status(200).redirect('/userpage');
      }

    }


  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }

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