import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Typography, Menu, MenuItem, IconButton } from '@mui/material'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { deleteChat } from './chatListSlice'; 

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

interface ChatListListType{
    selectedChat: React.MutableRefObject<string | undefined>
}

function ChatHistoryList({selectedChat}:ChatListListType) {
    const [hoveredUser, setHoveredUser] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const list:ChatList[] = useSelector((state:any) => state.chatList);

    const snackbar = useSelector((state:any) => {
        return state.snackbar;
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteChat = async(chat_id: string) => {
        dispatch(deleteChat(chat_id) as any);
        handleClose();
    }

    useEffect(() => {
        if(snackbar.message){
            enqueueSnackbar(snackbar.message, {variant: snackbar.variant, autoDuration:snackbar.duration});
        }
    }, [])

  return (
    <div className='flex flex-col space-y-4'>
        {list?.length ? (
           list.map((item,index) => (
                <div className='flex flex-row items-center justify-between hover:cursor-pointer'
                    onMouseEnter={() => setHoveredUser(item.chat_id)}
                    onMouseLeave={() => setHoveredUser(null)}
                    key={index}
                >
                    <div className='flex flex-row items-center space-x-4' 
                            key={item.chat_id} 
                            onClick={() => {
                                //selectedChat.current = item.chat_id;
                            }}
                        >
                        <div className='flex flex-row'>
                            <Avatar
                                src={item.user.avatar ? item.user.avatar : '/broken-image.jpg'}
                                alt={`Avatar of ${item.user.firstName} ${item.user.lastName}`}
                                className="mr-2 w-16 h-16"
                            />
                        </div>
                        <div>
                            <Typography variant="body1" className='text-lg font-semibold'>{item.user.firstName} {item.user.lastName}</Typography>
                            <div className='flex flex-row'>
                            <Typography variant="body2" className='text-md font-semibold mr-2 overflow-hidden overflow-ellipsis whitespace-nowrap w-1/3'> 
                                {item.lastMessage.substring(0, 20)}
                            </Typography>                                    
                            <Typography variant="body2" className='text-md font-semibold w-full'> 
                                    { item.timesnap ? item.timesnap.toString() : null }
                                </Typography>
                            </div>
                        </div>
                    </div>
                    {hoveredUser === item.chat_id && (
                        <div>
                            <div>
                                <IconButton onClick={handleClick}>
                                    <MoreHorizIcon fontSize='medium'></MoreHorizIcon>
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
                                <MenuItem onClick={() => {handleClose(); handleDeleteChat(item.chat_id)}}>Delete Chat</MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
            ))
        ) : (
            <div className='flex justify-center'>
                <Typography variant="body1" className='text-lg font-semibold'>No messages</Typography>
            </div>
        )}
    </div>
  )
}

export default ChatHistoryList