import { Avatar, Typography} from '@mui/material'
import { Dispatch, SetStateAction } from 'react';
import {Socket} from 'socket.io-client'

interface Data {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface Message extends Data {
    message: string[],
    lastMessage: string,
    timesnap: Date
}

interface SearchResultType{
    searchResult: Data[] | undefined,
    setSearchMenu : Dispatch<SetStateAction<boolean>>,
    setSelectedUser: Dispatch<SetStateAction<Data | undefined>>,
    socket: Socket
}

function SearchResultList({searchResult, setSelectedUser}:SearchResultType) {

  return (
    <div className='flex justify-start items-center w-full mt-4'>
        {Array.isArray(searchResult) ? (
            <div className='flex flex-col justify-start'>
                {searchResult.map((item, index) => (
                    <div 
                        className='flex flex-row items-center m-2 hover:bg-gray-200 rounded cursor-pointer' 
                        key={index}
                        onClick={() => {
                            setSelectedUser(item);
                        }}
                    >
                        <Avatar 
                            src={item.avatar} 
                            alt={`Avatar of ${item.firstName} ${item.lastName}`} 
                            className="mr-2 w-16 h-16" 
                        />
                        <Typography variant="body1" className='text-lg font-semibold'>
                            {item.firstName} {item.lastName}
                        </Typography>
                    </div>
                ))}
            </div>
        ) : (
            null
        )}
    </div>
  )
}

export default SearchResultList