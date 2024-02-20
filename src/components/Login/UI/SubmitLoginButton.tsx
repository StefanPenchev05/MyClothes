import React from 'react'
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendData } from '../../../service/api';
import { useTheme } from '../ThemeContext';
import { useSnackbar } from 'notistack';

import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/users/userBaseInfo';


function SubmitLogin() {
  const dispatch = useDispatch();
    const {
      emailOrUsername, 
      password, 
      rememberMe, 
      setEmailOrUsernameError, 
      setPasswordError
    } = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async(event:React.FormEvent):Promise<boolean> => {
        event.preventDefault();
        setEmailOrUsernameError('');
        setPasswordError('');

        if(emailOrUsername.length === 0){
          setEmailOrUsernameError('Email or Username must be at least 12 cheracters');
          return false;
        }
    
        const response = await sendData('/user/login', {emailOrUsername, password, rememberMe});

        if (response.ok === false){
          enqueueSnackbar('Server error. Please try again later.', {variant: 'error', autoHideDuration: 3000});
          return false;
        }
    
        if(response.status < 500){
          const data = response.data;
          if(data.success === false){
            if(data.type === "UserNotFound"){
              setEmailOrUsernameError(data.msg);
              return false;
            }
            else if(data.type === "IncorrectPassword"){
              setPasswordError(data.msg);
              return false;
            }
          }
    
          navigate("/");
          dispatch(setUser(data.data));
          enqueueSnackbar('Login successful', {variant: 'success', autoHideDuration: 3000});
          return true;
        }
        return true;
      }

  return (
    <div>
        <Button
          type='submit'
          variant='contained'
          color="primary"
          className='bg-purple-button 
                      hover:bg-purple-button 
                      font-medium 
                      rounded-lg 
                      h-12 text-base
                      w-full
                      mt-4'
          onClick={e => onSubmit(e)}
          >
          Sign In
        </Button>
    </div>
  )
}

export default SubmitLogin