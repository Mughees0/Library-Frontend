import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchAuthor } from "../redux/slices/authorSlice";
import {
  addBook,
  deleteBook,
  fetchBooks,
  updateBook,
} from "../redux/slices/bookSlice";
import { fetchUser } from "../redux/slices/userSlice";
import { AppDispatch, RootState } from "../store";
import { Book } from "../types";

const Admin = () => {
  const Books = useSelector((state: RootState) => state.bookData.data);
  const user = useSelector((state: RootState) => state.userData.data);
  const author = useSelector((state: RootState) => state.authorData.data);
  const dispatch = useDispatch<AppDispatch>();
  const [id, setId] = useState(0);
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [borrowed, setBorrowed] = useState("false");
  const [borrowerId, setBorrowerId] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [btnText, setBtnText] = useState("Submit");

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthor());
    dispatch(fetchUser());
  }, []);

  const borrow = borrowed === "false" ? false : true;

  console.log(borrow);

  const bookInput: Book = {
    id: id,
    ISBN: isbn,
    title: title,
    description: description,
    author: bookAuthor,
    publisher: publisher,
    borrowed: borrow,
    borrowerId: borrowerId,
    publishedDate: publishedDate,
    borrowDate: borrowDate,
    returnDate: returnDate,
  };

  function handleUpdate(object: Book): void {
    setId(object.id);
    setIsbn(object.ISBN);
    setTitle(object.title);
    setDescription(object.description);
    setBookAuthor(object.author);
    setPublisher(object.publisher);
    setBorrowed("true");
    setBorrowerId(object.borrowerId);
    setPublishedDate(object.publishedDate);
    setBorrowDate(object.borrowDate);
    setReturnDate(object.returnDate);
    setBtnText("UPDATE");
  }

  function handleDelete(id: number): void {
    dispatch(deleteBook(id));
    location.reload();
  }

  function handleAdd(object: Book): void {
    setIsbn(object.ISBN);
    setTitle(object.title);
    setDescription(object.description);
    setBookAuthor(object.author);
    setPublisher(object.publisher);
    setBorrowed("true");
    setBorrowerId(object.borrowerId);
    setPublishedDate(object.publishedDate);
    setBorrowDate(object.borrowDate);
    setReturnDate(object.returnDate);
    setBtnText("ADD");
  }

  function handleSubmit(): void {
    if (btnText === "ADD") {
      dispatch(addBook(bookInput));
    } else if (btnText === "UPDATE") {
      dispatch(updateBook(bookInput));
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-9 items-center justify-between">
        <section className="  bg-green-200 w-screen flex justify-between">
          <form
            onSubmit={() => handleSubmit()}
            className="flex flex-col gap-5 items-start"
          >
            <table>
              <thead>
                <tr>
                  <th>Book Form</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ISBN</td>
                  <td>
                    <input
                      onChange={(e) => setIsbn(e.target.value)}
                      value={isbn}
                      id="isbn"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      id="title"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <input
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      id="discription"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>
                    <input
                      onChange={(e) => setBookAuthor(e.target.value)}
                      value={bookAuthor}
                      id="author"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>
                    {" "}
                    <input
                      onChange={(e) => setPublisher(e.target.value)}
                      value={publisher}
                      id="publisher"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Borrowed</td>
                  <td>
                    <select
                      id="borrowed"
                      value={borrowed}
                      onChange={(e) => setBorrowed(e.target.value)}
                    >
                      <option disabled value="">
                        -----------Select------------
                      </option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Borrower Id</td>
                  <td>
                    <input
                      onChange={(e) => setBorrowerId(e.target.value)}
                      value={borrowerId}
                      id="borrowerId"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Published Date</td>
                  <td>
                    <input
                      onChange={(e) => setPublishedDate(e.target.value)}
                      value={publishedDate}
                      id="publishedDate"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Borrow Date</td>
                  <td>
                    <input
                      onChange={(e) => setBorrowDate(e.target.value)}
                      value={borrowDate}
                      id="borrowDate"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Return Date</td>
                  <td>
                    <input
                      onChange={(e) => setReturnDate(e.target.value)}
                      value={returnDate}
                      id="returnDate"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="rounded-full bg-green-500 px-4"
                      type="submit"
                      value={btnText}
                      onChange={(e) => setBtnText(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {/* table to display items */}
          <table className="outline  ">
            <thead>
              <tr className="flex justify-between items-center">
                <td className="text-3xl">Books</td>
                <td>
                  <button
                    className="rounded-full bg-green-500 px-4"
                    onClick={() => handleAdd(bookInput)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              {Books.map((book) => {
                return (
                  <tr
                    className="outline py-2 flex flex-col px-9  items-start"
                    key={book.id}
                  >
                    <td className="text-2xl text-black outline">
                      {book.title}
                    </td>
                    <td>{book.author}</td>
                    <td>{book.publishedDate}</td>
                    <td>{book.description}</td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => handleUpdate(book)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded-full bg-green-500 px-4"
                        onClick={() => handleAdd(book)}
                      >
                        Add to feild
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        {/* <section className=" bg-green-200 w-screen">
        <table className="outline ">
          <thead>
            <tr>
              <td className="text-3xl">Authors</td>
            </tr>
          </thead>
          <tbody>
            {author.map((author) => {
              return (
                <tr
                  className="outline py-2 flex flex-col px-9  items-start"
                  key={author.id}
                >
                  <td className="text-2xl text-black outline">{author.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className=" bg-green-200 w-screen">
        <table className="outline ">
          <thead>
            <tr>
              <td className="text-3xl">User</td>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => {
              return (
                <tr
                  className="outline py-2 flex flex-col px-9  items-start"
                  key={user.id}
                >
                  <td className="text-2xl text-black outline">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.email_verified}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section> */}
      </div>
    </>
  );
};

export default Admin;
