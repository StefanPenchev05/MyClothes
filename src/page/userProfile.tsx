import React ,{lazy} from 'react'
import { useState,useEffect } from 'react'
import { Navigate, useParams, Route } from 'react-router-dom'
import { getData } from "../service/api"
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import UserDetails from '../components/NavBar/UI/UserDetails';
import Stack from '@mui/material/Stack';
import {  Html } from '@mui/icons-material';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import ProfileButtons from '../UserProfilePage/ProfileButtons';
import DisplayUserImages from '../UserProfilePage/DisplayUserImages';

interface UserInfo {
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
interface ProfileImage{
    
    url:string,
}
function UserProfile() {
  
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [visitorInfo,setVisitorInfo] = useState<UserInfo>();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isOwner,setIsOwner] = useState(false);
    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);
   
    const {username}= useParams();
    useEffect(() => {
        
        const getUserInfo = async() => {
            try{
                const user = await getData(`/user/${username}`);
                const visitor = await getData('/navBar/userInfo')
                if(!user.message&&!visitor.message){
                    setUserInfo(user);
                    setVisitorInfo(visitor);
                }else{
                    setUserInfo(undefined);
                }
                setIsLoaded(true);
                if(user.username===visitor.username)
                    setIsOwner(true);
                
            }catch(err){
                console.log(err);
            }
        }
        getUserInfo();
    }, []);
    
    
    
    
    return (
        
        isLoaded?(
        <div className={`w-full min-h-screen	 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>

            <div className={` flex  flex-col gap-2 w-[60%] ml-[20%] justify-center`}>
                <div className={`mt-[5%] flex flex-row w-full rounded-lg text-center ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}` }>
                    <div className='pt-[5%] pb-[5%] ml-[5%] w-[150px] '>
                        <AspectRatio ratio={1/1} variant='plain'>

                            <Avatar className='  ' alt='Profile Picture' src={userInfo?.avatar}></Avatar>
                        </AspectRatio>
                        <Typography className='w-[70%] ml-[15%] align-self-center' color="neutral"
                    level="h4"
                    noWrap={false}
                    variant="plain">{userInfo?.firstName} { userInfo?.lastName}</Typography>
                    </div>
                    <div className='mt-[5%] ml-[5%]'>
                    <Typography className='w-[70%] ml-[15%] flex flex-wrap align-self-center' color="neutral"
                    level="h4"
                    noWrap={false}
                    variant="plain">{userInfo?.username} </Typography>
                    <Typography className='w-[70%] ml-[15%] flex flex-wrap align-self-center' color="neutral"
                    level="body-lg"
                    noWrap={false}
                    variant="plain"
                    component='p'>{userInfo?.gender.charAt(0).toUpperCase()}{userInfo?.gender.slice(1)} </Typography>
                    </div>
                    <div className='mt-[5%] ml-[5%]'>
                        <ProfileButtons isOwner={isOwner}/>
                    </div>
                   

                </div>
                <div className={`w-[100%]  h-[500px]   ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}` }>
                                    
                
                 <DisplayUserImages userInfo={userInfo}/>
                
                                    
                </div>

            </div>
        </div>    
        ):
        (
            <div>
                <p>Nema bache</p>
            </div>
        )
        
                                
    
    )
}

export default UserProfile;