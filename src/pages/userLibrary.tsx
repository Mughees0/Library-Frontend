import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Nav'
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
import BookTable from '../components/bookForUser/Table'
import BookFilters from '../components/bookForUser/BookFilters'
import ReactPaginate from 'react-paginate'

const userLibrary = () => {
  const [filterText, setFilterText] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')
  const Books = useSelector((state: RootState) => state.bookData.books)
  const Authors = useSelector((state: RootState) => state.authorData.auhtors)
  const { data, token } = useSelector((state: RootState) => state.userData)
  const [user, ourToken] = useGoogleData()
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

  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + 3
  const currentItems = Books.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(Books.length / 3)

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 3) % Books.length
    setItemOffset(newOffset)
  }
  return (
    <>
      <Header handleKeyPress={handleKeyPress} setFilterText={setFilterText} />
      <main className="flex items-start w-screen justify-center min-h-screen flex-wrap-reverse sm:flex-nowrap">
        <BookTable
          token={token}
          ourToken={ourToken}
          cover={cover}
          handleBorrow={handleBorrow}
          handleReturn={handleReturn}
          Books={currentItems}
        />
        <BookFilters
          Books={Books}
          Authors={Authors}
          handleAuthorSearch={handleAuthorSearch}
          setFilterAuthor={setFilterAuthor}
        />
      </main>
      <div className="flex flex-col items-center">
        <ReactPaginate
          breakLabel="..."
          containerClassName=" mb-24 flex items-center mt-2 xs:mt-0"
          nextLinkClassName="px-4 py-2 text-sm font-medium text-white border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 bg-gray-600"
          nextLabel="next ->"
          onPageChange={(e) => handlePageClick(e)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          pageClassName="px-4 flex items-center text-md hover:text-green-300 active:text-yellow-300 hover:shadow-2xl"
          previousClassName="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-l hover:bg-gray-900 "
          previousLabel="<- Back"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  )
}

export default userLibrary
