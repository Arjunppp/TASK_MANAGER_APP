

const loginUrl = "http://localhost:3000/login";


const form  = document.getElementById('login');

const errorText = document.getElementById('errorText');

form.addEventListener('submit' ,async (event)=> 
{
   try {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userData =  {username , password};
   
    

    const reponse =  await axios.post(loginUrl , userData);
    if (reponse.status === 200) {
        const redirectUrl = reponse.request.responseURL;
        window.location.href = redirectUrl;
    }
    
   } catch (error) {
    if (error.response.status === 409) {
        
        errorText.innerText = error.response.data.error
      setTimeout(()=> 
    {
        errorText.innerText ='';
    } , 1500)
    }
   }
})