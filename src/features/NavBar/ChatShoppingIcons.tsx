import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChatBubble, ShoppingCart } from "@mui/icons-material";
import { IconButton, Badge, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";

function ChatShoppingIcons() {
  const chats = useSelector((state: any) => state.chatList);
  const navBar = useSelector((state:any) => state.userNavBar)
  const [unseenChatsCount, setUnseenChatsCount] = useState<number>(0);

  useEffect(() => {
    const countUnseenChats = (chats: any[]) => {
      let count = 0;
      chats.forEach((chat: any) => {
        if (!chat.seen && chat.user_id !== navBar.id) {
          count++;
        }
      });
      return count;
    };

    const unseenCount = countUnseenChats(chats);
    setUnseenChatsCount(unseenCount);
  }, [chats]);

  return (
    <div className="w-full space-x-4 sm:space-x-8 md:space-x-20">
      <Tooltip title="Chat">
        <Badge
          badgeContent={unseenChatsCount}
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <IconButton sx={{ padding: "0px" }}>
            <Link to={"user/messages"}>
              <ChatBubble fontSize="large" color="action" />
            </Link>
          </IconButton>
        </Badge>
      </Tooltip>
      <Tooltip title="Shopping Cart">
        <IconButton color="secondary">
          <ShoppingCart fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ChatShoppingIcons;
