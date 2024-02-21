import React from 'react';
import { useSelector } from 'react-redux';
import { selectFirstName, selectAvatar } from '../features/users/User';
import Sidebar from '../components/Home/SideBar';
import Header from '../components/UserStats/Header';
import EventCard from '../components/UserStats/EventCard';
import WelcomeBanner from '../components/UserStats/WelcomeBanner';

function UserStats() {

  const firstName = useSelector(selectFirstName);
  const avatar = useSelector(selectAvatar);

  return (
    <div className="grid h-screen">
      <Sidebar />
      <main className="pl-12 pr-4">
        <Header />
        <section>
          <WelcomeBanner firstName={firstName} />
          <button className="bg-black text-white px-4 py-2 text-sm font-medium mt-4">
            Profile Settings
          </button>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <EventCard id={1} title="Testing" week={12} teamMembers={[{ name: firstName, avatar }]} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserStats;
