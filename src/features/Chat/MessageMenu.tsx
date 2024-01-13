import { useEffect, useState } from 'react';
import { Typography, Avatar, Divider, CircularProgress } from '@mui/material'
import { Chat } from '@mui/icons-material'
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';


interface Data {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface Message{
    id: string,
    message: string,
    timesnap: Date,
    sender: Data,
}

interface MessageMenuType{
    selectedChat: string | undefined,
}

function MessageMenu({selectedChat}:MessageMenuType) {
    const [message, setMessage] = useState<string | null>(null);
    const [socket, SetSocket] = useState<Socket | undefined>(undefined);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(selectedChat){
            const socket = io(`http://localhost:5500/user/messages`, {withCredentials: true});
            SetSocket(socket);
            setIsLoading(true);
            
            socket.on('connect', () => {
                socket.emit('joinRoom', selectedChat);
            });
    
            socket.on('get_messages', (message: Message[]) => {
                setMessages(message);
                setIsLoading(false);
            })
    
            socket.on('connect_error', (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
    
            return () => {
                socket.off('message');
                socket.off('connect_error');
            }
        }
    }, [selectedChat])

    socket?.on('new_message', (message: Message) => {
        setMessages([...messages, message]);
    });

    const handleSendMessage = () => {
        if(socket && message && selectedChat){
           setMessages([...messages, {id:'', message: message, timesnap: new Date(), sender: {id: '', firstName: '', lastName: '', avatar: ''}}]);
            socket.emit('send_message', {message: message, chat_id: selectedChat});
            setMessage(null);
        }
    }
  return (
    <>
        {/* {selectedChat ? (
             isLoading ? (
                <div className='flex flex-col justify-center items-center'>
                    <Chat className='w-28 h-28'/>
                    <CircularProgress/>
                </div>
             ) : (
                <div className='flex flex-col h-full w-full justify-between'>
                    <div className='flex flex-row items-center p-4'>
                        <Avatar className='w-30 h-30'/>
                        <Typography variant="body1" className='text-lg font-semibold ml-4'>{}</Typography>
                    </div>
                    <Divider orientation='horizontal'/>
                    <div className='flex-grow overflow-auto p-4'>
                        {messages.map((msg, index) => (
                            <div key={index} className='mb-4'>
                                <Avatar className='w-30 h-30' src={msg.sender.avatar}/>
                                <Typography variant="body1">{msg.message ? msg.message : 'No messages yet'}</Typography>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row items-center p-4'>
                        <input 
                            type="text" 
                            className='flex-grow mr-4 border-2 border-gray-300 rounded-2xl p-2' 
                            placeholder="Type a message" 
                            value={message ? message : ''} 
                            onChange={(e) => setMessage(e.target.value)} 
                        />
                        <button 
                            onClick={handleSendMessage} 
                            className='px-4 py-2 bg-blue-500 text-white rounded'
                        >
                            Send
                        </button>
                    </div>
                </div>
             )
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <Chat className='w-28 h-28'/>
                    <Typography variant="body1" className='text-lg font-semibold'>Please select a chat</Typography>
                </div>
        )} */}
    </>
  )
}

export default MessageMenu