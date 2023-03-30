import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addBook, deleteBook, fetchBooks, updateBook } from '../../redux/slices/bookSlice'
import { Book } from '../../types'
import { toast, ToastContainer } from 'react-toastify'
import BookTable from './BookTable'

const AdminBooks = () => {
  const Books = useSelector((state: RootState) => state.bookData.data)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  //Books
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

  return (
    <>
      <div className="flex flex-col gap-9 min-h-screen items-center justify-around">
        <section className="outline bg-white w-screen flex flex-col gap-20 justify-between">
          {modalTable ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="outline flex flex-col gap-2 items-center absolute bg-red-400 top-0 right-0 bottom-0 left-0 m-auto h-[30rem] w-96 shadow-full">
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
              <BookTable
                setModalTable={setModalTable}
                modalTable={modalTable}
                setIsbn={setIsbn}
                isbn={isbn}
                setTitle={setTitle}
                title={title}
                setDescription={setDescription}
                description={description}
                setBookAuthor={setBookAuthor}
                bookAuthor={bookAuthor}
                setPublisher={setPublisher}
                publisher={publisher}
                setBorrowed={setBorrowed}
                borrowed={borrowed}
                setBorrowerId={setBorrowerId}
                borrowerId={borrowerId}
                setPublishedDate={setPublishedDate}
                publishedDate={publishedDate}
                setBorrowDate={setBorrowDate}
                borrowDate={borrowDate}
                setReturnDate={setReturnDate}
                returnDate={returnDate}
                setBtnText={setBtnText}
                btnText={btnText}
              />
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
                    className="rounded-full hover:bg-yellow-200 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
                    className=" hover:bg-gray-200 hover:shadow-2xl hover:transition-all flex flex-col px-9 gap-1 w-60 items-start py-4 my-3"
                    key={book.id}>
                    <td className="text-2xl text-black ">{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publishedDate}</td>
                    <td className="">{book.description}</td>
                    <td>
                      <button
                        className="rounded-full hover:bg-yellow-200 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
                        className="rounded-full hover:bg-yellow-200 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
                        onClick={() => handleDelete(book.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full hover:bg-yellow-200 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
      </div>
    </>
  )
}

export default AdminBooks
