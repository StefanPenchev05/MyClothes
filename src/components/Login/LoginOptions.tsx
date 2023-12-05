import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Typography, Divider,} from '@mui/material';
import GoogleOAuth from '../Oauth2.0/GoogleOAuth';
import {FacebookRounded, GitHub, Twitter} from '@mui/icons-material';
import { gapi } from 'gapi-script';

function LoginOptions() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: '570607244002-u1tt1lu9esv786v6gu7lpukeo82b2t20.apps.googleusercontent.com',
            scope: ''
          })
        }
    
        gapi.load('client:auth2', start)

        const currentHour = new Date().getHours();
        setIsDarkMode(currentHour < 6 || currentHour >= 20);
      }, [])

  return (
    <>
        <div className={`flex justify-center mt-5 `}>
            <p className={`text-p-gray mr-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                New on our platform?
            </p>
            <p className='text-purple-button'>
                <Link to={'/user/registration'}>Create an account</Link>
            </p>
        </div>
        <Divider className='mt-6' sx={{ borderColor: isDarkMode ? 'white' : 'black' }} >
            <Typography
              className={`text-p-gray text-base font-bold font-roboto uppercase tracking-wide leading-7 ${isDarkMode ? 'text-white' : 'text-black'}`}
              sx={{
                '&::before, &::after': {
                  content: '""',
                  flex: 1,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.38)',
                  margin: 'auto'
                },
                '&::before': {
                  marginRight: '0.25em'
                },
                '&::after': {
                  marginLeft: '0.25em'
                }
              }}
            >
              or
            </Typography>
        </Divider>
        <div className="flex justify-center space-x-6 mt-7">
            <FacebookRounded color='primary' sx={{ margin: '0 8px' }} />
            <Twitter color='primary' sx={{ margin: '0 8px' }} />
            <GitHub sx={{ margin: '0 8px', color: isDarkMode ? 'white' : "black" }} />
            {/* <Google color='error' sx={{ margin: '0 8px' }} /> */}
            <GoogleOAuth></GoogleOAuth>
        </div>
    </>
  )
}

export default LoginOptions