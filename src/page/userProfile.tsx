import React from 'react'
import { useState,useEffect } from 'react'
import { Navigate, useParams, Route } from 'react-router-dom'
import { getData } from "../service/api"
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import UserDetails from '../components/NavBar/UI/UserDetails';

interface UserInfo {
    firstName: string,
    lastName: string,
    avatar: string,
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number

}
function UserProfile() {
  
    const [userInfo, setUserInfo] = useState<UserInfo>();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);
    
    const {username}= useParams();
    useEffect(() => {
        
        const getUserInfo = async() => {
            try{
                const data = await getData('user/:username');
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
        
            
        <Grid container className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>

            <Grid container spacing={2} columns={16}>
            <Grid item xs={4}>
                {username}
            </Grid>
            <Grid item xs={4}>
                {userInfo?.firstName}
            </Grid>
            <Grid item xs={8}>
                <img src={userInfo?.avatar}></img>
            </Grid>
            </Grid>

        </Grid>

        
                                
    
    )
}

export default UserProfile;