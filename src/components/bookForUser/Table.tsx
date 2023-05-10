import { ToastContainer } from 'react-toastify'
import { UserBookTableProps } from '../../types'
import { useNavigate } from 'react-router-dom'

const BookTable = ({
  Books,
  token,
  ourToken,
  cover,
  handleBorrow,
  handleReturn
}: UserBookTableProps) => {
  const navigate = useNavigate()

  return (
    <section className=" bg-gray-700 text-white w-4/6 py-5 my-12 mx-12 flex flex-col items-center rounded-lg">
      <table className="w-4/5 ">
        <thead className="text-3xl underline text-black">
          <tr className="">
            {/* <td>
                  <h2>Books</h2>
                </td> */}
          </tr>
        </thead>
        <tbody className=" my-2 flex flex-col py-2">
          {Books.map((book) => {
            return (
              <tr
                onClick={() => navigate(`/book/${book.id}`)}
                className=" border-gray-400 border-2 p-5 rounded-md my-2 flex flex-wrap  gap-3 justify-center lg:justify-between hover:bg-gray-900 hover:shadow-2xl hover:transition-all lg:flex-nowrap"
                key={book.id}>
                <td className=" w-40">
                  <img src={book.cover} alt="Book Cover" />
                </td>
                <td className="gap-1 flex flex-col  items-start flex-wrap md:items-start lg:w-4/5 ">
                  <h2 className="text-3xl font-bookHead">{book.title}</h2>
                  <p className="font-nav pt-3">{book.description}</p>
                  <p className="pb-4 font-bookDesc">{book.publishedDate}</p>
                  <p className=" text-left pb-2 font-bookDesc text-gray-300">
                    {book.category.name}
                  </p>
                  {/* {token && ourToken ? (
                    <>
                      <div>
                        {book. ? (
                          <p className="text-custom-orange font-medium font-bookDesc">
                            Not Available, Return Date: {book.returnDate}
                          </p>
                        ) : (
                          <>
                            <button
                              onClick={() => handleBorrow(book)}
                              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-6">
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
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
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
                  )} */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default BookTable
