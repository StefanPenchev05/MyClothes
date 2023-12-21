import { useEffect, useRef, useState } from 'react'
import {IconButton } from '@mui/material'
import {ArrowBack } from '@mui/icons-material'
import io from 'socket.io-client'

import SearchBar from "../components/GlobalUI/SearchBar"
import SearchResultList from "../components/ChatMenu/SearchResultList"
import ChatHistoryList from '../components/ChatMenu/ChatHistoryList'
import MessageMenu from '../components/ChatMenu/MessageMenu'

const socket = io('http://localhost:5500/user/messages', {withCredentials: true});

interface Data {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface Message extends Data {
    lastMessage: string,
    timesnap: Date | null
}

function ChatMenu() {
    const [searchResult, setSearchResult] = useState<Data[] | undefined>(undefined);
    const [searchMenu,setSearchMenu] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<Data | undefined>(undefined);
    const [messageHistory, setMessageHistory] = useState<Data[] | undefined>(undefined);
    const [chatList, setChatList] = useState<Message[] | undefined>(undefined);
    const searchRef = useRef<HTMLInputElement>(null);

    
    const handleOnSearchClick = () => {
        setSearchMenu(true);

    }
    
    const updateMessageMenuAndChatHistory = () => {
        if (selectedUser) {
           const addUser : Message = {
                id: selectedUser.id,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                avatar: selectedUser.avatar,
                lastMessage: "",
                timesnap: null, 
            };
            if(chatList){
                setChatList([addUser, ...chatList]);
            } else {
                setChatList([addUser]);
           }
        }
    }
    
    const handleNewChat = (idOfSelectedUser: string) => {
        setSearchMenu(false);
        socket.emit('newChat',idOfSelectedUser, updateMessageMenuAndChatHistory);
    }
    
    useEffect(() => {
        const handleGetChatList = (chatList: any) => {
            setChatList(chatList);
        };

        socket.emit('getChatList', handleGetChatList);

        return () => {
            socket.off('getChatList', handleGetChatList);
        };
    }, []);

    useEffect(() => {
        if(selectedUser){
            handleNewChat(selectedUser.id);
        }
    }, [selectedUser])

  return (
    <div className="w-full flex flex-row p-4" style={{height: 'calc(100vh - 70px)'}}>
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
                        <SearchResultList 
                            searchResult={searchResult}
                            setSearchMenu={setSearchMenu}
                            setSelectedUser={setSelectedUser}
                            socket={socket}
                        />
                    </div>
                ) : (
                    <ChatHistoryList
                        chatList={chatList}
                        setSearchResult={setSearchResult}
                        setMessageHistory={setMessageHistory}
                        socket={socket}
                        onClick={handleOnSearchClick}
                    />
                )}
            </div>
        </div>
        <div className='flex flex-grow justify-center items-center w-3/4 bg-white border-2 border-gray-200 rounded-lg p-6 ml-4 shadow-lg'>
            <MessageMenu messageHistory={messageHistory} socket={socket}/>
        </div>
    </div>
  )
}

export default ChatMenu