import { useEffect, useState } from 'react';
import {Typography, Divider,} from '@mui/material';
import GoogleOAuth from '../Oauth2.0/GoogleOAuth';
import {FacebookRounded, GitHub, Twitter} from '@mui/icons-material';
import { gapi } from 'gapi-script';
import { useTranslation } from 'react-i18next';


function LoginOptions() {
  const [darkMode, setDarmMode] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const currentHour = new Date().getHours();
    setDarmMode(currentHour < 6 || currentHour >= 20);
  }, []);

  useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: '570607244002-u1tt1lu9esv786v6gu7lpukeo82b2t20.apps.googleusercontent.com',
          scope: ''
        })
      }
  
      gapi.load('client:auth2', start)
    }, [])

return (
  <>
      <Divider className='mt-6 mb-4'>
          <Typography
            className={`text-p-gray text-base font-bold font-roboto uppercase tracking-wide leading-7 ${darkMode ? 'text-white' : 'text-black'}`}
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
            {t('OR')}
          </Typography>
      </Divider>
      <div className="flex justify-center space-x-6 mt-7">
          <FacebookRounded color='primary' sx={{ margin: '0 8px' }} />
          <Twitter color='primary' sx={{ margin: '0 8px' }} />
          <GitHub sx={{ margin: '0 8px', color: darkMode ? 'white' : "black" }} />
          {/* <Google color='error' sx={{ margin: '0 8px' }} /> */}
          <GoogleOAuth></GoogleOAuth>
      </div>
  </>
)
}

export default LoginOptions