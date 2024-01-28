import { useEffect, useState, useRef } from "react";
import { Chat, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearChat } from "./messageSlice";
import { updaateLastMessageSeen } from "./chatListSlice";
import { Typography, Avatar, Divider, CircularProgress } from "@mui/material";

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

interface MessageMenuType {
  selectedChat: string | undefined;
}

function MessageMenu({ selectedChat }: MessageMenuType) {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const messageList: Message[] = useSelector((state: any) => {
    return state.message;
  });

  const otherUser: User = useSelector((state: any) => {
    return state.otherUsers;
  });

  const user: User = useSelector((state: any) => {
    return state.userNavBar;
  });

  const totalMessages: number = useSelector((state: any) => {
    const chatList: [] = state.chatList;
    if (selectedChat && chatList) {
      const chat: any = chatList.find(
        (item: any) => item.chat_id === selectedChat
      );
      return chat ? chat.totalMessages : 0;
    }
    return;
  });

  const scrollToBottom = () => {
    if (messageEndRef.current && page === 1) {
      const { current } = messageEndRef;
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    const loadedMessages = page * 15;
    if (scrollTop === 0 && loadedMessages < totalMessages) {
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      },2000)
      setIsLoadingPage(true);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      if (page === 1) {
        setIsLoading(true);
        dispatch(clearChat({}));
      }

      dispatch({
        type: "socket/emit",
        payload: { event: "joinRoom", data: { selectedChat, page } },
      });

      setIsLoadingPage(false);

      // dispatch({
      //   type: "socket/connect",
      //   payload: { event: "get_conversation" },
      // });

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => {
        dispatch({
          type: "socket/emit",
          payload: { event: "leaveRoom", data: selectedChat },
        });
      };
    }
  }, [selectedChat, page, dispatch]);

  useEffect(() => {
    dispatch({ type: "socket/connect", payload: { event: "sended_message" } });
    dispatch({ type: "socket/connect", payload: { event: "message_seen" } });

    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (messageList.length > 0 && selectedChat) {
      if (
        selectedChat &&
        isLoading === false &&
        messageList[messageList.length - 1].sender !== user.id
      ) {
        dispatch({
          type: "socket/emit",
          payload: {
            event: "message_seen",
            data: {
              lastMessage: messageList[messageList.length - 1].message_id,
              selectedChat,
            },
          },
        });
        dispatch(updaateLastMessageSeen({seen: true, id: selectedChat}))
      }
    }
  }, [messageList, isLoading]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message) {
      if (message.trim().length > 0 && selectedChat) {
        dispatch({
          type: "socket/emit",
          payload: {
            event: "send_message",
            data: {
              message: message,
              otherUser_id: otherUser.id,
              selectedChat,
            },
          },
        });
        setMessage(null);
      }
    }
  };
  return (
    <>
      {selectedChat ? (
        isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <Chat className="w-28 h-28" />
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col h-full w-full justify-between">
            <div className="flex flex-row items-center p-4 justify-between">
              <div className="flex items-center">
                <Avatar className="w-18 h-18" src={otherUser.avatar} />
                <Typography className="text-xl font-semibold ml-4">
                  {otherUser.firstName} {otherUser.lastName}
                </Typography>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <Settings />
              </div>
            </div>
            <Divider orientation="horizontal" />
            {isLoadingPage && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            <div
              className="flex-grow overflow-auto p-4"
              onScroll={handleScroll}
            >
              {messageList.map((msg, index) =>
                msg.sender === otherUser.id ? (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-start mb-4 space-x-4"
                  >
                    <Avatar className="w-30 h-30" src={otherUser.avatar} />
                    <Typography
                      variant="body1"
                      className="text-start text-wrap text-base font-normal text-white border-2 border-blue-500 rounded-lg bg-blue-500 p-2 ml-4 overflow-wrap break-words max-w-[190px]"
                    >
                      {msg.message}
                    </Typography>
                  </div>
                ) : (
                  <div key={index} className="flex justify-end mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-start space-x-4">
                        <Typography
                          variant="body1"
                          className="text-start text-wrap text-base font-normal text-white border-2 border-blue-500 rounded-lg bg-blue-500 p-2 ml-4 overflow-wrap break-words max-w-[190px]"
                        >
                          {msg.message}
                        </Typography>
                        {messageList.length - 1 === index &&
                          msg.seen === true && (
                            <Typography className="text-sm text-gray-500 italic">
                              seen
                            </Typography>
                          )}
                      </div>
                      <Avatar className="w-30 h-30" src={user.avatar} />
                    </div>
                  </div>
                )
              )}
              <div ref={messageEndRef} />
            </div>
            <div className="flex flex-row items-center p-4">
              <form
                className="flex-grow flex flex-row items-center"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  className="flex-grow mr-4 border-2 border-gray-300 rounded-2xl p-2"
                  placeholder="Type a message"
                  value={message ? message : ""}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Chat className="w-28 h-28" />
          <Typography variant="body1" className="text-lg font-semibold">
            Please select a chat
          </Typography>
        </div>
      )}
    </>
  );
}

export default MessageMenu;
