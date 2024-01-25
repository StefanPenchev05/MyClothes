import React from 'react';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

interface Award {
  title: string;
  year: number;
}

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

interface Experience {
  jobTitle: string;
  company: string;
  startYear: number;
  endYear: number;
  jobDescription: string;
}

interface DesignerInfo {
  bio: string;
  portfolio: string;
  skills: string[];
  rating: number;
  posts: string;
  socialLinks: SocialLinks;
  awards: Award[];
  education: Education[];
  experience: Experience[];
}

interface ProfileImage {
  url: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  gender: string;
  profileImages: ProfileImage[];
  rating: number;
  role: string;
  designerInfo: DesignerInfo | undefined;
  purchasedProducts: number;
}

interface InfoTabProps {
  userInfo: UserInfo;
}

const InfoTab: React.FC<InfoTabProps> = ({ userInfo }) => {
  const designerInfo = userInfo.designerInfo as DesignerInfo;

  return (
    <div className='w-[1068px] h-[500px] flex flex-row justify-center space-x-4'>
      <div className='w-[40%] h-full bg-red-200 flex flex-col'>
        <Card variant='outlined' className='w-full h-auto flex rounded-lg mb-[5%] flex-col'>
          <legend className='pl-2 text-xl'> Rating</legend>
          <Divider className='w-[100%] items-center'/>
          <div className='flex my-auto flex-row space-x-2 items-center'>
            <Typography className='pl-2 text-3xl'>{designerInfo.rating}</Typography>
            <Rating
              size='large'
              name="half-rating-read"
              precision={0.1}
              value={designerInfo.rating}
              className='ml-auto'
              readOnly
            />
          </div>
        </Card>
        <Card variant='outlined' className='h-[60%] w-full'>
          <legend className='pl-2 text-xl'>Biography</legend>
          <Divider className='w-[100%] items-center'/>
          <Typography className='pl-2 text-md'>{designerInfo.bio}</Typography>
        </Card>
      </div>
      <div className='w-[40%] h-full ml-[3%] bg-red-300 flex flex-col'>
        <Card variant='outlined' className='h-[100%] w-full'>
          <legend className='align-baseline pl-2 text-xl'>Information</legend>
          <Divider className='w-full items-center'/>
            <p className=' font-semibold'>School:</p>
            <p className=' font-medium'></p>
            <p className=' font-medium'></p>
            <p className=' font-medium'></p>
            <p className=' font-medium'></p>
        </Card>
      </div>
    </div>
  );
}

export default InfoTab;