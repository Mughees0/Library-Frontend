import React from 'react'

const Card = () => {
  return (
    <div
      role="card"
      className="container flex flex-col bg-yellow-500 items-center justify-evenly h-52 w-40 px-5">
      <h2>BOOK</h2>
      <p>Description for you my guys</p>
      <button>BORROW</button>
    </div>
  )
}

export default Card
