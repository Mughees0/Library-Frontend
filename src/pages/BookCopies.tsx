import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { addCopies, fetchBooks } from '../redux/slices/bookSlice'
import { UUID } from 'crypto'

function BookCopies() {
  const [quantity, setQuantity] = useState<number>()
  const Books = useSelector((state: RootState) => state.bookData.books)
  const { bookCopies } = useSelector((state: RootState) => state.bookData)
  const dispatch = useDispatch<AppDispatch>()
  const [status, setStatus] = useState<boolean>()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  function handleAddCopies(id: UUID) {
    dispatch(addCopies({ bookId: id, quantity: quantity, status: status }))
  }

  return (
    <main className=" h-screen">
      <section>
        <table>
          <thead>
            <tr>
              <td>Books</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  name="quantity"
                  id="copyQuantity"
                  max={10}
                  placeholder="10"
                  min={0}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-12 h-6 p-0 text-black"
                />
              </td>
            </tr>
            {Books.map((book) => (
              <>
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>
                    Add Copies:
                    <span className="flex w-52 justify-around">
                      <span className="text-md w-20 justify-center flex gap-1 items-center">
                        <input type="radio" name="role" onClick={() => setStatus(true)} />
                        Available
                      </span>

                      <span className="text-md w-20 justify-center flex gap-1 items-center">
                        <input type="radio" name="role" onClick={() => setStatus(false)} />
                        Borrowed
                      </span>
                    </span>
                    <button
                      onClick={() => handleAddCopies(book.id)}
                      id="copyQuantity"
                      className=" bg-green-400 px-4 rounded-full mx-2">
                      ADD
                    </button>
                  </td>
                </tr>
              </>
            ))}
            {bookCopies.map((copy) => (
              <>
                <tr className=" flex flex-col mb-5">
                  <td>{copy.book.title}</td>
                  <td>{copy.id}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default BookCopies
