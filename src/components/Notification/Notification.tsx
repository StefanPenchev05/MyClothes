import { Snackbar, Avatar, Typography } from "@mui/material";
import { closeNotification } from "./notificationSlice";
import { useDispatch, useSelector } from "react-redux";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  socket_id: string | null;
}

interface NotificationType {
  open: boolean;
  conversation_id: string | null;
  message: string | null;
  sender: User | null;
}

interface NotificationProps {
  selectedChat: React.MutableRefObject<string | undefined>
}

function Notification({ selectedChat }: NotificationProps) {
  const notification: NotificationType = useSelector(
    (state: any) => state.notifications
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeNotification(false));
  };

  const handleOpenChat = () => {
    if (notification.conversation_id) {
      selectedChat.current = notification.conversation_id;
      window.location.href = "/user/messages";
    }
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={handleClose}
      onClick={handleOpenChat}
      message={
        <div className="flex space-x-4">
          <Avatar src={notification.sender?.avatar} className="w-10 h-10" />
          <div className="flex flex-col space-y-2">
            <Typography variant="h6">
              {notification.sender?.firstName} {notification.sender?.lastName}
            </Typography>
            <Typography
              variant="body2"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "200px",
              }}
            >
              {notification.message}
            </Typography>
          </div>
        </div>
      }
    />
  );
}

export default Notification;
