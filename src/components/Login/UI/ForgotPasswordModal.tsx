import { 
  Dialog, DialogTitle, DialogContent, 
  DialogContentText, TextField, DialogActions,
  Button, CircularProgress,
} from "@mui/material"
import { useState } from "react";

import { validateEmail } from "../../../utils/validators";
import { sendData } from "../../../service/api";

type SnackBarMsgTypes = {
  type: boolean,
  msg: string
}

interface ModelArguments{
  open: boolean,
  setSnackBarShow: React.Dispatch<React.SetStateAction<boolean>>,
  setSnakBarMsg:  React.Dispatch<React.SetStateAction<SnackBarMsgTypes>>,
  setModelPassForgot: React.Dispatch<React.SetStateAction<boolean>>
}

function ForgotPassModal({open,setSnackBarShow,setSnakBarMsg,setModelPassForgot }:ModelArguments) {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseModel = () => {
    setModelPassForgot(false);
    setEmailError('');
    setEmail('');
  }

  const sendEmail = async(email: string) => {
    setEmailError('');
    setLoading(true);
  
    if (!validateEmail(email)) {
      setEmailError('Please enter your email!');
      setLoading(false);
      return;
    }
  
    const response = await sendData('/user/reset-password', { email });

    if (response.status < 500) {
      if (response.data.success) {
        setSnackBarShow(true);
        setSnakBarMsg({ type: true, msg: 'The email has been successfully sent!' });
        handleCloseModel();
      } else {
        setSnackBarShow(false);
        setEmailError(response.data.msg);
      }
    } else {
      console.log(response);
      setSnackBarShow(true);
      setSnakBarMsg({ type: false, msg: 'Server error. Please try again later!' });
      handleCloseModel();
    }
  
    setLoading(false);
  };  

  const handleOnKeyDown = (event:React.KeyboardEvent<HTMLDivElement>) => {
    switch(event.key){
      case 'Enter':
        sendEmail(email);
        break;
      case 'Escape':
        handleCloseModel();
        break;
    }
  }
  

  return (
    <Dialog open={open} onClose={handleCloseModel} onKeyDown={handleOnKeyDown}>
      <DialogTitle className="bg-purple-button text-white subpixel-antialiased font-semibold mb-4">
        Forgot Your Password?
      </DialogTitle>
        <DialogContent className="p-10">
          <DialogContentText className="mb-4">
            Please enter your email, in order to send you email for resetting your password.
            Your email is essential for us to ensure the security of your account.
          </DialogContentText>
          <TextField
              autoFocus
              id="name"
              label="Email Address"
              type="email"
              autoComplete='email'
              fullWidth
              variant="standard"
              error= {!!emailError}
              helperText= {emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
        </DialogContent>
        <DialogActions className="flex justify-around">
            <Button 
              variant="contained" 
              onClick={handleCloseModel} 
              className='bg-purple-button w-1/2'
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={() => sendEmail(email)}
              className="bg-purple-button w-1/2"
              >
                {loading ? <CircularProgress size={24} /> : 'Send'}
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ForgotPassModal