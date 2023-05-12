/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { borrowBook, fetchBook } from '../redux/slices/bookSlice'
import { BookRes, Decoded } from '../types'
import { UUID } from 'crypto'
import jwtDecode from 'jwt-decode'

function BookDetails() {
  const { bookId } = useParams()
  const { book } = useSelector((state: RootState) => state.bookData)
  const Authors = useSelector((state: RootState) => state.authorData.data)
  const dispatch = useDispatch<AppDispatch>()

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
  }

  return (
    <>
      <main className="flex justify-center">
        <aside className=" border border-yellow-400">
          <img src={book.cover} alt="Book Cover" className="" />
        </aside>
        <section className=" h-screen flex w-3/6 flex-col gap-5 border border-purple-500">
          <article className=" flex flex-col gap-5">
            <h1>{book.title}</h1>
            <h2>{book.publisher}</h2>
            <p>{book.description}</p>
            <p>
              <span>Genre: </span>
              {book.category.name}
            </p>
            <button onClick={handleBorrow} className=" bg-green-300 text-black rounded-full w-20">
              Borrow
            </button>
          </article>
          <article className=" flex flex-col gap-5 border-t-2 pt-4">
            <h1>About the author</h1>
            <h2>{book.author.authorName}</h2>
            <p>{book.author.email}</p>
            <p>{book.author.phone}</p>
          </article>
        </section>
      </main>
    </>
  )
}

export default BookDetails
