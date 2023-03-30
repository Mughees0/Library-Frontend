import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchAuthor } from '../redux/slices/authorSlice'
import cover from '../assets/cover.png'
import {
  fetchBooks,
  filterBookByName,
  filterBookByAuthor,
  borrowBook,
  returnBook
} from '../redux/slices/bookSlice'
import { RootState, AppDispatch } from '../store'
import { Book } from '../types'
import useGoogleData from '../hooks/useGoogleData'
import Header from '../components/Header'
import BookTable from '../components/bookForUser/BookTable'
import BookFilters from '../components/bookForUser/BookFilters'

const userLibrary = () => {
  const [filterText, setFilterText] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')
  const Books = useSelector((state: RootState) => state.bookData.data)
  const Authors = useSelector((state: RootState) => state.authorData.data)
  const [user, token] = useGoogleData()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthor())
  }, [filterText, filterAuthor])

  function handleBorrow(book: Book): void {
    dispatch(borrowBook(book))
    toast.success('Borrowed! Please Check the Return Date')
  }
  function handleReturn(book: Book): void {
    dispatch(returnBook(book))
    toast.success('The book is returned successfully!')
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(filterBookByName(filterText))
    }
  }

  const handleAuthorSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(filterBookByAuthor(filterAuthor))
    }
  }

  return (
    <>
      <Navbar />
      <Header handleKeyPress={handleKeyPress} setFilterText={setFilterText} />
      <main className="flex items-start w-screen justify-center min-h-screen flex-wrap-reverse sm:flex-nowrap">
        <BookTable
          token={token}
          cover={cover}
          handleBorrow={handleBorrow}
          handleReturn={handleReturn}
          Books={Books}
        />
        <BookFilters
          Books={Books}
          Authors={Authors}
          handleAuthorSearch={handleAuthorSearch}
          setFilterAuthor={setFilterAuthor}
        />
      </main>
      <div className="flex flex-col items-center">
        {/* <!-- Help text --> */}
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">10</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
        </span>
        {/* <!-- Buttons --> */}
        <div className="inline-flex mt-2 xs:mt-0">
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default userLibrary
