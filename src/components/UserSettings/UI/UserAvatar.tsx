import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendData } from "../../../service/api";
import { Add, ChangeCircle } from "@mui/icons-material";
import { Avatar, Badge, IconButton } from "@mui/material";
import { changedAvatar } from "../../../features/users/userGeneralSettings";

interface Adress extends Record<string, string> {}

interface Avatar {
  avatar: string;
  fileName: string;
  uploadedAt: Date;
}

interface ProfileImages {
  url: string;
  uploadDate: Date;
}

interface GeneralSettings {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "Don't want to state";
  role: "standardUser" | "designer" | "admin";
  phone: string;
  adress?: Adress;
  avatar: Avatar | null;
  profileImages: ProfileImages[] | ProfileImages | null;
}

interface UserAvatarType {
  settings: GeneralSettings;
}

function UserAvatar({ settings }: UserAvatarType) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleIconButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSendAvatar = (e: any) => {
    handleFileChange(e, async (avatar: string, fileName: string) => {
      const response = await sendData("/user/settings/general/change/avatar/", {
        avatar,
        fileName,
      });

      window.location.reload();
    });
  };

  const handleFileChange = (
    e: any,
    callback: (result: string, fileName: string) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 3 * (1024 * 1024); // 3MB
      if (file.size > maxSize) {
        alert("File is too large. Please upload a file less than 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        callback(reader.result as string, file.name);
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleSendAvatar}
        style={{ display: "none" }}
      />
      {settings.avatar ? (
        <Badge
          badgeContent={
            <IconButton onClick={handleIconButtonClick}>
              <ChangeCircle />
            </IconButton>
          }
        >
          <Avatar
            alt="User Avatar"
            src={settings.avatar.avatar}
            style={{ width: 200, height: 200 }}
          />
        </Badge>
      ) : (
        <Badge
          badgeContent={
            <IconButton onClick={handleIconButtonClick}>
              <Add />
            </IconButton>
          }
        >
          <Avatar sx={{ width: 200, height: 200 }} alt="User Avatar" src="" />
        </Badge>
      )}
    </div>
  );
}

export default UserAvatar;
