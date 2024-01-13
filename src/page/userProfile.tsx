import React ,{lazy} from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from "../service/api"
import { Box, Icon, SvgIcon, Typography } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import ImageIcon from '@mui/icons-material/Image';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import DisplayUserImages from '../UserProfilePage/DisplayUserImages';
import UnstyledTabsCustomized from '../UserProfilePage/tabs';
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
function ProfilePage() {
  
    const [userInfo, setUserInfo] = useState<UserInfo>();
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
                }else{
                    setUserInfo(undefined);
                }
            } catch (error) {
                console.error('Error getting user info: ', error);
            }
            
        }
        
        getUserInfo();
    }, []);
    const [activeTab,setActiveTab]= useState<number>(0);
    useEffect(() => {
        console.log('activeTab:', activeTab);
    }, [activeTab]);
    const handleTabChange = (tabIndex:number) => {
        setActiveTab(tabIndex);
    }
    
    
    
    return (
        
            

       

        
            <div className={`w-full min-h-screen	 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
    
                <div className={` flex  flex-col gap-2 w-[60%] ml-[20%] justify-center`}>
                   {userInfo&& <UserPanel userInfo={userInfo}/> }
                    <div className={`w-[100%]  h-[400px]   ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg` }>
                                        
                    
                    
                    <Tabs  className={`w-full mt-1`}    defaultValue={0} selectionFollowsFocus  >
                        <TabsList 
                        className={`flex flex-row space-x-4  justify-center`}>
                            <Tab  className={`transform p-2  rounded-lg transition text-center bg-transparent uppercase focus:underline active:bg-gray-200 hover:scale-[1.1] hover:bg-gray-300 `} value={0}  ><SvgIcon component={ImageIcon} inheritViewBox/>Images</Tab>
                            
                            

                            {userInfo?.role==='designer'&&<Tab className={`transform p-2  rounded-lg transition uppercase text-center bg-transparent active:bg-gray-300 focus:underline hover:scale-[1.1] hover:bg-gray-300  `} value={1}><SvgIcon component={BusinessCenterRoundedIcon} inheritViewBox/>Projects</Tab>}
                           
                        </TabsList>
                        <TabPanel value={0}>{userInfo && userInfo?.profileImages.length>0  ? <DisplayUserImages Images={userInfo?.profileImages}/>:<Typography>Nqma</Typography>}</TabPanel>
                        <TabPanel value={1}>Profile page</TabPanel>
                       
                    </Tabs>
      
                    
                                        
                    </div>
    
                </div>
            </div>   
            
            
                                    
        
       
           
        
    
        
                                
    
    
    )
}

export default ProfilePage;