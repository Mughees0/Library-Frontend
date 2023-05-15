import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { addCopies, countBookCopies, deleteBookCopies, fetchBooks } from '../redux/slices/bookSlice'
import { UUID } from 'crypto'

function BookCopies() {
  const [quantity, setQuantity] = useState<number>()
  const Books = useSelector((state: RootState) => state.bookData.books)
  const { bookCopies } = useSelector((state: RootState) => state.bookData)
  const dispatch = useDispatch<AppDispatch>()
  const [status, setStatus] = useState<boolean>()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  function handleAddCopies(id: UUID) {
    dispatch(addCopies({ bookId: id, quantity: quantity, status: status }))
  }
  function handleDeleteCopies(id: UUID) {
    dispatch(deleteBookCopies(id))
  }

  return (
    <main className=" h-screen">
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
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
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {book.title}
                  </th>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <span className="flex w-52 justify-around">
                      <span className="text-md w-20 justify-center flex gap-1 items-center">
                        <input
                          type="radio"
                          required
                          defaultChecked
                          name="role"
                          onClick={() => setStatus(true)}
                        />
                        Available
                      </span>

                      <span className="text-md w-20 justify-center flex gap-1 items-center">
                        <input type="radio" required name="role" onClick={() => setStatus(false)} />
                        Borrowed
                      </span>
                    </span>
                    {status != null ? (
                      <button
                        id="role"
                        onClick={() => handleAddCopies(book.id)}
                        className="font-medium text-green-400 dark:text-blue-500 hover:underline">
                        Add
                      </button>
                    ) : (
                      <></>
                    )}
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </a>
                    <button
                      onClick={() => handleDeleteCopies(book.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Remove
                    </button>
                  </td>
                </tr>
              )
            })}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4"></td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Options
              </th>
              <td className="flex items-center px-6 py-4 space-x-3">
                Select the number of copies to add here:
                <input
                  type="number"
                  name="quantity"
                  id="copyQuantity"
                  max={10}
                  placeholder="10"
                  min={0}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-12 h-6 p-0 text-black"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default BookCopies