import React from 'react'

const Footer = () => {
  return (
    <footer className="h-10 w-screen flex justify-between m-auto items-center bg-black text-white px-5 ">
      <span>&copy; Mughees</span>
      <ul className="flex justify-around w-36">
        <li>
          <a href="https://github.com/Mughees0">Github</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/abdul-mughees-/">Linkedin</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
