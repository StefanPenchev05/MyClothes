import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Typography, Chip } from '@mui/material'
import { fetchUserSettings } from '../../features/users/userSettingsSlice'

export default function GeneralSettings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserSettings() as any);
  }, [dispatch]);

  const userData = useSelector((state: any) => state.userSettings);
  const navBarData = useSelector((state: any) => state.userNavBar);

  const userCredentials = { ...userData, ...navBarData };

  console.log(userCredentials);

  return (
  <div className='w-full p-4' style={{height: 'calc(100vh - 70px)'}}>
    <div className='h-full p-12 bg-gray-200 rounded-xl'>
      <div className='flex items-start space-x-6'>
        <Avatar
          alt="Remy Sharp"
          src={userCredentials.avatar}
          sx={{ width: 270, height: 300, borderRadius: '15%'}}
        />
        <div className='flex flex-col'>
          <text>Information</text>
        </div>
      </div>
    </div>
  </div>
  )
}