const postUrl = "http://localhost:3000/signUp";

const form = document.getElementById('form-signup');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const passoword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('cnfrm-password').value;

    const errorText = document.getElementById('errorText');
    

    if (passoword !== confirmPassword) {

        errorText.innerText = 'Password MIss Match';


        setTimeout(() => {

            errorText.innerText = '';


        }, 1500)
    }
    else {

        try {
            const signUpData = { username, email, passoword };
            const respose = await axios.post(postUrl, signUpData);
            if (respose.status === 200) {
                const redirectUrl = respose.request.responseURL;
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



    }

})
