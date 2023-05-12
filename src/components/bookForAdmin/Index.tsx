import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addBook, deleteBook, fetchBooks, updateBook } from '../../redux/slices/bookSlice'
import { Book, BookReq, BookRes } from '../../types'
import { toast, ToastContainer } from 'react-toastify'
import BookTable from './Form'
import { UUID } from 'crypto'

const AdminBooks = () => {
  const Books = useSelector((state: RootState) => state.bookData.books)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  //Books
  const [id, setId] = useState<UUID>()
  const [isbn, setIsbn] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [authorId, setAuthorId] = useState<UUID>()
  const [categoryId, setCategoryId] = useState<UUID>()
  const [publisher, setPublisher] = useState('')
  const [cover, setCover] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [btnText, setBtnText] = useState('Submit')
  const [modalTable, setModalTable] = useState(false)

  const bookInput: Book = {
    id: id,
    title: title,
    isbn: isbn,
    description: description,
    authorId: authorId,
    categoryId: categoryId,
    publishedDate: publishedDate,
    publisher: publisher,
    cover: cover
  }

  function handleUpdate(object: BookRes): void {
    setId(object.id),
      setTitle(object.title),
      setIsbn(object.isbn),
      setDescription(object.description),
      setAuthorId(object.author.id),
      setCategoryId(object.category.id),
      setPublishedDate(object.publishedDate),
      setPublisher(object.publisher),
      setCover(object.cover),
      setBtnText('UPDATE')
  }

  function handleDelete(id: number): void {
    dispatch(deleteBook(id))
    toast.success('Successfully Deleted!')
  }

  function handleAdd(object: BookReq): void {
    setTitle(object.title),
      setIsbn(object.isbn),
      setDescription(object.description),
      setAuthorId(object.authorId),
      setCategoryId(object.categoryId),
      setPublishedDate(object.publishedDate),
      setPublisher(object.publisher),
      setCover(object.cover),
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
      location.reload()
    } else {
      toast('Please select an option, Add or update')
    }
    setModalTable(!modalTable)
  }

  return (
    <>
      <div className="flex flex-col gap-9 min-h-screen items-center justify-around">
        <section className=" w-screen flex flex-col gap-20 justify-between">
          {modalTable ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className=" flex flex-col gap-2  items-center absolute top-0 right-0 bottom-0 left-0 m-auto h-[30rem] w-96 shadow-full">
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
                setAuthorId={setAuthorId}
                authorId={authorId}
                setCategoryId={setCategoryId}
                categoryId={categoryId}
                setPublisher={setPublisher}
                publisher={publisher}
                setCover={setCover}
                cover={cover}
                setIsbn={setIsbn}
                isbn={isbn}
                setTitle={setTitle}
                title={title}
                setDescription={setDescription}
                description={description}
                setPublishedDate={setPublishedDate}
                publishedDate={publishedDate}
                setBtnText={setBtnText}
                btnText={btnText}
              />
            </form>
          ) : (
            <></>
          )}
          {/* modal end */}
          {/* table to display items */}
          <table className=" text-gray-300 ">
            <thead>
              <tr className="flex flex-col justify-center items-center flex-wrap">
                <th className="text-3xl text-white my-5">Books</th>
                <td>
                  <button
                    className="rounded-full text-yellow-300 hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
                    className="rounded-lg border-2 border-gray-600 hover:bg-gray-700 hover:shadow-2xl hover:transition-all flex flex-col px-9 gap-1 w-60 items-start py-4 my-3"
                    key={book.id}>
                    <td className="text-2xl text-white">{book.title}</td>
                    <td>{book.author.authorName}</td>
                    <td className="pb-4">{book.publishedDate}</td>
                    <td className="">{book.description}</td>
                    <td>
                      <button
                        className="rounded-full text-yellow-200 hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
                        className="rounded-full text-red-400 hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
                        onClick={() => handleDelete(book.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
