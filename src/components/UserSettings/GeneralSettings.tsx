import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Typography, Chip } from '@mui/material'
import { fetchGeneralSettings } from '../../features/users/userGeneralSettings'
import UserAvatar from './UI/UserAvatar';

interface Adress {
  street: String;
  city: String;
  state: String;
  zip: String;
  country: String;
}

interface Avatar {
  avatar: string;
  fileType: String;
  uploadedAt: Date;
}

interface ProfileImages {
  url: string;
  uploadDate: Date;
}

interface GeneralSettings {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "Don't want to state";
  role: "standardUser" | "designer" | "admin";
  phone: string;
  adress?: Adress;
  avatar: Avatar | null;
  profileImages: ProfileImages[] | ProfileImages | null;
}

export default function GeneralSettings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGeneralSettings() as any);
  }, [dispatch]);

  const userData = useSelector((state: any) => state.userSettings);
  const navBarData = useSelector((state: any) => state.userNavBar);

  const settings:GeneralSettings = useSelector((state: any) => state.generalSettings);
  console.log(settings)

  return (
  <div className='w-full p-4' style={{height: 'calc(100vh - 70px)'}}>
    <div className='h-full p-12 bg-gray-200 rounded-xl'>
      <div className='flex items-start space-x-6'>
        <UserAvatar settings={settings} />
        <div className='flex flex-col'>
          <text>Information</text>
        </div>
      </div>
    </div>
  </div>
  )
}