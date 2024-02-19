import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { styled, keyframes } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Skeleton,
  Drawer,
  Typography,
} from "@mui/material";
import { Sling as Hamburger } from "hamburger-react";

import SearchBar from "../../components/GlobalUI/SearchBar";
import SearchResultMenu from "../../components/GlobalUI/SearchResultMenu";
import ProfileMenu from "./ProfileMenu";
import UserDetails from "./UserDetails";
import ChatShoppingIcons from "./ChatShoppingIcons";
import LoginSignupButtons from "./LoginSignupButtons";
import NavBarButtons from "./NavBarButtons";
import LanguageMenu from "./LanguageMenu";
import { fetchUserInfo } from "../users/userNavBarSlice";
import { Chat } from "@mui/icons-material";

interface Data {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
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
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const userInfo = useSelector((state: any) => {
    return state.userNavBar.id ? state.userNavBar : null;
  });
  const snackbar = useSelector((state: any) => {
    return state.snackbar;
  });

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUserInfo() as any);
    if (snackbar.open) {
      enqueueSnackbar(snackbar.message, {
        variant: snackbar.variant,
        autoDuration: snackbar.duration,
      });
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, [dispatch, snackbar]);

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "transparent", height: "70px" }}
      className="justify-center z-50"
    >
      <Toolbar sx={{ color: "black", padding: "0 1rem" }}>
        <div className="flex flex-col sm:flex-row justify-between items-center  w-full">
          {isLoaded ? (
            userInfo ? (
              <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-1/4">
                <div className="flex-row items-center sm:flex hidden">
                  <ProfileMenu />
                  <UserDetails />
                </div>
                <div className="sm:block hidden">
                  <ChatShoppingIcons />
                </div>
              </div>
            ) : (
              <div className="sm:block hidden">
                <LoginSignupButtons />
              </div>
            )
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-1/4">
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                className="sm:block hidden"
              />
              <div className="flex-col sm:flex hidden">
                <Skeleton variant="text" width={180} />
                <Skeleton variant="text" width={120} />
              </div>
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                className="sm:block hidden"
              />
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                className="sm:block hidden"
              />
            </div>
          )}
          <div className="sm:block hidden">
            <NavBarButtons />
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-1/4">
            <div className="sm:block hidden">
              <LanguageMenu />
            </div>
            <div className="relative items-center w-5/6 ml-8 sm:block hidden">
              <SearchBar setSearchResult={setSearchResult} />
              {searchResult && (
                <div className="absolute w-full mt-1">
                  <SearchResultMenu searchResult={searchResult} />
                </div>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} />
            <Drawer anchor="top" open={isOpen} onClose={() => setOpen(false)}>
              <div
                className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-1/4"
                role="presentation"
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
              >
                <div className="flex flex-row sm:flex-row justify-between items-center w-full sm:w-1/4">
                  <Chat />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={}>
                    Chat
                  </Typography>
                </div>
                {/* className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" */}
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Option 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Option 3
                </a>
              </div>
            </Drawer>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
