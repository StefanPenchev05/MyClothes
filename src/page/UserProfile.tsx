import React ,{lazy} from 'react'
import { useSnackbar } from "notistack";
import { useDispatch,useSelector } from 'react-redux';
import { fetchProfileInfo } from '../features/userProfile/userProfileSlice';
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
import InfoIcon from '@mui/icons-material/Info';
import DisplayUserImages from '../UserProfilePage/DysplayUserImages';
import Divider from '@mui/material/Divider';


import UserPanel from '../UserProfilePage/UserPanel';
import InfoTab from '../UserProfilePage/DesignerInfoTab';
import { Session } from 'inspector';
import { fetchUserInfo } from '../features/users/userNavBarSlice';
function ProfilePage() {
  
    
    
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isOwner,setIsOwner] = useState(false);
    
    const { token } = useParams();
    const dispatch=useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const snackbar = useSelector((state: any) => {
        return state.snackbar
    });
    useEffect(() => {
        
        dispatch(fetchProfileInfo(token));
        dispatch(fetchUserInfo())
        if(snackbar.open) {
            enqueueSnackbar(snackbar.message, {variant: snackbar.variant, autoDuration:snackbar.duration});
        }
        
    }, [dispatch, snackbar]);
    const visitor = useSelector((state:any)=>{
        return state.userNavBar? state.userNavBar :null;
    })
    
    const userInfo =  useSelector((state: any) => {
        
        return state.userProfile ? state.userProfile : null;
    });
    
    useEffect(() => {
        const currentHour = new Date().getHours();
        setDarkMode(currentHour < 6 || currentHour >= 20);
    }, []);
    console.log(userInfo.username===visitor.username)
    console.log(userInfo)
    console.log(visitor)
    return (
            <div className={`w-full min-h-screen	font-semibold  ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
    
                <div className={` flex  flex-col gap-2 w-[1068px] mx-auto justify-center`}>
                   {userInfo&& <UserPanel userInfo={userInfo}/> }
                    <div className={`w-[100%]  h-auto   ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg` }>
                                        
                    
                    
                    <Tabs  className={`w-full mt-1 pb-[2rem]`}    defaultValue={0} selectionFollowsFocus  >
                        <TabsList 
                        className={`flex flex-row space-x-6  justify-center`}>
                            <Tab  className={`transform p-2  rounded-lg transition text-center bg-transparent uppercase focus:underline active:bg-gray-200 hover:scale-[1.1] hover:bg-gray-300 flex items-center`} value={0}  ><SvgIcon component={ImageIcon} inheritViewBox/>Images</Tab>
                            {userInfo?.role==='designer'&&<Tab className={`transform p-2  rounded-lg transition uppercase text-center bg-transparent active:bg-gray-300 focus:underline hover:scale-[1.1] hover:bg-gray-300   justify-center flex items-center `} value={1}><SvgIcon className='scale-[1.1] pb-[2px]' component={BusinessCenterRoundedIcon} inheritViewBox/>Projects</Tab>}
                            {userInfo?.role==='designer' && <Tab className={`transform p-2  rounded-lg transition uppercase text-center bg-transparent active:bg-gray-300 focus:underline hover:scale-[1.1] hover:bg-gray-300 justify-center flex items-center `} value={2}><SvgIcon component={InfoIcon} inheritViewBox/>About</Tab> }
                        </TabsList>
                        <Divider className='mb-8 h-4'/>
                        <TabPanel value={0}>
                            { userInfo?.profileImages ? 
                                <DisplayUserImages Images={userInfo.profileImages}/> :<Typography>Nqma</Typography>
                            }
                        </TabPanel>
                        <TabPanel value={1}>Profile page</TabPanel>
                        <TabPanel value={2}><InfoTab userInfo={userInfo}/></TabPanel>
                       
                    </Tabs>                       
                    </div>
    
                </div>
            </div>   

    )
}

export default ProfilePage;