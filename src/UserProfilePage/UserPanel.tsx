import React  from 'react'
import { useState,useEffect } from 'react'
import { useParams,Navigate } from 'react-router-dom'
import { getData } from "../service/api"


import Avatar from '@mui/material/Avatar';

import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import ProfileButtons from '../UserProfilePage/ProfileButtons';
import DisplayUserImages from '../UserProfilePage/DisplayUserImages';
import { Session } from 'inspector';



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
interface ProfileImage{
    
    url:string,
}

function UserPanel({userInfo}:{userInfo:UserInfo|undefined}){
    const [isOwner,setIsOwner] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
        
    }, []);
    return(  
       
        <div className={`mt-[5%] flex flex-row w-full rounded-lg text-center justify-between ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}` }>
            <div className='pt-[5%] pb-[5%] ml-[5%] w-[150px] '>
                <AspectRatio sx={{height:150}} ratio={1/1} variant='plain'>

                    <Avatar className='  ' alt='Profile Picture' src={userInfo?.avatar}></Avatar>
                </AspectRatio>
                <Typography className='w-[70%] ml-[15%] align-self-center' color="neutral"
            level="h4"
            noWrap={false}
            variant="plain">{userInfo?.firstName} { userInfo?.lastName}</Typography>
            <Typography className='w-[70%] ml-[15%] flex flex-wrap align-self-center' color="neutral"
            level="body-lg"
            noWrap={false}
            variant="plain"
            component='p'>{userInfo?.gender.charAt(0).toUpperCase()}{userInfo?.gender.slice(1)} </Typography>
            </div>
            <div className='mt-[5%] ml-[5%]'>
            
            </div>
            <div className='mt-[5%] mr-[5%]'>
                <ProfileButtons isOwner={isOwner}/>
            </div>
           

        </div>
  )

     
}

export default UserPanel;