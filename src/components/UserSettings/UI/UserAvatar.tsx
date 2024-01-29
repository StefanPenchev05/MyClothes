import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendData } from "../../../service/api";
import { Add, ChangeCircle } from "@mui/icons-material";
import { Avatar, Badge, IconButton } from "@mui/material";
import { changedAvatar } from "../../../features/users/userGeneralSettings";

interface Adress {
  street: String;
  city: String;
  state: String;
  zip: String;
  country: String;
}

interface Avatar {
  avatar: string;
  fileType: String;
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
    console.log("clicked");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    // Replace with your API endpoint
    const response = await sendData("/settings/general/change/avatar", formData);

    if (response.success) {
        console.log(response.data)
        dispatch(changedAvatar(response.data));
    }

    if (!response.ok) {
      console.error("Upload failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
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
            src={`data:${settings.avatar.fileType};base64,${settings.avatar.avatar}`}
            sx={{ width: 150, height: 150, borderRadius: "20%" }}
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
          <Avatar
            sx={{ width: 150, height: 150, borderRadius: "20%" }}
            alt="User Avatar"
            src=""
          />
        </Badge>
      )}
    </div>
  );
}

export default UserAvatar;
