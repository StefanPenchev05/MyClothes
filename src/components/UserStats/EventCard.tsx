import React from "react";

const EventCard: React.FC<Events> = ({ title, week, teamMembers }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col flex-nowrap justify-between">
      <div>
        <div className="text-base font-semibold">{title}</div>
        <div className="text-sm text-gray-500">Week {week}</div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex -space-x-2 overflow-hidden">
          {teamMembers.map((member, index) => (
            <img
              key={index}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src={member.avatar}
              alt={member.name}
              title={member.name}
            />
          ))}
        </div>
        <div className="text-sm text-gray-700">Design team</div>
      </div>
    </div>
  );
};

export default EventCard;
