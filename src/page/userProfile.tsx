import React, { useState, useEffect } from 'react';
import { useParams, Navigate, redirect } from 'react-router-dom';
import { getData } from "../service/api";
import Typography from '@mui/joy/Typography';
import { Tabs, Tab, TabsList, TabPanel } from '@mui/base';
import DisplayUserImages from '../UserProfilePage/DisplayUserImages';
import UserPanel from '../UserProfilePage/UserPanel';

interface UserInfo {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    avatar: string,
    gender: string,
    profileImages: ProfileImage[],
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number
}

interface ProfileImage {
    url: string,
}

function UserProfile() {
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { token } = useParams();

    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const data = await getData(`/user/profile/${token}`);
                if (!data.message) {
                    setUserInfo(data);
                    setIsLoaded(true);
                } else {
                    setUserInfo(undefined);
                    redirect('/home')
                }
            } catch (error) {
                console.error('Error getting user info: ', error);
            }
        }

        getUserInfo();
    }, [token]);

    return (
            <div className={`flex flex-col gap-2 w-[60%] ml-[20%] justify-center`}>
                {userInfo && <UserPanel userInfo={userInfo} />}
                <div className={`w-[100%] h-[500px] ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                    <Tabs className={`w-full`} defaultValue={0} selectionFollowsFocus>
                        <TabsList className={`flex flex-row gap-1 justify-center`}>
                            <Tab value={0}>Images</Tab>
                            {userInfo?.role === 'Designer' && <Tab value={1}>Projects</Tab>}
                        </TabsList>
                        <TabPanel value={0}>
                            {userInfo && userInfo?.profileImages.length > 0 ?
                                <DisplayUserImages Images={userInfo?.profileImages} /> :
                                <Typography>No Images</Typography>
                            }
                        </TabPanel>
                        <TabPanel value={1}>Profile page</TabPanel>
                    </Tabs>
                </div>
            </div>
    );
}

export default UserProfile;