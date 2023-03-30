import { IoIosArrowRoundBack } from 'react-icons/io'
import { BookTableProps } from '../../types'

const BookTable = ({
  setModalTable,
  modalTable,
  setIsbn,
  isbn,
  setTitle,
  title,
  setDescription,
  description,
  setBookAuthor,
  bookAuthor,
  setPublisher,
  publisher,
  setBorrowed,
  borrowed,
  setBorrowerId,
  borrowerId,
  setPublishedDate,
  publishedDate,
  setBorrowDate,
  borrowDate,
  setReturnDate,
  returnDate,
  setBtnText,
  btnText
}: BookTableProps) => {
  return (
    <div>
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
              <select id="borrowed" value={borrowed} onChange={(e) => setBorrowed(e.target.value)}>
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
                type="date"
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
                type="date"
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
                type="date"
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
    </div>
  )
}

export default BookTable
