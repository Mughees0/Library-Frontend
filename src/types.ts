export type Book = {
  id: number;
  ISBN: string;
  title: string;
  description: string;
  author: string;
  publisher: string;
  borrowed: boolean;
  borrowerId: string;
  publishedDate: string;
  borrowDate: string;
  returnDate: string;
};

export type BookId = {
  id: number;
};

export type BookState = {
  isLoading: boolean;
  error: null | string;
  msg: string;
  data: Book[];
};

export type Borrow = {
  ISBN: string;
};
export type User = {
  id: number;
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};
export type UserState = {
  isLoading: boolean;
  error: null | string;
  msg: string;
  data: User[];
};

export type AuthorState = {
  isLoading: boolean;
  error: null | string;
  msg: string;
  data: Author[];
};

export type Author = {
  id: number;
  name: string;
};

export interface Response {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}
