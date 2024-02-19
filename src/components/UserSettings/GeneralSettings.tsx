import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Typography, Chip } from "@mui/material";
import { fetchGeneralSettings } from "../../features/users/userGeneralSettings";
import UserAvatar from "./UI/UserAvatar";

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
  dateOfBirth: string;
  gender: "male" | "female" | "Don't want to state";
  role: "standardUser" | "designer" | "admin";
  phone: string;
  adress?: Adress;
  avatar: Avatar | null;
  profileImages: ProfileImages[] | ProfileImages | null;
}

function GeneralSettings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGeneralSettings() as any);
  }, [dispatch]);

  const settings: GeneralSettings = useSelector(
    (state: any) => state.generalSettings
  );


  return (
    <div className="w-full p-4" style={{ height: "calc(100vh - 70px)", background: "#f5f5f5" }}>
      <div className="h-full p-12 bg-gray-200 rounded-xl shadow-lg">
        <div className="flex">
          <div className="mr-12">
            <UserAvatar settings={settings} />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 p-2">
              <h5 className="text-blue-600 mb-2">Username: <span className="text-black">{settings.username}</span></h5>
              <h5 className="text-blue-600 mb-2">First Name: <span className="text-black">{settings.firstName}</span></h5>
              <h5 className="text-blue-600 mb-2">Last Name: <span className="text-black">{settings.lastName}</span></h5>
              <h5 className="text-blue-600 mb-2">Email: <span className="text-black">{settings.email}</span></h5>
            </div>
            <div className="w-full sm:w-1/2 p-2">
              <h5 className="text-blue-600 mb-2">Date of Birth: <span className="text-black">{settings.dateOfBirth}</span></h5>
              <h5 className="text-blue-600 mb-2">Gender: <span className="text-black">{settings.gender}</span></h5>
              <h5 className="text-blue-600 mb-2">Role: <span className="text-black">{settings.role}</span></h5>
              <h5 className="text-blue-600 mb-2">Phone: <span className="text-black">{settings.phone}</span></h5>
              <h5 className="text-blue-600 mb-2">Address: <span className="text-black">{settings.adress && Object.values(settings.adress).join(", ")}</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralSettings;
