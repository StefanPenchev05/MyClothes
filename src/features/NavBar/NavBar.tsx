import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../users/userNavBarSlice";
import SearchBar from "../../components/GlobalUI/SearchBar";
import SearchResultMenu from "../../components/GlobalUI/SearchResultMenu";

interface Avatar {
  _id: string;
  avatar: string;
  fileName: string;
}

interface Data {
  id: string;
  firstName: string;
  lastName: string;
  avatar: Avatar;
}

const Navbar = () => {
  const [searchResult, setSearchResult] = useState<UserType[] | undefined>(
    undefined
  );

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const userInfo: Data = useSelector((state: any) =>
    state.userNavBar.id ? state.userNavBar : null
  );
  const snackbar = useSelector((state: any) => state.snackbar);

  useEffect(() => {
    dispatch(fetchUserInfo());
    if (snackbar.open) {
      enqueueSnackbar(snackbar.message, {
        variant: snackbar.variant,
        autoDuration: snackbar.duration,
      });
    }
  }, [dispatch, snackbar]);

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <div className="relative flex-grow">
        <SearchBar setSearchResult={setSearchResult} />
        {searchResult && (
          <div className="absolute w-full mt-1 z-10">
            <SearchResultMenu searchResult={searchResult} />
          </div>
        )}
      </div>
      <div className="hidden sm:flex space-x-4 items-center">
        <a
          href="#"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Explore
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Stats
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Drops
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Activity
        </a>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium">
          Create
        </button>
        {userInfo ? (
          <img
            src={userInfo.avatar.avatar}
            className="w-10 h-10 rounded-full"
            onClick={() =>
              navigate(`user/profile/${userInfo.id}`, {
                state: { avatar: userInfo.avatar.avatar },
              })
            }
          />
        ) : (
          <button
            className="p-2 rounded-full text-gray-700 hover:text-gray-900"
            onClick={() => navigate("/user/login")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className="w-6 h-6"
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex sm:hidden">
        <button className="p-2 rounded-full text-gray-700 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              className="w-6 h-6"
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

// const slideDown = keyframes`
// 0% {
//     transform: translateY(-100%);
// }
// 100% {
//     transform: translateY(0);
// }
// `;

// const AppBar = styled(MuiAppBar)({
//   animation: `${slideDown} 0.5s ease-in-out`,
// });

// function NavBar() {
//   const [searchResult, setSearchResult] = useState<Data[]>();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isOpen, setOpen] = useState(false);

//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();

//   const userInfo = useSelector((state: any) =>
//     state.userNavBar.id ? state.userNavBar : null
//   );
//   const snackbar = useSelector((state: any) => state.snackbar);

//   useEffect(() => {
//     //@ts-ignore
//     dispatch(fetchUserInfo() as any);
//     if (snackbar.open) {
//       enqueueSnackbar(snackbar.message, {
//         variant: snackbar.variant,
//         autoDuration: snackbar.duration,
//       });
//     }
//     setTimeout(() => {
//       setIsLoaded(true);
//     }, 1000);
//   }, [dispatch, snackbar]);

//   return (
//     <AppBar
//       position="fixed"
//       sx={{ backgroundColor: "white", height: "70px" }}
//       className="justify-center z-50"
//     >
//       <Toolbar sx={{ color: "black", padding: "0 2rem" }}>
//         <div className="flex flex-col sm:flex-row justify-between items-center w-full max-lg:hidden">
//           {isLoaded ? (
//             userInfo ? (
//               <div className="flex flex-col sm:flex-row items-center w-1/4">
//                 <div className="flex-row items-center sm:flex hidden">
//                   <ProfileMenu />
//                   <UserDetails />
//                 </div>
//                 <div className="sm:block hidden ml-9 space-x-8">
//                   <ChatShoppingIcons />
//                 </div>
//               </div>
//             ) : (
//               <div className="sm:flex hidden w-1/3">
//                 <div className="flex flex-row w-2/3 space-x-8">
//                   <LoginSignupButtons />
//                 </div>
//               </div>
//             )
//           ) : (
//             <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-1/4">
//               <Skeleton
//                 variant="circular"
//                 width={56}
//                 height={56}
//                 className="sm:block hidden"
//               />
//               <div className="flex-col sm:flex hidden">
//                 <Skeleton variant="text" width={180} />
//                 <Skeleton variant="text" width={120} />
//               </div>
//               <Skeleton
//                 variant="circular"
//                 width={56}
//                 height={56}
//                 className="sm:block hidden"
//               />
//               <Skeleton
//                 variant="circular"
//                 width={56}
//                 height={56}
//                 className="sm:block hidden"
//               />
//             </div>
//           )}
//           <div className="sm:flex hidden space-x-8 w-1/3 justify-center">
//             <NavBarButtons />
//           </div>
//           <div className="flex flex-col sm:flex-row items-center w-full sm:w-1/3">
//             <div className="sm:block hidden">
//               <LanguageMenu />
//             </div>
//             <div className="relative items-center w-5/6 ml-8 sm:block hidden">
//               <SearchBar setSearchResult={setSearchResult} />
//               {searchResult && (
//                 <div className="absolute w-full mt-1">
//                   <SearchResultMenu searchResult={searchResult} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="lg:hidden flex flex-row justify-between w-full">
//           {userInfo ? (
//             <div className="flex flex-row justify-between items-center w-fit">
//               <div className="flex flex-row items-center">
//                 <ProfileMenu />
//                 <UserDetails />
//               </div>
//               <div className="ml-9 space-x-8">
//                 <ChatShoppingIcons />
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-row space-x-4 w-3/5 items-center">
//               <LoginSignupButtons />
//             </div>
//           )}
//           <Hamburger toggled={isOpen} toggle={setOpen} />
//           <Drawer anchor="top" open={isOpen} onClose={() => setOpen(false)}>
//             <div
//               className="flex flex-row flex-wrap justify-between items-center w-full h-fit"
//               role="presentation"
//               onClick={(e) => e.stopPropagation()}
//               onKeyDown={(e) => e.stopPropagation()}
//             >
//               <NavBarButtons />
//               <LanguageMenu />
//               <div className="relative items-center w-full ml-8 mb-4 justify-center pr-8">
//                 <SearchBar setSearchResult={setSearchResult} />
//                 {searchResult && (
//                   <div className="absolute w-full mt-1">
//                     <SearchResultMenu searchResult={searchResult} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Drawer>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default NavBar;
