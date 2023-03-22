import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addData } from '../../features/login/loginDataSlice'
import { loginProps } from '../loginPage/Login'

const Nav = () => {
  const person = useSelector((state: RootState) => state.userData.data)

  console.log(person)

  return (
    <nav className=" flex justify-end bg-green-500 h-8">
      <ul className="flex justify-around w-80 items-center">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#returnBook">Return a book</a>
        </li>
        <li className="flex justify-between w-24 ">
          <img className="w-6 rounded-full h-6" src={person.picture} alt="Profile Pic" />
          <a href="/" id="signOut">
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default memo(Nav)
