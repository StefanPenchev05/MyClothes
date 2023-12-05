import { Google } from '@mui/icons-material';
//import { GoogleLogin } from 'react-google-login'

function GoogleOAuth(){

    const GoogleAuth = async(response:any) => {
        console.log(response);

        //see if the cradentials of the google account are in our databse
        //const existingUser = await authenticateUser(response)
        
    }

    const GoogleAuthError = async(response:any) => {
        console.log(response);

        //see if the cradentials of the google account are in our databse
        //const existingUser = await authenticateUser(response)
        
    }

    //sends the email and password to the server to check if exists
    const authenticateUser = async(response:any) => {
        const {email, password} = response;

        const res = await fetch("http://localhost:5500/user/login", {
            method: "POST",
            body: JSON.stringify(email, password),
            headers: {
                "Content-type" : "application/json"
            }
        });

        if(res.ok){
            return await res.json();
        }else{
            console.log(res);
        }
    }

    return (
        // <GoogleLogin
        //     onSuccess={GoogleAuth}
        //     onFailure={GoogleAuthError}
        //     cookiePolicy={'single_host_origin'}
        //     clientId='570607244002-u1tt1lu9esv786v6gu7lpukeo82b2t20.apps.googleusercontent.com'
        //     render={(renderProps) => (
        //         <Google
        //           onClick={renderProps.onClick}
        //           color="error"
        //           sx={{ margin: '0 8px' }}
        //         />
        //       )}
        // />
        <div>Google</div>
    )
}

export default GoogleOAuth