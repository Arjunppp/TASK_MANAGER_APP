



export async function handleHomeRoute(req , res)
{
 res.render('home');
};

export async function handleLoginRoute(req ,res)
{
    res.render('login');
};

export async function handleSignupRoute(req, res)
{
    res.render('signUp');
};

export async function handleLoginPost(req , res)
{
  console.log(req.body);
};

export async function handleSignupPost(req , res)
{
    console.log(req.body);
}