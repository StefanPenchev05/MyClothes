import React, { useEffect, useRef, useState } from "react";
import { getData } from "../../service/api";
import useDebounce from "../../utils/useDebounce";

interface SearchBarType {
  setSearchResult: React.Dispatch<React.SetStateAction<UserType[] | undefined>>;
  onClick?: () => void;
  autoFocus?: boolean;
}

function SearchBar({ setSearchResult, onClick, autoFocus }: SearchBarType) {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const [prevSearchTerm, setPrevSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedSearchTerm !== prevSearchTerm) {
      const query = {
        params: "username",
        data: debouncedSearchTerm,
      };

      const fetchData = async () => {
        try {
          const fetchedData = await getData("/navBar/searchBar", query);
          setSearchResult(fetchedData);
        } catch (error) {
          console.error(error);
        }
      };

      if (debouncedSearchTerm) {
        fetchData();
      } else {
        setSearchResult(undefined);
      }

      setPrevSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, prevSearchTerm]);

  return (
    <div className="flex-1">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="pl-10 pr-3 py-2 block w-full outline-none rounded-md border border-gray-300"
          placeholder="Search items, collections, and accounts"
          onChange={handleInputChange}
          onClick={onClick}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
}

export default SearchBar;