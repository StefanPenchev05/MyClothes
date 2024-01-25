import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserSettings } from '../../features/users/userSettingsSlice'

export default function GeneralSettings() {
  const userCradential = useSelector((state: any) => state.userNavBar)
  console.log(Object.keys(userCradential))
  
  const useDispatchHook = useDispatch()
  React.useEffect(() => {
    useDispatchHook(fetchUserSettings() as any)
  }, [useDispatchHook])

  const test = useSelector((state: any) => state.userSettings)
  console.log(Object.keys(test.user))

  return (
  <div className='w-full p-4' style={{height: 'calc(100vh - 70px)'}}>
    <div className='h-full p-4 bg-gray-200 rounded-xl'>
      <div className='flex space-x-4 items-center'>
        <Avatar
          alt="Remy Sharp"
          src={userCradential.avatar}
          sx={{ width: 200, height: 200 }}
        />
        <div className='flex flex-col'>
          <Typography variant="h6" className='mt-5'>
              Name: {userCradential.firstName}
          </Typography>
          <Typography variant="h6" className='mt-5'>
              Last Name: {userCradential.lastName}
          </Typography>
        </div>
      </div>
    </div>
  </div>
  )
}