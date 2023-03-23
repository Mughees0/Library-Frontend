import React from 'react'
import Nav from '../nav/Nav'

const ReturnBook = () => {
  return (
    <div
      id="returnBook"
      className="container flex flex-col items-center bg-yellow-300 w-screen justify-evenly my-5">
      <h2 className="underline text-2xl py-2">Return a borrowed Book</h2>
      <p>please put the book&apos;s ISBN number</p>
      <form
        action=""
        className="container flex flex-col justify-around items-center bg-slate-500 h-36">
        <label htmlFor="bookTitle">ISBN</label>
        <input type="text" className="form-input rounded-full" id="bookTitle" />
        <button className="bg-sky-500 hover:bg-sky-700 border-double rounded-full px-4 py-1 ">
          Return
        </button>
      </form>
    </div>
  )
}

export default ReturnBook
