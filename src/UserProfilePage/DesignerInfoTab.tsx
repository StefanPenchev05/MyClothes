import React  from 'react'
import { useState,useEffect } from 'react'
import { useParams,Navigate } from 'react-router-dom'
import { getData } from "../service/api"
import Rating from '@mui/material/Rating';
import Card from '@mui/joy/Card';
import Avatar from '@mui/material/Avatar';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import ProfileButtons from '../UserProfilePage/ProfileButtons';

import { Session } from 'inspector';
import { Divider } from '@mui/material';



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

export default function InfoTab({userInfo}:{userInfo:any}){
    const designerInfo = userInfo.designerInfo as DesignerInfo;
    return (
        <div className='w-[1068px] h-[500px] flex felx-row justify-center space-x-4'>
            
            <div className='w-[40%] h-full bg-red-200 flex flex-col  '>
                <div className='w-full h-auto flex rounded-lg mb-[5%] flex-col m  '>
                  <Card variant='outlined' className=''>

                    <legend className='pl-2 text-xl'> Rating</legend>
                    <Divider className=' w-[100%] items-center'/>
                    <div className='flex my-auto flex-row space-x-2 items-center'>
                        <Typography className='pl-2 text-3xl ' >{designerInfo.rating}</Typography>
                        <Rating
                        size='large'
                        name="half-rating-read"
                        precision={0.1}
                        value={designerInfo.rating}
                        className='  ml-auto'
                        readOnly
                        />
                    </div>
                  </Card>
                </div>
                <div className='h-[60%] w-full '>
                  <Card variant='outlined' className='h-[120%]'>
                    <legend className='pl-2 text-xl'>Biography</legend>
                    <Divider className='w-[100%] items-center'/>
                    <Typography className='pl-2 text-md'>{designerInfo.bio}</Typography>
                  </Card>
                </div>
            </div>
            <div className='w-[40%] h-full ml-[3%] bg-red-300 flex flex-col'>
              <div className='h-[100%] w-full'>
                <Card variant='outlined' className='h-full w-full'>
                  <legend className=' align-baseline pl-2 text-xl'>Informarion</legend>
                  <Divider className=' w-full items-center'/>
                    <p className=' font-semibold'>School:</p>
                    {/*designerInfo.education.map()*/}
                    <p className=' font-medium'></p>
                    <p className=' font-medium'></p>
                    <p className=' font-medium'></p>
                    <p className=' font-medium'></p>
                  
                </Card>
              </div>
            
            </div>
        
        </div>
    )
}