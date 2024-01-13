import { Avatar, Typography, Menu, MenuItem, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchBar from "../../components/GlobalUI/SearchBar"
import dayjs from 'dayjs';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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


interface ChatHistoryType{
    chatList: ChatList[] | undefined,
    setSearchResult : React.Dispatch<React.SetStateAction<Data[] | undefined>>,
    setChatList: React.Dispatch<React.SetStateAction<ChatList[] | undefined>>,
    setSelectedChat: React.Dispatch<React.SetStateAction<string | undefined>>,
    onClick: () => void,
}

function ChatHistoryList({chatList, setChatList, setSelectedChat, setSearchResult, onClick: handleOnSearchClick}:ChatHistoryType) {

    const [hoveredUser, setHoveredUser] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteChat = async(item: ChatList) => {
        try{
            const chat_id = item.chat_id
            const response = await fetch(`http://localhost:5500/user/message/delete/${chat_id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if(response.ok){
                setChatList(prevChatList => prevChatList?.filter(list => list.chat_id !== chat_id));
            }
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div className='flex flex-col space-y-4'>
        {/* <SearchBar setSearchResult={setSearchResult} onClick={handleOnSearchClick}/>
        {chatList?.length ? (
           chatList.map((item) => (
                <div className='flex flex-row items-center justify-between hover:cursor-pointer'
                
                    onMouseEnter={() => setHoveredUser(item.chat_id)}
                    onMouseLeave={() => setHoveredUser(null)}
                    onClick={() => {setSelectedChat(item.chat_id)}}
                >
                    <div className='flex flex-row items-center space-x-4' key={item.chat_id} onClick={() => {}}>
                        <div className='flex flex-row'>
                            <Avatar
                                src={item.user.avatar}
                                alt={`Avatar of ${item.user.firstName} ${item.user.lastName}`}
                                className="mr-2 w-16 h-16"
                            />
                        </div>
                        <div className='flex flex-row'>
                            <div>
                                <Typography variant="body1" className='text-lg font-semibold'>{item.user.firstName} {item.user.lastName}</Typography>
                                <div className='flex flex-row'>
                                    <Typography variant="body2" className='text-md font-semibold mr-2'> {item.lastMessage} </Typography>
                                    <Typography variant="body2" className='text-md font-semibold'> { dayjs(item.timesnap).isSame(dayjs(), 'day')?  dayjs(item.timesnap).format('HH:mm') : dayjs().diff(dayjs(item.timesnap), 'day') + ' day ago' } </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    {hoveredUser === item.chat_id && (
                        <div>
                            <div>
                                <IconButton onClick={handleClick}>
                                    <MoreHorizIcon fontSize='large'></MoreHorizIcon>
                                </IconButton>
                            </div>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                <MenuItem onClick={() => {handleClose(); navigate(`/user/message/settings/${item.chat_id}`)}}>Settings</MenuItem>
                                <MenuItem onClick={() => {handleClose(); handleDeleteChat(item)}}>Delete Chat</MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
            ))
        ) : (
            <div className='flex justify-center'>
                <Typography variant="body1" className='text-lg font-semibold'>No messages</Typography>
            </div>
        )} */}
    </div>
  )
}

export default ChatHistoryList