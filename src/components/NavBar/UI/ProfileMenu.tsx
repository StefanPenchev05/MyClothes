import React from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Person2, Settings, Logout } from "@mui/icons-material";
import { sendData } from '../../../service/api';
import {IconButton, Menu, MenuItem, Tooltip, Avatar, ListItemIcon, ListItemText} from "@mui/material";


interface UserInfo {
    firstName: string,
    lastName: string,
    avatar: string,
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number
}

interface ProfileMenuProps {
    userInfo: UserInfo
}

function ProfileMenu({userInfo}: ProfileMenuProps) {
    const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    }

    const handleCloseProfile = () => {
        setAnchorElProfile(null);
    }

    const handleLogOut = async(event:React.MouseEvent) => {
        event.preventDefault();
        try{
            console.log('logout');
            await sendData('/user/logout');
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="inline">
        <Tooltip title={t('navbar.MyProfile')}>
            <IconButton
                size="small"
                sx={{ width: 56, height: 56 }}
                onClick={handleClickProfile}
            >
                <Avatar src={userInfo.avatar} alt="user" sx={{ width: 56, height: 56 }} />
            </IconButton>
        </Tooltip>
        <Menu
        id="basic-menu"
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfile}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem onClick={handleCloseProfile}>
            <ListItemIcon>
                <Person2 fontSize="small" />
            </ListItemIcon>
            <ListItemText>
                <Link to={'/user/profile'}>
                    {t('navbar.MyProfile')}
                </Link>
            </ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>
                <Link to={'/user/settings'}>
                    {t('navbar.Settings')}
                </Link>
            </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>
                <Link to={'/home'} onClick={handleLogOut}>
                    {t('LogOut')}
                </Link>
            </ListItemText>
        </MenuItem>
        </Menu>
    </div>
  )
}

export default ProfileMenu