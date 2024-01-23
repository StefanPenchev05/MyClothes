import { addUser } from './otherUser';
import { Socket } from 'socket.io-client';
import { Chat } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, clearChat, addMessage } from './messageSlice';
import { Typography, Avatar, Divider, CircularProgress } from '@mui/material'

import { updateLastMessage } from './chatListSlice'

import SocketManager from '../Sockets/socketActions';



interface User {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
    socket_id: string | null,
}

interface Message{
    conversation_id?: string,
    message_id: string,
    sender: string,
    message: string,
    timestamp: string,
    reacted: string | null,
    seen: boolean,
}

interface ConversationType{
    conversation_id: string,
    user: User,
    messages: Message[],
}

interface MessageMenuType{
    selectedChat: string | undefined,
    socketManager: SocketManager,
}

function MessageMenu({selectedChat, socketManager}:MessageMenuType) {
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useDispatch();
    const socket = socketManager.getSocket as Socket;

    const messageList:Message[] = useSelector((state: any) => {
        return state.message;
    });

    const otherUser:User = useSelector((state: any) => {
        return state.otherUsers;
    });

    const user:User = useSelector((state: any) => {
        return state.userNavBar;
    });

    useEffect(() => {
        if(selectedChat){
            setIsLoading(true);
            dispatch(clearChat());

            socket.emit('joinRoom', selectedChat);

            socketManager.getConversation()
            .then((conversation: ConversationType | false) => {
                if(conversation){
                    dispatch(addUser(conversation.user));
                    dispatch(addChat(conversation.messages));
                    setIsLoading(false);
                }else{
                    console.log('Unable to fetch conversation');
                }
            });
    
            return () => {
                socket.emit('leaveRoom', selectedChat);
                socket.off('message');
            }
        }
    }, [selectedChat]);

    useEffect(() => {
        if(socket){
            socket.on('receive_message', (message: Message) => {
                dispatch(addMessage(message));
                dispatch(updateLastMessage({chat_id: message.conversation_id, message: message.message, timestamp: message.timestamp}));
            });
            socket.on('sended_message', (message: Message) => {
                dispatch(addMessage(message));
                dispatch(updateLastMessage({chat_id: message.conversation_id, message: message.message, timestamp: message.timestamp}));
            });
        }
    
        return () => {
            socket?.off('receive_message');
            socket?.off('sended_message');
        }
    }, [socket]);

    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if(socket && message){
            socketManager.sendMessage(message, otherUser.id);
            setMessage(null);
        }
    }
  return (
    <>
        {selectedChat ? (
             isLoading ? (
                <div className='flex flex-col justify-center items-center'>
                    <Chat className='w-28 h-28'/>
                    <CircularProgress/>
                </div>
             ) : (
                <div className='flex flex-col h-full w-full justify-between'>
                    <div className='flex flex-row items-center p-4'>
                        <Avatar className='w-30 h-30' src={otherUser.avatar}/>
                        <Typography variant="body1" className='text-lg font-semibold ml-4'>{otherUser.firstName} {otherUser.lastName}</Typography>
                    </div>
                    <Divider orientation='horizontal'/>
                    <div className='flex-grow overflow-auto p-4'>
                        {messageList.map((msg, index) => (
                            console.log(msg),
                            msg.sender === otherUser.id ? (
                                <div key={index} className='flex flex-row items-center justify-start mb-4 space-x-4'>
                                    <Avatar className='w-30 h-30' src={otherUser.avatar}/>
                                    <Typography variant="body1" className='text-start text-wrap text-base font-normal text-white border-2 border-blue-500 rounded-lg bg-blue-500 p-2 ml-4 overflow-wrap break-words max-w-[190px]'>
                                        {msg.message}
                                    </Typography>                                
                                </div>
                            ) : (
                                <div key={index} className='flex flex-row items-center justify-end mb-4 space-x-4'>
                                   <Typography variant="body1" className='text-start text-wrap text-base font-normal text-white border-2 border-blue-500 rounded-lg bg-blue-500 p-2 ml-4 overflow-wrap break-words max-w-[190px]'>
                                        {msg.message}
                                    </Typography>
                                    {messageList.length - 1 === index && msg.seen === true && (
                                        <Typography>seen</Typography>
                                    )}
                                    <Avatar className='w-30 h-30' src={user.avatar}/>
                                </div>
                            )
                        ))}
                    </div>
                    <div className='flex flex-row items-center p-4'>
                    <form 
                        className='flex-grow flex flex-row items-center'
                        onSubmit={handleSendMessage}
                    >
                        <input 
                            type="text" 
                            className='flex-grow mr-4 border-2 border-gray-300 rounded-2xl p-2' 
                            placeholder="Type a message" 
                            value={message ? message : ''} 
                            onChange={(e) => setMessage(e.target.value)} 
                        />
                        <button 
                            type="submit"
                            className='px-4 py-2 bg-blue-500 text-white rounded'
                        >
                            Send
                        </button>
                    </form>
                    </div>
                </div>
             )
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <Chat className='w-28 h-28'/>
                    <Typography variant="body1" className='text-lg font-semibold'>Please select a chat</Typography>
                </div>
        )}
    </>
  )
}

export default MessageMenu