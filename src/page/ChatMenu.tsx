import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { getData } from '../service/api'
import io from 'socket.io-client'

import SearchBar from "../components/GlobalUI/SearchBar"
import SearchResultList from "../features/Chat/SearchResultList"
import ChatHistoryList from '../features/Chat/ChatHistoryList'
import MessageMenu from '../features/Chat/MessageMenu'

//this is for the message window
const socket = io('http://localhost:5500/user/messages/:ID', {withCredentials: true});

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

function ChatMenu() {
    const [searchResult, setSearchResult] = useState<Data[] | undefined>(undefined);
    const [searchMenu,setSearchMenu] = useState<boolean>(false);
    const [chatList, setChatList] = useState<ChatList[] | undefined>(undefined);
    const [selectedChat, setSelectedChat] = useState<string | undefined>(undefined);
    const [currentUser, setCurrentUser] = useState<Data | undefined>(undefined);
    
    const handleOnSearchClick = () => {
        setSearchMenu(true);
    }    

    useEffect(() => {
        const fetchData = async() => {
            try {
                const chatList = await getData('/user/message/getChatList')
                setChatList(chatList || undefined);
            } catch (err) {
                console.error(err);
            }
        } 
        fetchData();
    }, [])


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
                            <SearchBar 
                                setSearchResult={setSearchResult} 
                                onClick={handleOnSearchClick}
                                autoFocus={true}
                            />
                        </div>
                        <SearchResultList 
                            searchResult={searchResult}
                            setSearchMenu={setSearchMenu}
                            setChatList={setChatList}
                            socket={socket}
                        />
                    </div>
                ) : (
                    <ChatHistoryList
                        chatList={chatList}
                        setChatList={setChatList}
                        setSelectedChat={setSelectedChat}
                        setSearchResult={setSearchResult}
                        onClick={handleOnSearchClick}
                    />
                )}
            </div>
        </div>
        <div className='flex flex-grow justify-center items-center w-3/4 bg-white border-2 border-gray-200 rounded-lg p-6 ml-4 shadow-lg'>
            <MessageMenu
                selectedChat={selectedChat}
            />
        </div>
    </div>
  )
}

export default ChatMenu