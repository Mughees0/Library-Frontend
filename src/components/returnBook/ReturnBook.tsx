import React from 'react'
import Nav from '../nav/Nav'

const ReturnBook = () => {
  return (
    <div id="returnPage">
      <form action="" className="container flex flex-col items-center bg-slate-500 h-36">
        <label htmlFor="bookTitle">Book Title</label>
        <input type="text" id="bookTitle" />
        <button className="btn border-double bg-yellow-300">Return</button>
      </form>
    </div>
  )
}

export default ReturnBook
