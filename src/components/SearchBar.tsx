import React from 'react'
import { HeaderProps } from '../types'

const SearchBar = ({ handleKeyPress, setFilterText }: HeaderProps) => {
  return (
    <div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-7 h-7 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        onKeyUp={handleKeyPress}
        className=" block w-full p-4 pl-10 h-16 text-sm text-gray-900 border border-gray-700 hover:border-none rounded-lg  bg-gray-50  focus:outline-none dark:placeholder-gray-400 dark:text-black"
        placeholder="Search for books"
        required
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
