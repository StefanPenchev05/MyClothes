import { Avatar, Typography} from '@mui/material'
import SearchBar from "../GlobalUI/SearchBar"

import { Socket } from 'socket.io-client'


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

interface ChatHistoryType{
    chatList: Message[] | undefined,
    setSearchResult : React.Dispatch<React.SetStateAction<Data[] | undefined>>,
    setMessageHistory: React.Dispatch<React.SetStateAction<Data[] | undefined>>,
    onClick: () => void,
    socket: Socket
}

function ChatHistoryList({chatList, setSearchResult, socket , setMessageHistory ,onClick: handleOnSearchClick}:ChatHistoryType) {

    const handleDisplayMessages = (idOfSelectedUser:string) => {
        socket.emit('dispalayMessages', idOfSelectedUser, setMessageHistory );
    }

  return (
    <div className='flex flex-col space-y-4'>
        <SearchBar setSearchResult={setSearchResult} onClick={handleOnSearchClick}/>
        {chatList ? (
           chatList.map((item, index) => (
                <div className='flex flex-row items-center space-x-4 hover:cursor-pointer' key={index} onClick={() => handleDisplayMessages(item.id)}>
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
                                <Typography variant="body2" className='text-md font-semibold mr-2'> {item.lastMessage} </Typography>
                                <Typography variant="body2" className='text-md font-semibold'> {item.timesnap ? item.timesnap.toLocaleString() : '' } </Typography>
                            </div>
                        </div>
                    </div>
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