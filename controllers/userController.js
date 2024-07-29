


export async function handleGetUserPage(req , res)
{
    try {
        const logedUser = req.user;
        //for the user --- find the projects in which he is memeber and the task which is associated
        //Aggreagate users -projects - tasks
        
       
        res.render('userPage')
        
    } catch (error) {
        
    }
}