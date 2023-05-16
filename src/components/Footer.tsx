import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    // <footer className="h-10 w-screen flex justify-between m-auto items-center bg-black text-white px-5 ">
    //   <span>&copy; Mughees</span>
    //   <ul className="flex justify-around w-36">
    //     <li>
    //       <a href="https://github.com/Mughees0">Github</a>
    //     </li>
    //     <li>
    //       <a href="https://www.linkedin.com/in/abdul-mughees-/">Linkedin</a>
    //     </li>
    //   </ul>
    // </footer>

    <footer className="shadow  bg-gray-800 fixed h-10  left-0 bottom-0 w-screen dark:bg-gray-800">
      <div className=" text-gray-200 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center pb-2 dark:text-gray-400">
          © 2023{' '}
          <a href="/" className="hover:underline">
            Mr. Books™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-sm font-medium  dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://github.com/Mughees0" className="mr-4 hover:underline md:mr-6 ">
              <FaGithub className="text-lg mt-3" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abdul-mughees-/"
              className="mr-4 hover:underline md:mr-6">
              <FaLinkedin className=" md:ml-3 mt-3 mr-3 text-lg bg-white text-blue-500" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
