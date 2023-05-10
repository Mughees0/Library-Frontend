import { UUID } from 'crypto'

export type Decoded = {
  exp: number
  iat: number
  role: string
  sub: string
  user_id: string
  username: string
}
export type BookRes = {
  id: UUID
  title: string
  isbn: string
  description: string
  author: {
    id: UUID
    authorName: string
    email: string
    phone: string
  }
  category: {
    id: UUID
    name: string
  }
  publishedDate: string
  publisher: string
  cover: string
}
export type BookReq = {
  title: string
  isbn: string
  description: string
  authorId: UUID
  categoryId: UUID
  publishedDate: string
  publisher: string
  cover: string
}

export type BookId = {
  id: number
}

export type BookState = {
  isLoading: boolean
  error: null | string
  msg: string
  data: BookRes[]
}

export type Borrow = {
  ISBN: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserReq = {
  username: string
  password: string
  role: Role
}
export type UserRes = {
  username: string
  id: string
  role: Role
}
export type UserState = {
  isLoading: boolean
  error: null | string
  token: string
  msg: string
  data: UserRes
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
export interface LoginFormProps {
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => void
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void
  usernameText: string
  setUsernameText: React.Dispatch<React.SetStateAction<string>>
  passwordText: string
  setPasswordText: React.Dispatch<React.SetStateAction<string>>
  setRoles: React.Dispatch<React.SetStateAction<Role>>
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
  setPublisher: React.Dispatch<React.SetStateAction<string>>
  publisher: string
  setCategoryId: React.Dispatch<React.SetStateAction<UUID>>
  categoryId: UUID
  setPublishedDate: React.Dispatch<React.SetStateAction<string>>
  publishedDate: string
  setBtnText: React.Dispatch<React.SetStateAction<string>>
  btnText: string
  setAuthorId: React.Dispatch<React.SetStateAction<UUID>>
  authorId: UUID
  setCover: React.Dispatch<React.SetStateAction<string>>
  cover: string
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
  Books: BookRes[]
  token: string
  ourToken: string
  cover: string
  handleBorrow(book: BookRes): void
  handleReturn(book: BookRes): void
}
export type UserBookFilters = {
  Books: BookRes[]
  Authors: Author[]
  handleAuthorSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setFilterAuthor: React.Dispatch<React.SetStateAction<string>>
}
