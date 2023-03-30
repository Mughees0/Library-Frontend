import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addAuthor, deleteAuthor, fetchAuthor, updateAuthor } from '../../redux/slices/authorSlice'
import { Author } from '../../types'
import { toast, ToastContainer } from 'react-toastify'
import AuthorTable from './Form'

const AdminAuthor = () => {
  const author = useSelector((state: RootState) => state.authorData.data)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAuthor())
  }, [])

  // Authors
  const [authorId, setAuthorId] = useState(0)
  const [authorName, setAuthorName] = useState('')
  const [authorBtnText, setAuthorBtnText] = useState('Submit')
  const [authorModalTable, setAuthorModalTable] = useState(false)

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
      <div className="flex flex-col gap-9 min-h-screen items-center justify-around">
        <section className="outline  w-screen flex flex-col gap-20 justify-between"></section>
        {/* Author form */}
        <section className="  w-screen flex flex-col justify-between">
          {authorModalTable ? (
            <form
              className="border-2 border-gray-400 flex flex-col gap-2 items-center absolute rounded-lg bg-gray-700 right-0 left-0 m-auto h-44 w-96 shadow-full"
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
              />
            </form>
          ) : (
            <></>
          )}
          {/* Author Table  */}
          <table className=" text-gray-300 ">
            <thead>
              <tr className="flex flex-col justify-center items-center flex-wrap">
                <th className="text-2xl py-5 text-white">Authors</th>
                <td>
                  <button
                    className="rounded-full text-yellow-300 hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
                    className="rounded-lg border-2 border-gray-600 hover:bg-gray-700 hover:shadow-2xl hover:transition-all flex flex-col px-9 gap-1 items-start py-4 my-3"
                    key={author.id}>
                    <td className="text-2xl text-white ">{author.name}</td>
                    <td>
                      <button
                        className="rounded-full text-yellow-200 hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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
                        className="rounded-full text-red-400 hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
                        onClick={() => handleAuthorDelete(author.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full hover:bg-green-700 hover:shadow-2xl hover:transition-all bg-green-500 px-4"
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

export default AdminAuthor
