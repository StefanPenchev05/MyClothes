import { Typography, Avatar} from '@mui/material'
import { Chat } from '@mui/icons-material'
import {Socket} from 'socket.io-client'

interface Data {
    message? : string,
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface MessageMenuType{
    messageHistory: Data[] | undefined,
    socket: Socket
}

function MessageMenu({messageHistory, socket}:MessageMenuType) {

    socket.on('handleDisplayMessages', () => {
        
    })

  return (
    <>
        {messageHistory ? (
                <div>
                    {messageHistory.map((item, index) => (
                        <div className='flex flex-row items-center space-x-4' key={index}>
                            <div className='flex flex-row'>
                                <Avatar 
                                    src={item.avatar} 
                                    alt={`Avatar of ${item.firstName} ${item.lastName}`} 
                                    className="mr-2 w-16 h-16"
                                />  
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <Typography variant="body1" className='text-lg font-semibold'>{item.firstName} {item.lastName}</Typography>
                                    <div className='flex flex-row'>
                                        <Typography variant="body2" className='text-md font-semibold mr-2'>Message</Typography>
                                        <Typography variant="body2" className='text-md font-semibold'>Time</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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