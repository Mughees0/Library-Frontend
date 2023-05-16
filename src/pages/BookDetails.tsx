/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { borrowBook, fetchBook } from '../redux/slices/bookSlice'
import { BookRes, Decoded } from '../types'
import { UUID } from 'crypto'
import jwtDecode from 'jwt-decode'

function BookDetails() {
  const { bookId } = useParams()
  const { book } = useSelector((state: RootState) => state.bookData)
  const Authors = useSelector((state: RootState) => state.authorData.auhtors)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchBook(bookId))
  }, [bookId])

  function handleBorrow() {
    const token = localStorage.getItem('token')
    let decoded: Decoded
    let user_id: UUID

    if (token) {
      decoded = jwtDecode(token)
      user_id = decoded.user_id
    } else {
      user_id = 'dd2fce79-53a5-4b44-a15a-315538eae225'
    }
    dispatch(borrowBook({ userId: user_id, bookId: book.id }))
    navigate(`/user/${user_id}`)
  }

  return (
    <>
      <main className="flex mt-10 mb-36 justify-center gap-7 flex-wrap">
        <aside className="">
          <img
            src={book.cover}
            alt="Book Cover"
            className="w-52 shadow-lg shadow-white md:w-52 lg:w-52"
          />
        </aside>
        <section className=" h-screen flex w-3/6 flex-col gap-5 ">
          <article className=" flex flex-col gap-5">
            <h1 className=" text-3xl text-center font-bookHead">{book.title}</h1>
            <h2 className="text-center font-thin text-lg">{book.publisher}</h2>
            <p className="text-center font-bookDesc">{book.description}</p>
            <p className="text-center">
              <span>Genre: </span>
              {book.category.name}
            </p>
            <button
              onClick={handleBorrow}
              className=" bg-green-500 hover:bg-yellow-300 self-center text-black rounded-full w-20">
              Borrow
            </button>
          </article>
          <article className=" flex flex-col gap-2 border-t-2 pt-4">
            <h1 className=" italic font-serif text-lg pb-5 ">About the author</h1>
            <h2 className=" font-thin text-lg">{book.author.authorName}</h2>
            <p className=" font-thin text-lg">{book.author.email}</p>
          </article>
        </section>
      </main>
    </>
  )
}

export default BookDetails
