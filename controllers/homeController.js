



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
}