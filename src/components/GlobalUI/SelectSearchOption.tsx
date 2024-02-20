import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";

interface SelectSearchOptionProp {
  setOption: (key: string) => void;
  setOptionOpen: (key: boolean) => void;
}

function SelectSearchOption({ setOption, setOptionOpen }: SelectSearchOptionProp) {
  const componentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", () => {
        setOptionOpen(false);
    })
    return () => {
        document.removeEventListener("keydown", () => {
            setOptionOpen(false);
        })
    }
  })

  return (
    <div
      ref={componentRef}
      className="absolute bg-white dark:bg-black shadow-lg p-6 rounded-lg overflow-hidden space-y-4 z-10"
    >
      <div
        className="flex flex-row space-x-8 items-center cursor-pointer"
        onClick={() => setOption("Accounts")}
      >
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
      <div
        className="flex flex-row space-x-8 items-center cursor-pointer"
        onClick={() => setOption("Items")}
      >
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
