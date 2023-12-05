import { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Background from '../assets/images/girl-with-laptop-light.png';
import Skater from '../assets/images/skater.png';

//components
import MultiSignUpForm from '../components/Signup/MultiSignUpForm'
import LoginOptions from "../components/Signup/LoginOptions";

function UserSignup() {
  const [darkMode, setDarkMode] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const currentHour = new Date().getHours();
    setDarkMode(currentHour >= 20  || currentHour <= 6);
  }, []);

  return (
    <Grid container className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Grid item xs={12} md={7} lg={8} className='flex justify-center items-center'>
        <img src={Background} className='w-full md:w-3/4 lg:w-2/3' alt='Background'></img>
      </Grid>
      <Grid item xs={12} md={5} lg={4} className={`flex justify-center items-center text-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Box className='w-4/5'>
          <Box className='flex items-center mb-12'>
            <Box className='w-10 mr-2'>
              <img src={Skater} alt='Skater'></img>
            </Box>
            <Box>
              <Typography className={`font-bold text-3xl ${darkMode ? 'text-white' : 'text-gray-black'}`}>
                {t('MyClothes')}
              </Typography>
            </Box>
          </Box>
          <Box className='mb-3'>
            <Typography className={`font-medium text-2xl ${darkMode ? 'text-white' : 'text-gray-black'}`}>
              {t('Welcome to MyClothes👋🏻')}
            </Typography>
          </Box>
          <Box className='mb-6'>
            <Typography className={`text-p-gray ${darkMode ? 'text-white' : ''}`}>
              {t('registration.Please sign up to unlock a world of exclusive benefits, personalized experiences, and the latest updates tailored just for you!')}
            </Typography>
          </Box>
          <Box>
            <MultiSignUpForm/>
            <LoginOptions/>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default UserSignup