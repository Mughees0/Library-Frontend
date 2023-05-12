import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../store'
import { borrowedBooks, returnBook } from '../redux/slices/bookSlice'

function UserProfile() {
  const Books = useSelector((state: RootState) => state.bookData.borrowedBooks)
  const dispatch = useDispatch<AppDispatch>()

  const { userId } = useParams()

  useEffect(() => {
    dispatch(borrowedBooks(userId))
  }, [userId])
  function handleReturn(id: string) {
    dispatch(returnBook({ userId: userId, bookCopyId: id }))
  }

  return (
    <main className=" h-screen bg-yellow-700 ">
      <section>
        <h1>User Profile</h1>
        <h2>Borrowed books</h2>
        <ul>
          {Books.map((book) => (
            <>
              <li key={book.id}>{book.bookCopy.book.title}</li>
              <li>{book.bookCopy.status ? 'available' : 'borrowed'}</li>
              <button
                className=" bg-green-300 text-black px-3 rounded-lg"
                onClick={() => handleReturn(book.bookCopy.id)}>
                Return
              </button>
            </>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default UserProfile
