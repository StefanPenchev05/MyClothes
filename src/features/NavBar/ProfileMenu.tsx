import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import { Settings, Logout, Person } from '@mui/icons-material';

import { getData } from '../../service/api';
import { clearUser } from '../users/userNavBarSlice';

function ProfileMenu() {
    const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
    const [navigateTo, setNavigateTo] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const avatar = useSelector((state: any) => state.userNavBar.avatar);
    const id = useSelector((state: any) => state.userNavBar.id);

    const handleClickProfile = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    }, []);

    const handleCloseProfile = useCallback((path: string | null = null) => {
        setAnchorElProfile(null);
        setNavigateTo(path);
    }, []);

    useEffect(() => {
        if (anchorElProfile === null && navigateTo) {
            navigate(navigateTo);
            setNavigateTo(null);
        }
    }, [anchorElProfile, navigateTo, navigate]);

    const handleLogOut = useCallback(async(event:React.MouseEvent) => {
        event.preventDefault();
        handleCloseProfile();
        try{
            await getData('/user/logout');
            dispatch(clearUser());
            window.location.href = '/user/login';
        }catch(err){
            console.log("Error " + err);
        }
    }, [dispatch]);

    return (
        <div className="inline">
            <Tooltip title={t('navbar.MyProfile')}>
                <IconButton
                    size="small"
                    sx={{ width: 56, height: 56 }}
                    onClick={handleClickProfile}
                >
                    <Avatar src={avatar} alt="user" sx={{ width: 56, height: 56 }} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorElProfile}
                open={Boolean(anchorElProfile)}
                onClose={() => handleCloseProfile()}
            >
                <MenuItem onClick={() => handleCloseProfile(`/user/profile/${id}`)}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        {t('navbar.MyProfile')}
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleCloseProfile('/user/settings')}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        {t('navbar.Settings')}
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={(e) => {handleLogOut(e)}}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                            {t('Logout')}
                    </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileMenu;