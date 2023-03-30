export type Book = {
  id: number
  ISBN: string
  title: string
  description: string
  author: string
  publisher: string
  borrowed: boolean
  borrowerId: string
  publishedDate: string
  borrowDate: string
  returnDate: string
}

export type BookId = {
  id: number
}

export type BookState = {
  isLoading: boolean
  error: null | string
  msg: string
  data: Book[]
}

export type Borrow = {
  ISBN: string
}
export type User = {
  id: number
  iss: string
  nbf: number
  aud: string
  sub: string
  email: string
  email_verified: boolean
  azp: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
  jti: string
}
export type UserState = {
  isLoading: boolean
  error: null | string
  msg: string
  data: User[]
}

export type AuthorState = {
  isLoading: boolean
  error: null | string
  msg: string
  data: Author[]
}

export type Author = {
  id: number
  name: string
}

export interface Response {
  clientId: string
  client_id: string
  credential: string
  select_by: string
}
export type BookTableProps = {
  setModalTable: React.Dispatch<React.SetStateAction<boolean>>
  modalTable: boolean
  setIsbn: React.Dispatch<React.SetStateAction<string>>
  isbn: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  title: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  description: string
  setBookAuthor: React.Dispatch<React.SetStateAction<string>>
  bookAuthor: string
  setPublisher: React.Dispatch<React.SetStateAction<string>>
  publisher: string
  setBorrowed: React.Dispatch<React.SetStateAction<string>>
  borrowed: string
  setBorrowerId: React.Dispatch<React.SetStateAction<string>>
  borrowerId: string
  setPublishedDate: React.Dispatch<React.SetStateAction<string>>
  publishedDate: string
  setBorrowDate: React.Dispatch<React.SetStateAction<string>>
  borrowDate: string
  setReturnDate: React.Dispatch<React.SetStateAction<string>>
  returnDate: string
  setBtnText: React.Dispatch<React.SetStateAction<string>>
  btnText: string
}

export type AuthorTableProps = {
  setAuthorModalTable: React.Dispatch<React.SetStateAction<boolean>>
  authorModalTable: boolean
  setAuthorName: React.Dispatch<React.SetStateAction<string>>
  authorName: string
  authorBtnText: string
  setAuthorBtnText: React.Dispatch<React.SetStateAction<string>>
}
export type HeaderProps = {
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setFilterText: React.Dispatch<React.SetStateAction<string>>
}
export type UserBookTableProps = {
  Books: Book[]
  token: string
  cover: string
  handleBorrow(book: Book): void
  handleReturn(book: Book): void
}
export type UserBookFilters = {
  Books: Book[]
  Authors: Author[]
  handleAuthorSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setFilterAuthor: React.Dispatch<React.SetStateAction<string>>
}
