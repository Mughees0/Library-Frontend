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

const MainPage = () => {
  const person = useSelector((state: RootState) => state.userData.data)
  const Books = useSelector((state: RootState) => state.bookData.data)
  const dispatch = useDispatch()

  Books.map((book) => console.log('books', book))

  return (
    <>
      <header>
        <Nav />
      </header>
      <main id="home">
        <section>
          <Card />
          <button className="border bg-green-500" onClick={() => dispatch(fetchProductsThunk())}>
            Click to load
          </button>
          <ul>
            {Books.map((book) => (
              <li key={book.ISBN}>{book.author}</li>
            ))}
          </ul>
        </section>
        <section>
          <ReturnBook />
        </section>
      </main>
    </>
  )
}

export default memo(MainPage)
