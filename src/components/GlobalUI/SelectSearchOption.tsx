import { Typography } from "@mui/material";
import React from "react";

interface SelectSearchOptionProp{
    setOption: (key: string) => void;
}

function SelectSearchOption({setOption}:SelectSearchOptionProp) {
  return (
    <div className="absolute bg-white dark:bg-black shadow-lg p-6 rounded-lg overflow-hidden space-y-4">
      <div className="flex flex-row space-x-8 items-center cursor-pointer" onClick={() => setOption("Accounts")}>
        <Typography
          variant="subtitle1"
          className="text-black dark:text-[#CFFFF6] dark:bg-[#246a5d] shadow-lg rounded-lg p-2"
        >
          /Accounts
        </Typography>
        <p className="text-gray-500 dark:text-white font-light">
          Please select to start searching accounts
        </p>
      </div>
      <div className="flex flex-row space-x-8 items-center cursor-pointer" onClick={() => setOption("Items")}>
        <Typography
          variant="subtitle1"
          className="text-black dark:text-[#CFFFF6] dark:bg-[#246a5d] shadow-lg rounded-lg p-2"
        >
          /Items
        </Typography>
        <p className="text-gray-500 dark:text-white font-light">
          Please select to start searching Items
        </p>
      </div>
    </div>
  );
}

export default SelectSearchOption;
