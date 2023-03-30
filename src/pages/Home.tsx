import React from 'react'
import Navbar from '../components/Navbar'
import lib from '../assets/lib.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen justify-center items-center bg-[url('/src/assets/lib.jpg')] bg-cover">
        <button
          onClick={() => navigate('/library')}
          className="text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
          Explore Books
        </button>
      </div>
    </>
  )
}

export default Home
