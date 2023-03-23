import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData } from '../../features/login/loginDataSlice'
import { RootState } from '../../store'
import useGoogleData from '../../hook/useGoogleData'
import Login, { loginProps } from '../loginPage/Login'
import Nav from '../nav/Nav'
import Card from './Card'
import { Books, fetchProductsThunk } from '../../features/api/fetchDataSlice'
import ReturnBook from '../returnBook/ReturnBook'
import wlpr from '../../assets/wlpr.jpg'

const MainPage = () => {
  const person = useSelector((state: RootState) => state.userData.data)
  const Books = useSelector((state: RootState) => state.bookData.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])

  return (
    <>
      <header>
        <Nav />
      </header>
      <main
        id="home"
        className="contianer flex flex-col justify-evenly items-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <section>
          <img src={wlpr} alt="main pic" className="w-screen object-cover h-72" />
        </section>
        <section className="container my-5 py-10 flex flex-wrap justify-center gap-12">
          {Books.map((book) => (
            <div
              key={book.ISBN}
              role="card"
              className="container bg-yellow-500 flex flex-col justify-evenly items-center h-60 w-52 px-5">
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <button className="bg-sky-500 hover:bg-sky-700 border-double rounded-full px-4 py-1">
                BORROW
              </button>
            </div>
          ))}
        </section>
        <section>
          <ReturnBook />
        </section>
      </main>
      <footer className="flex justify-between items-center h-8 ">
        <span>copyright</span>
        <ul>
          <li>icons</li>
        </ul>
      </footer>
    </>
  )
}

export default MainPage
