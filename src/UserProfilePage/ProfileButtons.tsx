import React from 'react';
import { Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface ProfileButtonsProps {
    isOwner: boolean;
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({ isOwner }) => {
    return (
        isOwner ? (
            <div className='flex gap-2'>
                <Button variant="outlined" href='/user/messages'>Messages</Button>
                <Button variant='outlined' href='/user/settings'>
                    <SvgIcon component={SettingsIcon} />
                </Button>
            </div>
        ) : (
            <div className='flex space-x-4'>
                <Button variant="outlined">Follow</Button>
                <Button variant="outlined">Message</Button>
            </div>
        )
    );
}

export default ProfileButtons;