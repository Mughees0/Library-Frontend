import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import useGoogleData from '../hooks/useGoogleLogin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addAuthor, deleteAuthor, fetchAuthor, updateAuthor } from '../redux/slices/authorSlice'
import cover from '../assets/cover.png'
import {
  updateBook,
  fetchBooks,
  addBook,
  deleteBook,
  filterBookByName,
  filterBookByAuthor,
  borrowBook,
  returnBook
} from '../redux/slices/bookSlice'
import { clearUser, fetchUser } from '../redux/slices/userSlice'
import { RootState, AppDispatch } from '../store'
import { Author, Book } from '../types'
import lib from '../assets/lib.jpg'
import { Toast } from 'react-toastify/dist/components'
import Footer from '../components/Footer'

const userLibrary = () => {
  const [filterText, setFilterText] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')
  const Books = useSelector((state: RootState) => state.bookData.data)
  const Authors = useSelector((state: RootState) => state.authorData.data)
  const [token, setToken] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchUser())
    dispatch(fetchAuthor())

    const items = localStorage.getItem('token')
    if (items) {
      setToken(items)
    }
  }, [])

  function handleBorrow(book: Book): void {
    dispatch(borrowBook(book))
    toast.success('Borrowed! Please Check the Return Date')
    setTimeout(() => {
      location.reload()
    }, 2000)
  }
  function handleReturn(book: Book): void {
    dispatch(returnBook(book))
    toast.success('The book is returned successfully!')
    setTimeout(() => {
      location.reload()
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <header className="outline bg-cover flex justify-center items-center bg-[url('/src/assets/lib.jpg')] h-52">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative w-80 ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className=" block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-purple-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for books"
            required
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch(filterBookByName(filterText))
            }}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </header>
      <main className="flex items-start w-screen justify-center flex-wrap-reverse sm:flex-nowrap">
        <section className=" bg-gray-200 w-5/6 py-3 my-12 mx-12 flex flex-col items-center">
          <table className="w-4/5 ">
            <thead className="text-3xl underline  text-black">
              <tr className="">
                <td>
                  <h2>Books</h2>
                </td>
              </tr>
            </thead>
            <tbody className=" my-2 flex flex-col py-2 ">
              {Books.map((book) => {
                return (
                  <tr
                    className="outline py-2 my-2 flex flex-wrap px-9 gap-3 items-center hover:bg-gray-300 hover:shadow-2xl hover:transition-all"
                    key={book.id}>
                    <td className="w-36">
                      <img src={cover} alt="Book Cover" />
                    </td>
                    <td className=" gap-1 flex flex-col px-9  items-start">
                      <h2 className="text-3xl text-custom-blue font-heading">{book.title}</h2>
                      <p>{book.author}</p>
                      <p>{book.publishedDate}</p>
                      <p>{book.description}</p>
                      {token ? (
                        <>
                          <div>
                            {book.borrowed ? (
                              <p className="text-custom-orange text-lg">
                                Not Available, Return Date: {book.returnDate}
                              </p>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleBorrow(book)}
                                  className="bg-custom-greenish rounded-full px-4 my-3">
                                  Borrow
                                </button>
                                <ToastContainer
                                  position="bottom-center"
                                  autoClose={1000}
                                  hideProgressBar={true}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="light"
                                />
                              </>
                            )}
                          </div>
                          <div>
                            {book.borrowed ? (
                              <>
                                <button
                                  onClick={() => handleReturn(book)}
                                  className="bg-custom-greenish rounded-full px-4 my-3">
                                  Return
                                </button>
                                <ToastContainer
                                  position="bottom-center"
                                  autoClose={1000}
                                  hideProgressBar={true}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="light"
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        <section className=" h-full w-1/6 mt-12 py-12 flex flex-col items-center">
          <div className="flex flex-col items-center w-44">
            <label
              htmlFor="small-input"
              className="block my-2 text-lg  font-medium text-gray-900 dark:text-black">
              Filter with author
            </label>
            <div className="">
              <input
                type="text"
                id="small-input"
                onChange={(e) => setFilterAuthor(e.target.value)}
                className="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                className="rounded-full px-3 mt-2 bg-custom-greenish hover:bg-green-600"
                onClick={() => dispatch(filterBookByAuthor(filterAuthor))}>
                Search
              </button>
            </div>
          </div>
          <ul className="px-5 flex flex-col items-start w-46">
            <li className="text-lg py-3">List of authors:</li>
            {Authors.map((author) => (
              <li className="pb-1" key={author.id}>
                {author.name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default userLibrary
