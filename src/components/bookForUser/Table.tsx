import { ToastContainer } from 'react-toastify'
import { UserBookTableProps } from '../../types'
import { Link, useNavigate } from 'react-router-dom'

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
        <thead>
          <tr className="text-3xl underline text-black">Books</tr>
        </thead>
        <tbody className=" my-2 flex flex-col py-2">
          {Books.map((book) => {
            return (
              <tr
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
                  <Link
                    className=" flex items-center text-green-500 hover:text-yellow-300 text-sm"
                    to={`/book/${book.id}`}>
                    {'More Details'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
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
