
import React, { useState } from 'react'
import {IconButton,Button, Avatar, Typography} from '@mui/material'
import {ArrowBack, Person2, Chat} from '@mui/icons-material'


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
    
        isOwner?(
            <div className='flex gap-2'>
                <Button variant="outlined">Settings</Button>
                <Button variant="outlined">Message</Button>
                
            </div>
        ):(
            <div className='flex space-x-4'>
                <Button variant="outlined">Follow</Button>
                <Button variant="outlined">Messages</Button>
            </div>
        )

        
    )
}

export default ProfileButtons;