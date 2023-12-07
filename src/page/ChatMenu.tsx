import { useState } from 'react'
import {IconButton, Avatar, Typography} from '@mui/material'
import {ArrowBack, Person2, Chat} from '@mui/icons-material'

import SearchBar from "../components/GlobalUI/SearchBar"

interface Data {
    message? : string,
    firstName: string,
    lastName: string,
    avatar: string,
}

function ChatMenu() {
    const [searchResult, setSearchResult] = useState<Data[]>();
    const [searchMenu,setSearchMenu] = useState<boolean>(false);
    const [messageHistory, setMessageHistory] = useState<Data[] | undefined>(undefined);

    const handleOnSearchClick = () => {
        setSearchMenu(true);
    }

  return (
    <div className="w-full flex flex-row p-4" style={{height: 'calc(100vh - 60px)'}}>
        <div className='flex justify-center w-1/4 bg-gray-200 rounded-lg p-4'>
            <div className='relative w-full'>
                {searchMenu ? (
                    <div className='top-14 w-full'>
                        <div className='flex flex-row mb-4'>
                            <IconButton onClick={() => setSearchMenu(false)} className='mr-4'>
                                <ArrowBack/>
                            </IconButton>
                            <SearchBar setSearchResult={setSearchResult} onClick={handleOnSearchClick}/>
                        </div>
                        <div className='flex justify-start items-center w-full mt-4'>
                            {Array.isArray(searchResult) ? (
                                <div className='flex flex-col justify-start'>
                                    {searchResult.map((item, index) => (
                                        <div 
                                            className='flex flex-row items-center m-2 hover:bg-gray-200 rounded cursor-pointer' 
                                            key={index}
                                        >
                                            <Avatar 
                                                src={item.avatar} 
                                                alt={`Avatar of ${item.firstName} ${item.lastName}`} 
                                                className="mr-2 w-16 h-16" 
                                            />
                                            <Typography variant="body1" className='text-lg font-semibold'>{item.firstName} {item.lastName}</Typography>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col space-y-4'>
                        <SearchBar setSearchResult={setSearchResult} onClick={handleOnSearchClick}/>
                        <div className='flex flex-row items-center space-x-4'>
                            <div className='flex flex-row'>
                                <Avatar className='w-16 h-16'>
                                    <Person2/>
                                </Avatar>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <Typography variant="body1" className='text-lg font-semibold'>Name</Typography>
                                    <div className='flex flex-row'>
                                        <Typography variant="body2" className='text-md font-semibold mr-2'>Message</Typography>
                                        <Typography variant="body2" className='text-md font-semibold'>Time</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className='flex flex-grow justify-center items-center w-3/4 bg-white border-2 border-gray-200 rounded-lg p-6 ml-4 shadow-lg'>
            {messageHistory ? (
                <div></div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <Chat className='w-28 h-28'/>
                    <Typography variant="body1" className='text-lg font-semibold'>Please select a chat</Typography>
                </div>
            )}
        </div>
    </div>
  )
}

export default ChatMenu