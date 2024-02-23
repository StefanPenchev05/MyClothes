import React from "react";

const Task: React.FC<Task> = ({ avatar, name, details, taskName }) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md space-x-4">
      <div className="flex items-center space-x-2">
        <img
          className="w-10 h-10 bg-cover bg-center rounded-full"
          src={avatar}
          alt="Avatar of the current user"
        />
        <p className="font-base text-sm">{name}</p>
      </div>
      <div className="flex-grow flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-blue-500"
        >
          <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
        </svg>
        <p className="truncate text-gray-600">{details}</p>
      </div>
      <p className="truncate text-gray-800 font-medium">{taskName}</p>
    </div>
  );
};

export default Task;