import React ,{lazy} from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from "../service/api"
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import UserDetails from '../components/NavBar/UI/UserDetails';
import Stack from '@mui/material/Stack';
import {  Html } from '@mui/icons-material';
import AspectRatio from '@mui/joy/AspectRatio';
interface UserInfo {
    id:string,
    firstName: string,
    lastName: string,
    username:string,
    avatar: string,
    gender:string,
    profileImages:ProfileImage[],
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number

}
function UserProfile() {
  
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [visitorInfo,setVisitorInfo] = useState<UserInfo>();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [pfpWidth,setPfpWidth] = useState(0);
    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);
   
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const data = await getData(`/user/${username}`);
                if(!data.message){
                    setUserInfo(data);
                }else{
                    setUserInfo(undefined);
                }
                setIsLoaded(true);
            }catch(err){
                console.log(err);
            }
        }

        getUserInfo();
    }, []);
    
    return (
        
            
        <Grid container className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4`}>

            <Grid container spacing={2} columns={16} className='flex justify-center align-center bg-white'>
            
            <Grid item xs={4} id='container' className='bg-gray-300 flex   justify-center align-center bg-white'>
                <div className='flex flex-col w-full justify-center align-center'>
                <div>
                <AspectRatio className='w-3/5 flex justify-center align-center ml-[20%]'
                variant="outlined"
                ratio="1/1"
                sx={{
                    
                    bgcolor: 'background.level2',
                    borderRadius: 'md',
                }}
                >
                 <Avatar alt="Profile Picture" src={userInfo?.avatar}    variant="rounded" />
                    
                </AspectRatio>
                
               
                </div>
                <div>
                <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
                <Stack spacing={0.1} divider={<Divider orientation="horizontal" flexItem />}>
                <p className='text-center text-l'>{userInfo?.firstName}</p>
                <p className='text-center text-2xl'>{userInfo?.firstName}</p>
                </Stack>
                <Stack spacing={0.1} divider={<Divider orientation="horizontal" flexItem />}>
                <p className='text-center text-l'>{userInfo?.lastName}</p>
                <p className='text-center text-2xl'>{userInfo?.lastName}</p>
                </Stack>
                
                <div>

                <p className='text-center'>{userInfo?.purchasedProducts}</p>
                </div>
                </Stack></div>

                </div>
            </Grid>
            <Grid item xs={8} className='bg-black text-sky-400'>
                {userInfo?.purchasedProducts}
            </Grid>
            </Grid>

        </Grid>

        
                                
    
    )
}

export default UserProfile;