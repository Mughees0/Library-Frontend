import { IoIosArrowRoundBack } from 'react-icons/io'
import { BookTableProps } from '../../types'

const BookTable = ({
  setModalTable,
  modalTable,
  setAuthorId,
  authorId,
  setCategoryId,
  categoryId,
  setPublisher,
  publisher,
  setCover,
  cover,
  setIsbn,
  isbn,
  setTitle,
  title,
  setDescription,
  description,
  setPublishedDate,
  publishedDate,
  setBtnText,
  btnText
}: BookTableProps) => {
  return (
    <>
      <div className=" overflow-scroll rounded-xl bg-gray-600 w-full ">
        <table className="flex pt-5 justify-center gap-2  items-center flex-col pb-4">
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
            <tr className="flex justify-between w-80">
              <td>Book Cover</td>
              <td>
                <input
                  onChange={(e) => setCover(e.target.value)}
                  value={cover}
                  id="cover"
                  type="text"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  required
                />
              </td>
            </tr>
            <tr className="flex justify-between w-80">
              <td>ISBN</td>
              <td>
                <input
                  onChange={(e) => setIsbn(e.target.value)}
                  value={isbn}
                  id="isbn"
                  type="text"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  required
                />
              </td>
            </tr>
            <tr className="flex justify-between w-80">
              <td>Title</td>
              <td>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  id="title"
                  type="text"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  required
                />
              </td>
            </tr>
            <tr className="flex justify-between w-80">
              <td>Description</td>
              <td>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="description"
                  type="text"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  required
                />
              </td>
            </tr>
            <tr className="flex justify-between w-80">
              <td>AuthorId</td>
              <td>
                <input
                  onChange={(e) => setAuthorId(e.target.value)}
                  value={authorId}
                  id="authorId"
                  type="text"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  required
                />
              </td>
            </tr>
            <tr className="flex justify-between w-80">
              <td>Publisher</td>
              <td>
                {' '}
                <input
                  onChange={(e) => setPublisher(e.target.value)}
                  value={publisher}
                  id="publisher"
                  type="text"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  required
                />
              </td>
            </tr>
            {/* <tr className="flex justify-between w-80">
              <td>Borrowed</td>
              <td>
                <select
                  id="borrowed"
                  value={borrowed}
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  onChange={(e) => setBorrowed(e.target.value)}>
                  <option disabled value="">
                    -------Select--------
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </td>
            </tr> */}
            <tr className="flex justify-between w-80">
              <td>Category Id</td>
              <td>
                <input
                  onChange={(e) => setCategoryId(e.target.value)}
                  value={categoryId}
                  id="categoryId"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  type="text"
                />
              </td>
            </tr>
            {/* <tr className="flex justify-between w-80">
              <td>Publish Date</td>
              <td>
                <input
                  onChange={(e) => setPublishedDate(e.target.value)}
                  value={publishedDate}
                  id="publishedDate"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  type="date"
                  required
                />
              </td>
            </tr> */}
            {/* <tr className="flex justify-between w-80">
              <td>Borrow Date</td>
              <td>
                <input
                  onChange={(e) => setBorrowDate(e.target.value)}
                  value={borrowDate}
                  id="borrowDate"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  type="date"
                />
              </td>
            </tr> */}
            {/* <tr className="flex justify-between w-80">
              <td>Return Date</td>
              <td>
                <input
                  onChange={(e) => setReturnDate(e.target.value)}
                  value={returnDate}
                  id="returnDate"
                  className="text-black rounded-lg border-none hover:bg-gray-200 "
                  type="date"
                />
              </td>
            </tr> */}
            <tr className="flex justify-center w-80">
              <td>
                <input
                  className="rounded-full border-2 hover:border-1 hover:bg-yellow-200 hover:text-black  transition-all bg-green-500 px-4"
                  type="submit"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BookTable
