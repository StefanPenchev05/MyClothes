import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import SearchBar from "../../components/GlobalUI/SearchBar";
import SearchResultMenu from "../../components/GlobalUI/SearchResultMenu";

const Navbar = () => {
  const [searchResult, setSearchResult] = useState<UserType[] | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const userInfo: UserType = useSelector((state: any) =>
   {
    console.log(state.userReducer)
    return  state.userReducer.id ? state.userReducer : null
   }
  );
  console.log(userInfo);

  return (
    <div className="bg-white dark:bg-black shadow p-4 flex justify-between items-center">
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
          className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white dark:hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium"
          >
          Explore
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white dark:hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium"
        >
          Stats
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white dark:hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium"
        >
          Drops
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white dark:hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium"
        >
          Activity
        </a>
        {userInfo && (
           <a
           href="#"
           className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white dark:hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium"
         >
           Chat
         </a>
        )}
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium">
          Create
        </button>
        {userInfo ? (
          <img
            src={(userInfo as UserType).avatar}
            className="w-10 h-10 rounded-full"
            onClick={() =>
              navigate(`user/profile/${userInfo.id}`, {
                state: { avatar: (userInfo as UserType).avatar },
              })
            }
          />
        ) : (
          <button
            className="p-2 rounded-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white dark:hover:text-opacity-80"
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