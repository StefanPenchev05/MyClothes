import React from "react";
import "../components/Home/index.css";
import { useSelector } from "react-redux";
import Sidebar from "../components/Home/SideBar";
import Header from "../components/UserStats/Header";

function UserStats() {
  const firstName = useSelector((state: any) => state.userReducer.firstName);

  const WelcomeBanner = () => {
    return (
      <React.Fragment>
        <p className="font-bold text-2xl mb-2">Welcome, {firstName}</p>
        <p className="font-thin text-base mb-2">
          Explore and discover amazing designs from talanted <br />
          designers. Open the panel to view your progress and growth in
        </p>
      </React.Fragment>
    );
  };

  return (
    <div className="grid h-screen">
      <Sidebar />
      <div className="pl-4">
        <Header />
        <div>
          <WelcomeBanner />
          <button className="bg-black text-white px-4 py-4 text-sm font-medium">
            Profile Settings
          </button>
          <div className="grid grid-cols-2">

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStats;
