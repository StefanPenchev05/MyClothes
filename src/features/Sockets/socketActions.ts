import { io, Socket } from 'socket.io-client';

interface User {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
    socket_id: string | null,
}

interface Message{
    message_id: string,
    sender: string,
    message: string,
    timestamp: string,
    reacted: string | null,
    seen: boolean,
}

interface ChatList{
    chat_id: string,
    user: User,
    lastMessage: string,
    timesnap: Date | null,
}

interface ConversationType{
    conversation_id: string,
    user: User,
    messages: Message[],
}

class SocketManager {
    private _socket: Socket | null = null;

    constructor(private url: string | undefined) {
        this._socket = io(this.url ? this.url : 'http://192.168.0.29:5500/user/messages', {
            transports: ['websocket'],
            autoConnect: false,
        });
        this._socket.connect();
    }

    get getSocket(){
        return this._socket;
    }

    disconnect() {
        if(this._socket){
            this._socket.disconnect();
            this._socket = null;
        }
    }

    getChatList(): Promise<ChatList[] | false> {
        return new Promise((resolve, reject) => {
            if (this._socket) {
                this._socket.emit('get_chat_list');
                this._socket.on('get_chat_list', (User: ChatList[]) => {
                    if (User) {
                        resolve(User);
                    } else {
                        reject(new Error('No User received from server'));
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    getConversation(): Promise<ConversationType | false> {
        return new Promise((resolve, reject) => {
            if (this._socket) {
                this._socket.on('get_conversation', (conversation: ConversationType) => {
                    if (conversation) {
                        resolve(conversation);
                    } else {
                        reject(new Error('No User received from server'));
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    sendMessage(message: string, otherUser_id: string) {
        if (this._socket) {
            this._socket.emit('send_message', {message, otherUser_id});
        }
    }

    seenMessage(message_id: string, otherUser_id: string) {
        if (this._socket) {
            this._socket.emit('seen_message', {message_id, otherUser_id});
        }
    }

}

export default SocketManager;