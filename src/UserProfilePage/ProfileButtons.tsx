
import React, { useState } from 'react'
import {IconButton,Button, Avatar, Typography,SvgIcon} from '@mui/material'
import {ArrowBack, Person2, Chat} from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings';

interface UserInfo {
    firstName: string,
    lastName: string,
    username:string,
    avatar: string,
    gender:string,
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number

}

function ProfileButtons({isOwner}:{isOwner:boolean}){
    
    return(
    
        true?(
            <div className='flex gap-2'>
                
                <Button variant="outlined" href='/user/messages'>Messages</Button>
                <Button variant='outlined' href='/user/settings'><SvgIcon  component={SettingsIcon}/></Button>
                
            </div>
        ):(
            <div className='flex space-x-4'>
                <Button variant="outlined">Follow</Button>
                <Button variant="outlined">Message</Button>
            </div>
        )

        
    )
}

export default ProfileButtons;