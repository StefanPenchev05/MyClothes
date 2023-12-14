import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from "../service/api"
import { Card, CardContent, CardMedia, Typography, List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';

interface UserInfo {
    id:string,
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
    const [pfpWidth,setPfpWidth] = useState(0);
    const { token } = useParams();

    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);
   
    useEffect(() => {
        const getUserInfo = async() => {
            try {
                const data = await getData(`/user/profile/${token}`);
                if (!data.message) {
                    setUserInfo(data);
                } else {
                    setUserInfo(undefined);
                }
            } catch (error) {
                console.error('Error getting user info: ', error);
            }
        }

        getUserInfo();
    }, [token]);
    
    return (
        <>
        </>
    );
}

export default UserProfile;