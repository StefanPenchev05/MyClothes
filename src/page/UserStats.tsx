import React from "react";
import { useSelector } from "react-redux";
import { selectFirstName, selectAvatar } from "../features/users/User";
import Sidebar from "../components/Home/SideBar";
import Header from "../components/UserStats/Header";
import EventCard from "../components/UserStats/EventCard";
import WelcomeBanner from "../components/UserStats/WelcomeBanner";

import Task from "../components/UserStats/Task";

function UserStats() {
  const firstName = useSelector(selectFirstName);
  const avatar = useSelector(selectAvatar);
  const evets = [
    {
      id: 1,
      title: "Finishing the design for website",
      week: 3,
      teamMembers: [{ name: firstName, avatar: avatar }],
    },
    {
      id: 1,
      title: "Finishing the design for website",
      week: 3,
      teamMembers: [{ name: firstName, avatar: avatar }],
    },
  ];

  const tasks = [
    {
      avatar: "https://example.com/avatar1.png",
      name: "John Doe",
      details: "This is a detailed description",
      taskName: "Design",
    },
    {
      avatar: "https://example.com/avatar2.png",
      name: "Jane Smith",
      details: "This is another detailed description of the task",
      taskName: "Implement the login functionality",
    },
  ];

  const TaskComponent = () => (
    <div className="row-span-2 shadow-right rounded-lg space-y-6 p-8">
      {tasks.map((task) => (
        <Task avatar={avatar ? avatar : ''} name={task.name} details={task.details} taskName={task.taskName}/>
      ))}
    </div>
  );

  const EventComponent = () => (
    <div className="flex space-x-6 row-span-1">
      {evets.map((event) => (
        <EventCard
          id={event.id}
          title={event.title}
          week={event.week}
          teamMembers={event.teamMembers}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-7 h-screen">
      <Sidebar />
      <main className="pl-12 pr-4 col-span-6">
        <Header />
        <section>
          <WelcomeBanner firstName={firstName} />
          <button className="bg-black text-white px-4 py-2 text-sm font-medium mt-4 mb-4">
            Profile Settings
          </button>
          <div className="grid grid-cols-2 border border-red-200">
            <div className="grid grid-rows-4 gap-4 col-span-1">
              <EventComponent />
              <TaskComponent />
            </div>
            <div className="col-span-1">Testing</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserStats;
