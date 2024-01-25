import React  from 'react'
import { useState,useEffect } from 'react'
import { useParams,Navigate } from 'react-router-dom'
import { getData } from "../service/api"
import Rating from '@mui/material/Rating';


import Avatar from '@mui/material/Avatar';

import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import ProfileButtons from '../UserProfilePage/ProfileButtons';
//import DisplayUserImages from '../UserProfilePage/DisplayUserImages';
import { Session } from 'inspector';



interface UserInfo {
    
    firstName: string,
    lastName: string,
    username:string,
    avatar: string,
    gender:string,
    profileImages:ProfileImage[],
    rating:number,
    role: string,
    designerInfo:DesignerInfo|undefined,
    purchasedProducts: number,
    

}
interface DesignerInfo {
    
    bio: string;
    portfolio: string;
    skills: string[];
    rating: number;
    posts: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
    awards: {
      title: string;
      year: number;
    }[];
    education: {
      school: string;
      degree: string;
      fieldOfStudy: string;
      startYear: number;
      endYear: number;
    }[];
    experience: {
      jobTitle: string;
      company: string;
      startYear: number;
      endYear: number;
      jobDescription: string;
    }[];
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