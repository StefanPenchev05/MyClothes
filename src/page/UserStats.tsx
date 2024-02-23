import React from "react";
import { useSelector } from "react-redux";
import { selectFirstName, selectAvatar } from "../features/users/User";
import Sidebar from "../components/Home/SideBar";
import Header from "../components/UserStats/Header";
import EventCard from "../components/UserStats/EventCard";
import WelcomeBanner from "../components/UserStats/WelcomeBanner";

import "../components/UserStats/index.css";

function UserStats() {
  const firstName = useSelector(selectFirstName);
  const avatar = useSelector(selectAvatar);

  return (
    <div className="grid grid-cols-7 h-screen">
      <Sidebar />
      <main className="pl-12 pr-4 col-span-6">
        <Header />
        <section>
          <WelcomeBanner firstName={firstName} />
          <button className="bg-black text-white px-4 py-2 text-sm font-medium mt-4">
            Profile Settings
          </button>
          <div className="grid grid-cols-2 border border-red-200">
            <div className="flex flex-row col-span-1">
              <div className="flex">
                <EventCard
                  id={1}
                  title="Finishing the design for website"
                  week={3}
                  teamMembers={[{ name: firstName, avatar:avatar }]}
                />
                <EventCard
                  id={1}
                  title="Finishing the design for website"
                  week={3}
                  teamMembers={[{ name: firstName, avatar:avatar }]}
                />
              </div>
            </div>
            <div className="col-span-1">Testing</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserStats;