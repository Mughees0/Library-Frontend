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
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Your Borrowed Books
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Books.map((book) => {
              return (
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {book.bookCopy.book.title}
                  </th>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        handleReturn(book.bookCopy.id)
                        location.reload()
                      }}>
                      Return
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default UserProfile