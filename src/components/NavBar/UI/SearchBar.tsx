import React, { useEffect, useRef, useState } from "react"
import { getData } from "../../../service/api"
import { Search } from "@mui/icons-material"
import useDebounce  from '../../../utils/useDebounce';

interface Data {
    message? : string,
    username: string,
    avatar: string
}

interface SearchBarType{
    setSearchResult: React.Dispatch<React.SetStateAction<Data[] | undefined>>
}

function SearchBar({setSearchResult}:SearchBarType) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 300);

    const handleInputChange = (evet: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(evet.target.value);
    }

    const handleOnClick = () => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }

    useEffect(() => {
        const query = {
            params: 'username',
            data: debouncedSearchTerm
        }
        const fetchData = async() => {
            try {
                const fetchedData = await getData("/navBar/searchBar", query);
                setSearchResult(fetchedData);
            } catch (error) {
                console.error(error);
            }
        }
        if(debouncedSearchTerm){
            fetchData();
        }else{
            setSearchResult(undefined);
        }
    },[debouncedSearchTerm])

    return (
        <div className='flex flex-nowrap items-center p-2 border-2 border-gray-300 rounded-2xl w-full'>
            <div className="mr-4 cursor-pointer hover:text-gray-500 transition-colors duration-200">
                <Search fontSize="medium" onClick={handleOnClick}/>
            </div>
            <div className="w-full border-none">
                <label htmlFor="search" className="sr-only">Search</label>
                <input 
                    id="search" 
                    placeholder="Search..." 
                    className="w-full outline-none py-1 bg-transparent" 
                    onChange={(e) => handleInputChange(e)}
                    ref={inputRef}
                />
            </div>
        </div>
    )
}

export default SearchBar