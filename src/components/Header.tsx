import React from 'react'
import { HeaderProps } from '../types'
import SearchBar from './SearchBar'

const Header = ({ handleKeyPress, setFilterText }: HeaderProps) => {
  return (
    <div>
      <header className="bg-cover bg-center flex justify-center items-center bg-[url('/src/assets/lib.jpg')] h-52">
        <div className="relative w-[56rem] hover:shadow-2xl transition-all">
          <SearchBar handleKeyPress={handleKeyPress} setFilterText={setFilterText} />
        </div>
      </header>
    </div>
  )
}

export default Header
