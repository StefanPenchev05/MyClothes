import { IconButton } from "@mui/material";
import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";

import MessageMenu from "../features/Chat/MessageMenu";
import SearchBar from "../components/GlobalUI/SearchBar";
import ChatHistoryList from "../features/Chat/ChatHistoryList";
import SearchResultList from "../features/Chat/SearchResultList";

interface ChatMenuType {
  selectedChat: string | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function ChatMenu({ selectedChat, setSelectedChat }: ChatMenuType) {
  const [searchResult, setSearchResult] = useState<SocketUser[] | undefined>(
    undefined
  );
  const [searchMenu, setSearchMenu] = useState<boolean>(false);

  const handleOnSearchClick = () => {
    setSearchMenu(true);
  };

  return (
    <div
      className="w-full flex flex-row px-4"
      style={{ height: "calc(100vh - 74px)" }}
    >
      <div className="flex justify-center w-1/4 bg-gray-200 rounded-lg p-4">
        <div className="relative w-full">
          {searchMenu ? (
            <div className="top-14 w-full">
              <div className="flex flex-row mb-4">
                <IconButton
                  onClick={() => setSearchMenu(false)}
                  className="mr-4"
                >
                  <ArrowBack />
                </IconButton>
                <SearchBar
                  setSearchResult={setSearchResult}
                  onClick={handleOnSearchClick}
                  autoFocus={true}
                  isTransperant={false}
                />
              </div>
              <SearchResultList
                searchResult={searchResult}
                setSearchMenu={setSearchMenu}
                setSelectedChat={setSelectedChat}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-4 justify-center">
              <SearchBar
                setSearchResult={setSearchResult}
                onClick={handleOnSearchClick}
              />
              <ChatHistoryList
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center w-3/4 bg-white border-2 border-gray-200 rounded-lg p-6 ml-4 shadow-lg">
        <MessageMenu selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default ChatMenu;
