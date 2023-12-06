import React, { useState } from 'react'

import SearchBar from "../components/GlobalUI/SearchBar"
import SearchResultMenu from "../components/GlobalUI/SearchResultMenu"

interface Data {
    message? : string,
    username: string,
    avatar: string,
}

function ChatMenu() {
    const [searchResult, setSearchResult] = useState<Data[]>();

    const handleOnSearchClick = () => {
        console.log('search click');
    }

  return (
    <div className="w-full min-h-full flex flex-row p-4">
        <div className='flex justify-center items-center w-1/4 h-full bg-gray-200 rounded-lg p-4'>
            <div className='relative'>
                <SearchBar setSearchResult={setSearchResult} onClick={handleOnSearchClick}/>
            </div>
        </div>
        <div className='flex justify-center items-center w-3/4 h-full bg-gray-300 rounded-lg p-4 ml-4'>
            <p className='text-center text-gray-700'>Right Panel</p>
        </div>
    </div>
  )
}

export default ChatMenu