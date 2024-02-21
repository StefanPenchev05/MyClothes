import React from 'react';

const EventCard: React.FC<Events> = ({ title, week, teamMembers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm text-gray-500">Week {week}</div>
        <div className="text-sm text-gray-700 mt-2">Design team</div>
      </div>
      <div className="flex -space-x-2 overflow-hidden">
        {teamMembers.map((member, index) => (
          <img key={index} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={member.avatar} alt={member.name} />
        ))}
      </div>
    </div>
  );
};

export default EventCard;
