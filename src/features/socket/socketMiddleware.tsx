import { addUser } from "../Chat/otherUser";
import { Middleware } from "@reduxjs/toolkit";
import io, { Socket } from "socket.io-client";
import {
  moveChatToStart,
  updateLastMessage,
  addChat as addChatListChat,
} from "../Chat/chatListSlice";
import { openSnackbar } from "../snackbars/snackbarSlice";
import { addChat, addMessage, updateMessage } from "../Chat/messageSlice";
import { setNotification } from "../../components/Notification/notificationSlice";

let socket: Socket;

interface SocketAction {
  type: string;
  payload?: {
    event: string;
    data: any;
  };
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  socket_id: string | null;
}

interface Message {
  conversation_id?: string;
  message_id: string;
  sender: string;
  message: string;
  timestamp: string;
  reacted: string | null;
  seen: boolean;
}

interface ChatList {
  chat_id: string;
  user_id: string;
  lastMessage: {
    message_id: string;
    sender: string;
    message: string;
    timestamp: string;
    reacted: string | null;
    seen: boolean;
  };
  lastMessageTime: string;
  timesnap: string;
}

interface ConversationType {
  conversation_id: string;
  user: User;
  messages: Message[];
}

interface Notification {
  conversation_id: string;
  message: string;
  sender: User;
}

const isSocketAction = (action: any): action is SocketAction => {
  return (action as SocketAction).payload !== undefined;
};

const socketMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  if (isSocketAction(action)) {
    switch (action.type) {
      case "socket/connect":
        // Connect to the socket.io server
        socket = io("http://localhost:5500/user/messages", {
          transports: ["websocket"],
          autoConnect: false,
        });

        socket.connect();

        //notifications
        socket.on("notify", (notification: Notification) => {
          storeAPI.dispatch(
            setNotification({
              open: true,
              conversation_id: notification.conversation_id,
              message: notification.message,
              sender: notification.sender,
            })
          );
        });

        // get conversations
        socket.on("get_chat_list", (chatList: ChatList[] | ChatList) => {
          if (!chatList) {
            storeAPI.dispatch(
              openSnackbar({
                open: true,
                message: "Server Error",
                severity: "error",
                autoHideDuration: 5000,
              })
            );
          }
          storeAPI.dispatch(addChatListChat(chatList));
        });

        // get conversation
        socket.on("get_conversation", (conversation: ConversationType) => {
          storeAPI.dispatch(addUser(conversation.user));
          storeAPI.dispatch(addChat(conversation.messages));
        });

        // recieve message
        socket.on("receive_message", (message: Message) => {
          storeAPI.dispatch(addMessage(message));
          if (message.conversation_id) {
            storeAPI.dispatch(moveChatToStart(message.conversation_id));
            storeAPI.dispatch(
              updateLastMessage({
                chat_id: message.conversation_id,
                message: message.message,
                timestamp: message.timestamp,
              })
            );
            return "test";
          }
        });

        // message sended
        socket.on("sended_message", (message) => {
          storeAPI.dispatch(addMessage(message));
          if (message.conversation_id) {
            storeAPI.dispatch(moveChatToStart(message.conversation_id));
            storeAPI.dispatch(
              updateLastMessage({
                chat_id: message.conversation_id,
                message: message.message,
                timestamp: message.timestamp,
              })
            );
          }
        });

        // message seen
        socket.on("message_seen", (message_id) => {
          storeAPI.dispatch(updateMessage(message_id));
        });
        break;
      case "socket/disconnect":
        // Disconnect from the socket.io server
        socket.disconnect();
        break;
      case "socket/emit":
        return new Promise((resolve, reject) => {
          if (action.payload?.event && action.payload?.data) {
            socket.emit(
              action.payload.event,
              action.payload.data,
              (response: any) => {
                if (response.error) {
                  reject(response.error);
                } else {
                  resolve(response);
                }
              }
            );
          }
        });
      default:
        return next(action);
    }
  }
};

export default socketMiddleware;
