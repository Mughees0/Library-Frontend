import { useDispatch } from 'react-redux'
import { filterBookByAuthor } from '../../redux/slices/bookSlice'
import { AppDispatch } from '../../store'
import { UserBookFilters } from '../../types'

const BookFilters = ({ Books, Authors, handleAuthorSearch, setFilterAuthor }: UserBookFilters) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <section className=" h-full w-1/6 mt-12 py-12 flex flex-col">
        <div className="flex flex-col items-center w-44">
          <label htmlFor="small-input" className="block my-2 text-lg  font-medium"></label>
          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            data-dropdown-placement="bottom"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            Filter with author{' '}
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div
            id="dropdownSearch"
            className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search user"
                  onKeyUp={handleAuthorSearch}
                  onChange={(e) => setFilterAuthor(e.target.value)}
                />
              </div>
            </div>
            <ul
              className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton">
              {Books.map((book) => {
                return (
                  <li key={book.id}>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-15"
                        type="checkbox"
                        value={''}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="checkbox-item-15"
                        onClick={() => dispatch(filterBookByAuthor(book.author))}
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                        {book.author}
                      </label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div>
          {' '}
          <ul className="pt-5 flex flex-col items-start w-46">
            <li className="text-lg py-3 font-bookHead">List of authors:</li>
            {Authors.map((author) => (
              <li className="pb-1 font-bookDesc" key={author.id}>
                {author.name}
              </li>
            ))}
          </ul>
          <ul className="pt-5 flex flex-col items-start w-46">
            <li className="text-lg py-3 font-bookHead">Subjects:</li>
            {Authors.map((author) => (
              <li className="pb-1 font-bookDesc" key={author.id}>
                {author.name}
              </li>
            ))}
          </ul>
          <ul className="pt-5 flex flex-col items-start w-46">
            <li className="text-lg py-3 font-bookHead">Resource Type:</li>
            {Authors.map((author) => (
              <li className="pb-1 font-bookDesc" key={author.id}>
                {author.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default BookFilters
