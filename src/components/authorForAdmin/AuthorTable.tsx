import { IoIosArrowRoundBack } from 'react-icons/io'
import { AuthorTableProps } from '../../types'

const AuthorTable = ({
  setAuthorModalTable,
  authorModalTable,
  setAuthorName,
  authorName,
  authorBtnText,
  setAuthorBtnText
}: AuthorTableProps) => {
  return (
    <div>
      <table className="flex justify-center gap-2 items-center flex-col pb-4">
        <thead>
          <tr>
            <td className="text-sm flex w-80">
              <button
                className="flex hover:bg-yellow-200 hover:shadow-2xl hover:transition-all items-center gap-1"
                onClick={() => setAuthorModalTable(!authorModalTable)}>
                <IoIosArrowRoundBack /> Back
              </button>
            </td>
          </tr>
          <tr>
            <th>Author Form</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-3 ">
          <tr className="flex justify-between w-72">
            <td>Author Name</td>
            <td>
              <input
                onChange={(e) => setAuthorName(e.target.value)}
                value={authorName}
                id="authorName"
                type="text"
                required
              />
            </td>
          </tr>
          <tr className="flex justify-center">
            <td>
              <input
                className="rounded-full bg-green-500 px-4"
                type="submit"
                value={authorBtnText}
                onChange={(e) => setAuthorBtnText(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AuthorTable
