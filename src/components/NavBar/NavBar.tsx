import { useEffect, useState } from "react";
import { AppBar as MuiAppBar, Toolbar, Skeleton } from "@mui/material";
import { styled, keyframes } from '@mui/system';

import SearchBar from "../GlobalUI/SearchBar";
import SearchResultMenu from "../GlobalUI/SearchResultMenu";
import { getData } from "../../service/api";
import ProfileMenu from "./UI/ProfileMenu";
import UserDetails from "./UI/UserDetails";
import ChatShoppingIcons from "./UI/ChatShoppingIcons";
import LoginSignupButtons from "./UI/LoginSignupButtons";
import NavBarButtons from "./UI/NavBarButtons";
import LanguageMenu from "./UI/LanguageMenu";

interface Data {
    message? : string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface UserInfo {
    firstName: string,
    lastName: string,
    avatar: string,
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number

}
const slideDown = keyframes`
0% {
    transform: translateY(-100%);
}
100% {
    transform: translateY(0);
}
`;

const AppBar = styled(MuiAppBar)({
    animation: `${slideDown} 0.5s ease-in-out`,
});

function NavBar() {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [searchResult, setSearchResult] = useState<Data[]>();
    const [isLoaded, setIsLoaded] = useState(false);

  
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const data = await getData('/navBar/userInfo');
                if(!data.message){
                    setUserInfo(data);
                }else{
                    setUserInfo(undefined);
                }
                setIsLoaded(true);
            }catch(err){
                console.log(err);
            }
        }
        getUserInfo();
    }, []);
  return (
    <AppBar position="static" sx={{backgroundColor: '#f8f9fa', height:'70px'}} className="justify-center">
        <Toolbar sx={{color: 'black', padding: '0 1rem'}}>
            <div className="flex flex-row justify-between items-center  w-full">
               {isLoaded ? (
                 userInfo ? (
                    <div className="flex flex-row justify-between items-center w-1/4">
                        <div className="flex flex-row items-center">
                            <ProfileMenu userInfo={userInfo}/>
                            <UserDetails userInfo={userInfo}/>
                        </div>
                        <ChatShoppingIcons />
                    </div>
                    ) : (
                        <LoginSignupButtons/>
                    )
               ): (
                <div className="flex flex-row justify-between items-center w-1/4">
                    <Skeleton variant="circular" width={56} height={56} />
                    <div className="flex flex-col">
                        <Skeleton variant="text" width={180} />
                        <Skeleton variant="text" width={120} />
                    </div>
                    <Skeleton variant="circular" width={56} height={56} />
                    <Skeleton variant="circular" width={56} height={56} />
                </div>
               )}
                <NavBarButtons/>
                <div className="flex flex-row items-center w-1/4">
                    <LanguageMenu/>
                    <div className="relative items-center w-5/6 ml-8">
                        <SearchBar setSearchResult= {setSearchResult}/>
                        {searchResult && (
                            <div className="absolute w-full mt-1">
                                <SearchResultMenu searchResult = {searchResult}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar