import { Avatar, Typography} from '@mui/material'
import { Dispatch, SetStateAction } from 'react';
import {Socket} from 'socket.io-client'

interface Data {
    message? : string,
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface SearchResultType{
    searchResult: Data[] | undefined,
    setSearchMenu : Dispatch<SetStateAction<boolean>>,
    setSelectedUser: Dispatch<SetStateAction<Data | undefined>>
    updateMessageMenuAndChatHistory: (conversationID: string) => void,
    socket: Socket
}

function SearchResultList({searchResult, updateMessageMenuAndChatHistory, setSelectedUser, setSearchMenu, socket}:SearchResultType) {

    const handleNewChat = (idOfSelectedUser: string) => {
        setSearchMenu(false);
        socket.emit('newChat',idOfSelectedUser, updateMessageMenuAndChatHistory);
    }

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
                            handleNewChat(item.id)
                        }}
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
            null
        )}
    </div>
  )
}

export default SearchResultList