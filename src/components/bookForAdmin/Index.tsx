import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addBook, deleteBook, fetchBooks, updateBook } from '../../redux/slices/bookSlice'
import { Book, BookReq, BookRes } from '../../types'
import { toast, ToastContainer } from 'react-toastify'
import BookTable from './Form'
import { UUID } from 'crypto'
import { deleteAuthor } from '../../redux/slices/authorSlice'

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

  function handleDelete(id: UUID): void {
    dispatch(deleteAuthor(id))
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
      <div className="flex flex-col gap-9 py-10 items-center justify-around">
        <section className=" w-screen flex flex-col gap-20 justify-between">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className=" text-3xl pb-2">Books</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Publisher
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
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-8 h-10 " src={book.cover} alt="Book cover" />
                        <div className="pl-3">
                          <div className="text-base font-semibold">{book.title}</div>
                          <div className="font-normal text-gray-500">{book.isbn}</div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{book.author.authorName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">{book.publisher}</div>
                      </td>
                      <td className="px-6 py-4">
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
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 pr-3 hover:underline"
                          onClick={() => {
                            handleUpdate(book)
                            setModalTable(!modalTable)
                          }}>
                          Edit
                        </button>
                        <button
                          className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleDelete(book.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="px-6 py-4">
                    <button
                      className=" font-medium text-lg text-green-400 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        handleAdd(bookInput)
                        setModalTable(!modalTable)
                      }}>
                      Click here to add a new book
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {modalTable ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className=" flex flex-col gap-2 items-center absolute top-0 right-0 bottom-0 left-0 m-auto h-[30rem] w-96 shadow-full">
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
        </section>
      </div>
    </>
  )
}

export default AdminBooks
