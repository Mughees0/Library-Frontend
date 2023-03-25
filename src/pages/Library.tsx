// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import useGoogleData from "../hooks/useGoogleLogin";
// import {
//   addAuthor,
//   deleteAuthor,
//   fetchAuthor,
//   updateAuthor,
// } from "../redux/slices/authorSlice";
// import {
//   updateBook,
//   fetchBooks,
//   addBook,
//   deleteBook,
//   filterBookByName,
//   filterBookByAuthor,
// } from "../redux/slices/bookSlice";
// import { clearUser } from "../redux/slices/userSlice";
// import { RootState, AppDispatch } from "../store";
// import { Author, Book } from "../types";
// import lib from "../assets/lib.jpg";
// import { toast, ToastContainer } from "react-toastify";

// const Library = () => {
//   const [filterText, setFilterText] = useState("");
//   const [filterAuthor, setFilterAuthor] = useState("");
//   const Books = useSelector((state: RootState) => state.bookData.data);
//   const user = useSelector((state: RootState) => state.userData.data);
//   const author = useSelector((state: RootState) => state.authorData.data);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(fetchBooks());
//     toast(
//       "Please log in first to borrow or return a book!"
//     );
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={true}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <header className="outline bg-cover flex justify-center items-center bg-[url('/src/assets/lib.jpg')] h-52">
//         <label
//           htmlFor="default-search"
//           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//         >
//           Search
//         </label>
//         <div className="relative w-80 ">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <svg
//               aria-hidden="true"
//               className="w-5 h-5 text-gray-500 dark:text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               ></path>
//             </svg>
//           </div>
//           <input
//             type="search"
//             id="default-search"
//             className=" block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-purple-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Search for books"
//             required
//             onChange={(e) => setFilterText(e.target.value)}
//           />
//           <button
//             onClick={() => {
//               dispatch(filterBookByName(filterText));
//             }}
//             className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Search
//           </button>
//         </div>
//       </header>
//       <main className="flex items-start w-screen ">
//         <section className=" bg-yellow-800 w-4/5 h-screen flex flex-col items-center">
//           <table className="w-4/5 ">
//             <thead className="text-3xl underline  text-orange-300">
//               <tr className="">
//                 <td>Books</td>
//               </tr>
//             </thead>
//             <tbody className=" my-2 flex flex-col py-2 ">
//               {Books.map((book) => {
//                 return (
//                   <tr
//                     className="outline py-2 flex flex-col px-7  items-start"
//                     key={book.id}
//                   >
//                     <td className="text-2xl text-yellow-300">{book.title}</td>
//                     <td>{book.author}</td>
//                     <td>{book.publishedDate}</td>
//                     <td>{book.description}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </section>
//         <section className=" bg-gray-400 h-screen w-2/6 ">
//           <div className="flex flex-col items-center">
//             <label
//               htmlFor="small-input"
//               className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Filter with author
//             </label>
//             <input
//               type="text"
//               id="small-input"
//               onChange={(e) => setFilterAuthor(e.target.value)}
//               className="block w-2/5 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             />
//             <button onClick={() => dispatch(filterBookByAuthor(filterAuthor))}>
//               Search
//             </button>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Library;
