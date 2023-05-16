import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import {
  addCategory,
  deleteCategory,
  fetchCategory,
  updateCategory
} from '../../redux/slices/categorySlice'
import { Category } from '../../types'
import { toast, ToastContainer } from 'react-toastify'
import { UUID } from 'crypto'
import CategoryTable from './Form'

const AdminCategory = () => {
  const { categories } = useSelector((state: RootState) => state.categoryData)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [categories])

  // categories
  const [categoryId, setCategoryId] = useState(0)
  const [name, setName] = useState('')
  const [categoryBtnText, setCategoryBtnText] = useState('Submit')
  const [categoryModalTable, setCategoryModalTable] = useState(false)

  const categoryItem: Category = {
    id: categoryId,
    name: name
  }

  function handleCategoryUpdate(category: Category) {
    setCategoryId(category.id)
    setName(category.name)
    setCategoryBtnText('UPDATE')
  }

  function handleCategoryDelete(id: UUID) {
    dispatch(deleteCategory(id))
    toast.success('Successfully Deleted!')
  }

  function handleCategoryAdd(category: Category) {
    setName(category.name)
    setCategoryBtnText('ADD')
  }

  function handleCategorySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (categoryBtnText === 'UPDATE') {
      dispatch(updateCategory(categoryItem))
      toast.success('Successfully Update!')
    } else if (categoryBtnText === 'ADD') {
      dispatch(addCategory(categoryItem))
      toast.success('Successfully Added!')
    } else {
      toast('Please select an option, Add or update')
    }
    setCategoryModalTable(!categoryModalTable)
  }

  return (
    <>
      <div className="flex flex-col gap-9 items-center justify-around">
        {/* category form */}
        <section className="  w-screen flex flex-col justify-between">
          {/* category Table  */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className=" text-3xl pb-2">Categories</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-20">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                {categories.map((category) => {
                  return (
                    <tr
                      key={category.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="pl-3">
                          <div className="text-base font-semibold">{category.name}</div>
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
                            handleCategoryUpdate(category)
                            setCategoryModalTable(!categoryModalTable)
                          }}>
                          Edit
                        </button>
                        <button
                          className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleCategoryDelete(category.id)}>
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
                        handleCategoryAdd(categoryItem)
                        setCategoryModalTable(!categoryModalTable)
                      }}>
                      Click here to add a new category
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {categoryModalTable ? (
            <form
              className="border-2 border-gray-400 flex flex-col gap-2 items-center absolute rounded-lg bg-gray-700 right-0 left-0 m-auto top-0 h-76 w-96 shadow-full"
              onSubmit={(e) => handleCategorySubmit(e)}>
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
              <CategoryTable
                setCategoryModalTable={setCategoryModalTable}
                categoryModalTable={categoryModalTable}
                setCategoryName={setName}
                categoryName={name}
                categoryBtnText={categoryBtnText}
                setCategoryBtnText={setCategoryBtnText}
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

export default AdminCategory
