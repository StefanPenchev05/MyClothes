import { Grid, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Background from '../assets/images/boy-with-rocket-light.png';
import Skater from '../assets/images/skater.png';

//components
import LoginForm from '../components/Login/LoginForm';
import LoginOptions from '../components/Login/LoginOptions';

function UserLogin() {
  const [darkMode, setDarmMode] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setDarmMode(currentHour < 6 || currentHour >= 20);
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
                MyClothes
              </Typography>
            </Box>
          </Box>
          <Box className='mb-3'>
            <Typography className={`font-medium text-2xl ${darkMode ? 'text-white' : 'text-gray-black'}`}>
              Welcome to MyClothes👋🏻
            </Typography>
          </Box>
          <Box className='mb-6'>
            <Typography className={`text-p-gray ${darkMode ? 'text-white' : ''}`}>
            Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <Box>
            <LoginForm/>
            <LoginOptions/>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserLogin;