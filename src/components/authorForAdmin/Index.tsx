import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addAuthor, deleteAuthor, fetchAuthor, updateAuthor } from '../../redux/slices/authorSlice'
import { Author } from '../../types'
import { toast, ToastContainer } from 'react-toastify'
import AuthorTable from './Form'
import { UUID } from 'crypto'

const AdminAuthor = () => {
  const author = useSelector((state: RootState) => state.authorData.auhtors)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAuthor())
  }, [author])

  // Authors
  const [authorId, setAuthorId] = useState(0)
  const [authorName, setAuthorName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [authorBtnText, setAuthorBtnText] = useState('Submit')
  const [authorModalTable, setAuthorModalTable] = useState(false)

  const authorItem: Author = {
    id: authorId,
    authorName: authorName,
    email: email,
    phone: phone
  }

  function handleAuthorUpdate(author: Author) {
    setAuthorId(author.id)
    setAuthorName(author.authorName)
    setEmail(author.email)
    setPhone(author.phone)
    setAuthorBtnText('UPDATE')
  }

  function handleAuthorDelete(id: UUID) {
    dispatch(deleteAuthor(id))
    toast.success('Successfully Deleted!')
  }

  function handleAuthorAdd(author: Author) {
    setAuthorName(author.authorName)
    setEmail(author.email)
    setPhone(author.phone)
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
      <div className="flex flex-col gap-9 py-10 items-center justify-around">
        {/* Author form */}
        <section className="w-screen flex flex-col gap-10 justify-between">
          {/* Author Table  */}
          <h2 className=" text-3xl ml-10 pb-2">Authors</h2>
          <div className="relative mx-10 overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-yellow-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {author.map((author) => {
                  return (
                    <tr
                      key={author.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="pl-3">
                          <div className="text-base font-semibold">{author.authorName}</div>
                        </div>
                      </th>
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
                            handleAuthorUpdate(author)
                            setAuthorModalTable(!authorModalTable)
                          }}>
                          Edit
                        </button>
                        <button
                          className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleAuthorDelete(author.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
                <tr className="bg-gray-100">
                  <td className="px-6 py-4">
                    <button
                      className=" font-medium text-lg flex items-center justify-around w-38 text-green-400 dark:text-blue-500 hover:text-yellow-400"
                      onClick={() => {
                        handleAuthorAdd(authorItem)
                        setAuthorModalTable(!authorModalTable)
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>{' '}
                      add new author
                    </button>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          {authorModalTable ? (
            <form
              className="border-2 border-gray-400 flex flex-col gap-2 items-center absolute rounded-lg bg-gray-700 right-0 left-0 m-auto top-0 h-76 w-96 shadow-full"
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
              <AuthorTable
                setAuthorModalTable={setAuthorModalTable}
                authorModalTable={authorModalTable}
                setAuthorName={setAuthorName}
                authorName={authorName}
                authorBtnText={authorBtnText}
                setAuthorBtnText={setAuthorBtnText}
                setPhone={setPhone}
                phone={phone}
                setEmail={setEmail}
                email={email}
              />
            </form>
          ) : (
            <></>
          )}
        </section>
      </div>
    </>
  )
}

export default AdminAuthor
