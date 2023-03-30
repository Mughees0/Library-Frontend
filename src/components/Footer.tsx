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

    <footer className=" rounded-lg shadow m-4 border-2 border-gray-400 dark:bg-gray-800">
      <div className="w-full mx-auto text-gray-200 max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="/" className="hover:underline">
            Mr. Books™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium  dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://github.com/Mughees0" className="mr-4 hover:underline md:mr-6 ">
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abdul-mughees-/"
              className="mr-4 hover:underline md:mr-6">
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
