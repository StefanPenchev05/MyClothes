import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import ProfileButtons from '../UserProfilePage/ProfileButtons';

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

interface UserPanelProps {
  userInfo: UserInfo | undefined;
}

const UserPanel: React.FC<UserPanelProps> = ({ userInfo }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setDarkMode(currentHour < 6 || currentHour >= 20);
  }, []);

  return (
    <div className={`mt-[5%] flex flex-row w-full rounded-lg text-center justify-between ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className='pt-[5%] pb-[5%] ml-[5%] w-[150px]'>
        <AspectRatio sx={{ height: 150 }} ratio={1 / 1} variant='plain'>
          <Avatar alt='Profile Picture' src={userInfo?.avatar} />
        </AspectRatio>
        <Typography className='w-[70%] ml-[15%] align-self-center' color="neutral"
          level="h4"
          noWrap={false}
          variant="plain">{userInfo?.firstName} {userInfo?.lastName}</Typography>
      </div>
      <div className='mt-[5%] mr-[5%]'>
        <ProfileButtons isOwner={isOwner} />
      </div>
    </div>
  )
}

export default UserPanel;