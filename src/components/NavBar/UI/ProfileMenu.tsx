import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import { Settings, Logout, Person } from '@mui/icons-material';
import { getData } from '../../../service/api';

interface UserInfo {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number
}

interface ProfileMenuProps {
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>
}

function ProfileMenu({userInfo, setUserInfo}: ProfileMenuProps) {
    const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickProfile = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    }, []);

    const handleCloseProfile = useCallback(() => {
        setAnchorElProfile(null);
    }, []);

    const handleLogOut = useCallback(async(event:React.MouseEvent) => {
        event.preventDefault();
        handleCloseProfile();
        try{
            const data = await getData('/user/logout');
            window.location.reload();
        }catch(err){
            console.log("Error " + err);
        }
    }, []);
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
                anchorEl={anchorElProfile}
                open={Boolean(anchorElProfile)}
                onClose={handleCloseProfile}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <div onClick={() => { handleCloseProfile(); navigate(`/user/${userInfo.id}`); }}>
                            {t('navbar.MyProfile')}
                        </div>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <div onClick={() => { handleCloseProfile(); navigate('/user/settings'); }}>
                            {t('navbar.Settings')}
                        </div>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <div onClick={(e) => {handleLogOut(e)}}>
                            {t('Logout')}
                        </div>
                    </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileMenu;