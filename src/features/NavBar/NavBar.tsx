import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { styled, keyframes } from '@mui/system';
import { useDispatch, useSelector } from "react-redux";
import { AppBar as MuiAppBar, Toolbar, Skeleton } from "@mui/material";

import SearchBar from "../../components/GlobalUI/SearchBar";
import SearchResultMenu from "../../components/GlobalUI/SearchResultMenu";
import ProfileMenu from "./ProfileMenu";
import UserDetails from "./UserDetails";
import ChatShoppingIcons from "./ChatShoppingIcons";
import LoginSignupButtons from "./LoginSignupButtons";
import NavBarButtons from "./NavBarButtons";
import LanguageMenu from "./LanguageMenu";
import { fetchUserInfo } from "../users/userNavBarSlice";

interface Data {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
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
    
    const [searchResult, setSearchResult] = useState<Data[]>();
    const [isLoaded, setIsLoaded] = useState(false);
    
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const userInfo = useSelector((state: any) => {
        return state.userNavBar.id ? state.userNavBar : null;
    });
    const snackbar = useSelector((state: any) => {
        return state.snackbar
    });

  
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchUserInfo());
        if(snackbar.open) {
            enqueueSnackbar(snackbar.message, {variant: snackbar.variant, autoDuration:snackbar.duration});
        }
        setTimeout(() => {
            setIsLoaded(true);
        }
        , 1000);
    }, [dispatch, snackbar]);

  return (
    <AppBar position="static" sx={{backgroundColor: '#f8f9fa', height:'70px'}} className="justify-center">
        <Toolbar sx={{color: 'black', padding: '0 1rem'}}>
            <div className="flex flex-row justify-between items-center  w-full">
               {isLoaded ? (
                 userInfo ? (
                    <div className="flex flex-row justify-between items-center w-1/4">
                        <div className="flex flex-row items-center">
                            <ProfileMenu />
                            <UserDetails />
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