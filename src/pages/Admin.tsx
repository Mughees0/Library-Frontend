import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'
import { addAuthor, deleteAuthor, fetchAuthor, updateAuthor } from '../redux/slices/authorSlice'
import { addBook, deleteBook, fetchBooks, updateBook } from '../redux/slices/bookSlice'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { AppDispatch, RootState } from '../store'
import { Author, Book } from '../types'
import Footer from '../components/Footer'

const Admin = () => {
  const Books = useSelector((state: RootState) => state.bookData.data)
  const author = useSelector((state: RootState) => state.authorData.data)
  const dispatch = useDispatch<AppDispatch>()
  const [id, setId] = useState(0)
  const [isbn, setIsbn] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [borrowed, setBorrowed] = useState('false')
  const [borrowerId, setBorrowerId] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [borrowDate, setBorrowDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [btnText, setBtnText] = useState('Submit')
  const [modalTable, setModalTable] = useState(false)
  const [authorModalTable, setAuthorModalTable] = useState(false)

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthor())
  }, [])

  const borrow = borrowed === 'false' ? false : true

  const bookInput: Book = {
    id: id,
    ISBN: isbn,
    title: title,
    description: description,
    author: bookAuthor,
    publisher: publisher,
    borrowed: borrow,
    borrowerId: borrowerId,
    publishedDate: publishedDate,
    borrowDate: borrowDate,
    returnDate: returnDate
  }

  function handleUpdate(object: Book): void {
    setId(object.id)
    setIsbn(object.ISBN)
    setTitle(object.title)
    setDescription(object.description)
    setBookAuthor(object.author)
    setPublisher(object.publisher)
    setBorrowed('true')
    setBorrowerId(object.borrowerId)
    setPublishedDate(object.publishedDate)
    setBorrowDate(object.borrowDate)
    setReturnDate(object.returnDate)
    setBtnText('UPDATE')
  }

  function handleDelete(id: number): void {
    dispatch(deleteBook(id))
    toast.success('Successfully Deleted!')
  }

  function handleAdd(object: Book): void {
    setId(Date.now())
    setIsbn(object.ISBN)
    setTitle(object.title)
    setDescription(object.description)
    setBookAuthor(object.author)
    setPublisher(object.publisher)
    setBorrowed('true')
    setBorrowerId(object.borrowerId)
    setPublishedDate(object.publishedDate)
    setBorrowDate(object.borrowDate)
    setReturnDate(object.returnDate)
    setBtnText('ADD')
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (btnText === 'ADD') {
      dispatch(addBook(bookInput))
      toast.success('Successfully Added!')
    } else if (btnText === 'UPDATE') {
      dispatch(updateBook(bookInput))
      toast.success('Successfully Update!')
    } else {
      toast('Please select an option, Add or update')
    }
    setModalTable(!modalTable)
  }
  const [authorId, setAuthorId] = useState(0)
  const [authorName, setAuthorName] = useState('')
  const [authorBtnText, setAuthorBtnText] = useState('Submit')

  const authorItem: Author = {
    id: authorId,
    name: authorName
  }

  function handleAuthorUpdate(author: Author) {
    setAuthorId(author.id)
    setAuthorName(author.name)
    setAuthorBtnText('UPDATE')
  }

  function handleAuthorDelete(id: number) {
    dispatch(deleteAuthor(id))
    toast.success('Successfully Deleted!')
  }

  function handleAuthorAdd(author: Author) {
    setAuthorId(Date.now())
    setAuthorName(author.name)
    setAuthorBtnText('ADD')
  }

  function handleAuthorSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (authorBtnText === 'UPDATE') {
      dispatch(updateAuthor(authorItem))
      toast.success('Successfully Update!')
    } else if (authorBtnText === 'ADD') {
      dispatch(addAuthor(authorItem))
      toast.success('Successfully Added!')
    } else {
      toast('Please select an option, Add or update')
    }
    setAuthorModalTable(!authorModalTable)
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-9 items-centerjustify-around">
        <section className="outline bg-yellow-300 w-screen flex flex-col gap-20 justify-between">
          {modalTable ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="outline flex flex-col gap-2 items-center absolute bg-red-400 top-0 right-0 bottom-0 left-0 m-auto h-[30rem] w-96 shadow-3xl">
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <table className="flex justify-center gap-2 items-center flex-col pb-4">
                <thead>
                  <tr>
                    <td className="text-sm flex  w-80">
                      <button
                        className="flex items-center gap-1"
                        onClick={() => setModalTable(!modalTable)}>
                        <IoIosArrowRoundBack /> Back
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Book Form</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-3 items-center ">
                  <tr className="flex justify-between w-72">
                    <td>ISBN</td>
                    <td>
                      <input
                        onChange={(e) => setIsbn(e.target.value)}
                        value={isbn}
                        id="isbn"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Title</td>
                    <td>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        id="title"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Description</td>
                    <td>
                      <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="discription"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Author</td>
                    <td>
                      <input
                        onChange={(e) => setBookAuthor(e.target.value)}
                        value={bookAuthor}
                        id="author"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Publisher</td>
                    <td>
                      {' '}
                      <input
                        onChange={(e) => setPublisher(e.target.value)}
                        value={publisher}
                        id="publisher"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Borrowed</td>
                    <td>
                      <select
                        id="borrowed"
                        value={borrowed}
                        onChange={(e) => setBorrowed(e.target.value)}>
                        <option disabled value="">
                          -------Select--------
                        </option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Borrower Id</td>
                    <td>
                      <input
                        onChange={(e) => setBorrowerId(e.target.value)}
                        value={borrowerId}
                        id="borrowerId"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Publish Date</td>
                    <td>
                      <input
                        onChange={(e) => setPublishedDate(e.target.value)}
                        value={publishedDate}
                        id="publishedDate"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Borrow Date</td>
                    <td>
                      <input
                        onChange={(e) => setBorrowDate(e.target.value)}
                        value={borrowDate}
                        id="borrowDate"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-between w-72">
                    <td>Return Date</td>
                    <td>
                      <input
                        onChange={(e) => setReturnDate(e.target.value)}
                        value={returnDate}
                        id="returnDate"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-center w-72">
                    <td>
                      <input
                        className="rounded-full bg-green-500 px-4"
                        type="submit"
                        value={btnText}
                        onChange={(e) => setBtnText(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          ) : (
            <></>
          )}
          {/* modal end */}
          {/* table to display items */}
          <table className="outline  ">
            <thead>
              <tr className="flex flex-col justify-center items-center flex-wrap">
                <th className="text-3xl">Books</th>
                <td>
                  <button
                    className="rounded-full bg-green-500 px-4"
                    onClick={() => {
                      handleAdd(bookInput)
                      setModalTable(!modalTable)
                    }}>
                    Click to add a new book
                  </button>
                </td>
              </tr>
            </thead>
            <tbody className="flex flex-wrap gap-5 justify-center">
              {Books.map((book) => {
                return (
                  <tr
                    className="outline flex flex-col px-9 gap-1 w-60 items-start py-4 my-3"
                    key={book.id}>
                    <td className="text-2xl text-black ">{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publishedDate}</td>
                    <td className="outline">{book.description}</td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => {
                          handleUpdate(book)
                          setModalTable(!modalTable)
                        }}>
                        Update
                      </button>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                    </td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => handleDelete(book.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => {
                          handleAdd(book)
                          setModalTable(!modalTable)
                        }}>
                        Copy book data
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        {/* Author form */}
        <section className=" bg-yellow-300 w-screen flex flex-col justify-between">
          {authorModalTable ? (
            <form
              className="outline flex flex-col gap-2 items-center absolute bg-red-400 top-0 right-0 bottom-0 left-0 m-auto h-36 w-96 shadow-3xl"
              onSubmit={(e) => handleAuthorSubmit(e)}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <table className="flex justify-center gap-2 items-center flex-col pb-4">
                <thead>
                  <tr>
                    <td className="text-sm flex w-80">
                      <button
                        className="flex items-center gap-1"
                        onClick={() => setAuthorModalTable(!authorModalTable)}>
                        <IoIosArrowRoundBack /> Back
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Author Form</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-3 ">
                  <tr className="flex justify-between w-72">
                    <td>Author Name</td>
                    <td>
                      <input
                        onChange={(e) => setAuthorName(e.target.value)}
                        value={authorName}
                        id="authorName"
                        type="text"
                        required
                      />
                    </td>
                  </tr>
                  <tr className="flex justify-center">
                    <td>
                      <input
                        className="rounded-full bg-green-500 px-4"
                        type="submit"
                        value={authorBtnText}
                        onChange={(e) => setAuthorBtnText(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          ) : (
            <></>
          )}
          {/* Author Table  */}
          <table className="outline ">
            <thead>
              <tr className="flex flex-col justify-center items-center flex-wrap">
                <th className="text-2xl">Authors</th>
                <td>
                  <button
                    className="rounded-full bg-green-500 px-4"
                    onClick={() => {
                      handleAuthorAdd(authorItem)
                      setAuthorModalTable(!authorModalTable)
                    }}>
                    Click here to add an author
                  </button>
                </td>
              </tr>
            </thead>
            <tbody className="flex flex-wrap gap-5 justify-center">
              {author.map((author) => {
                return (
                  <tr
                    className="outline flex flex-col px-9 gap-1 items-start py-4 my-3"
                    key={author.id}>
                    <td className="text-2xl text-black ">{author.name}</td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => {
                          handleAuthorUpdate(author)
                          setAuthorModalTable(!authorModalTable)
                        }}>
                        Update
                      </button>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                    </td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => handleAuthorDelete(author.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => {
                          handleAuthorAdd(author)
                          setAuthorModalTable(!authorModalTable)
                        }}>
                        Copy author data
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}

export default Admin
