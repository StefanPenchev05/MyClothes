import { Avatar, Typography} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {Socket} from 'socket.io-client'

import { sendData } from '../../service/api';

interface Data {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface ChatList{
    chat_id: string,
    user: Data,
    lastMessage: string,
    timesnap: Date | null,
}

interface SearchResultType{
    searchResult: Data[] | undefined,
    setChatList : Dispatch<SetStateAction<ChatList[] | undefined>>,
    setSearchMenu : Dispatch<SetStateAction<boolean>>,
    socket: Socket
}

function SearchResultList({searchResult, setSearchMenu ,setChatList ,socket}:SearchResultType) {

    const [personNewChat, setPersonNewChat] = useState<Data | undefined>(undefined);


    socket.on('recieveNewChat', (data: ChatList) => {
        setChatList((chatList) => {
            if(chatList){
                return [...chatList, data];
            }else{
                return [data];
            }
        });
    });

    const handleNewChat = (data: ChatList | null) => {
        if(data){
            setChatList((chatList) => {
                if(chatList){
                    return [...chatList, data];
                }else{
                    return [data];
                }
            });
        }
        setSearchMenu(false);
        setPersonNewChat(undefined);
    }


    useEffect(() => {
       const createNewChat = async() => {
        const response = await sendData('/user/message/newChat', {personToChat: personNewChat?.id});

        if(response.status === 200){
            const data = response.data
            data.user = personNewChat
            handleNewChat(data);
        }
       }

       if(personNewChat){
        createNewChat();
       }
    }, [personNewChat])

  return (
    <div className='flex justify-start items-center w-full mt-4'>
        {Array.isArray(searchResult) ? (
            <div className='flex flex-col justify-start'>
                {searchResult.map((item, index) => (
                    <div 
                        className='flex flex-row items-center m-2 hover:bg-gray-200 rounded cursor-pointer' 
                        key={index}
                        onClick={() => {
                            setPersonNewChat(item);
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