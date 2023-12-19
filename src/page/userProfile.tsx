import React  from 'react';
import { useState,useEffect } from 'react';
import { useParams,Navigate, redirect } from 'react-router-dom';
import { getData } from "../service/api";
import { styled } from '@mui/material/styles';


import Avatar from '@mui/material/Avatar';

import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import { Tabs } from '@mui/base/Tabs';
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';


import DisplayUserImages from '../UserProfilePage/DisplayUserImages';
import UserPanel from '../UserProfilePage/UserPanel';


interface UserInfo {
    id:string,
    firstName: string,
    lastName: string,
    username:string,
    avatar: string,
    gender:string,
    profileImages:ProfileImage[],
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number
    
}
interface ProfileImage{
    
    url:string,
}
interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }

function UserProfile() {
  
    const [userInfo, setUserInfo] = useState<UserInfo|undefined>();
    const [visitorInfo,setVisitorInfo] = useState<UserInfo>();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isOwner,setIsOwner] = useState(false);
    const [pfpWidth,setPfpWidth] = useState(0);
    const { token } = useParams();

    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);
   
    useEffect(() => {
        const getUserInfo = async() => {
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

    const StyledTab = styled((props: StyledTabsProps) => (
        <Tab disableRipple {...props} />
      ))(({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-selected': {
          color: '#fff',
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
      }));
    
    
    
    
    return (

        
        <div className={`w-full min-h-screen	 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>

            <div className={` flex  flex-col gap-2 w-[60%] ml-[20%] justify-center`}>
               {userInfo&& <UserPanel userInfo={userInfo}/> }
                <div className={`w-[100%]  h-[500px]   ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}` }>
                                    
                
                {/*userInfo && userInfo?.profileImages.length>0  ? <DisplayUserImages Images={userInfo?.profileImages}/>:<Typography>Nqma</Typography>*/}

                <Tabs className={`w-full`} defaultValue={0} selectionFollowsFocus>
                    <TabsList
                    className={`flex flex-row gap-1  justify-center`}>
                        <Tab className={`justify-center`}value={0}>Images</Tab>
                        <Tab className={`justify-center`}value={0}>Images</Tab>
                        <Tab className={`justify-center`}value={0}>Images</Tab>
                        {userInfo?.role==='Designer'&&<Tab value={1}>Projects</Tab>}
                       
                    </TabsList>
                    <TabPanel value={0}>{userInfo && userInfo?.profileImages.length>0  ? <DisplayUserImages Images={userInfo?.profileImages}/>:<Typography>Nqma</Typography>}</TabPanel>
                    <TabPanel value={1}>Profile page</TabPanel>
                   
                </Tabs>
  
                
                                    
                </div>

            </div>
        </div>   
        
        
                                
    
    );
       
    
}

export default UserProfile;