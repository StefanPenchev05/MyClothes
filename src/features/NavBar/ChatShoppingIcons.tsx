import { Link } from "react-router-dom";
import {ChatBubble, ShoppingCart } from "@mui/icons-material";
import { IconButton, Badge, Tooltip, } from "@mui/material";


function ChatShoppingIcons() {
  return (
    <>
        <Tooltip title="Chat">
            <Badge
                badgeContent={3}
                color="error"
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            >
                <IconButton sx={{padding:'0px'}}>
                    <Link to={'user/messages'}>
                        <ChatBubble fontSize="large" color="action"/>
                    </Link>
                </IconButton>
            </Badge>
        </Tooltip>
        <Tooltip title="Shopping Cart">
            <IconButton color="secondary">
                <ShoppingCart fontSize="large" />
            </IconButton>
        </Tooltip>
    </>
  )
}

export default ChatShoppingIcons