import React from 'react'
import { LoginFormProps, Role } from '../types'

function LoginForm({
  handleSignIn,
  handleSignUp,
  usernameText,
  setUsernameText,
  passwordText,
  setPasswordText,
  setRoles
}: LoginFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.nativeEvent.submitter.name === 'signIn' ? handleSignIn(e) : handleSignUp(e)
      }}
      method="post"
      className=" flex flex-col border border-red-500 p-4 gap-1 rounded-lg mb-4">
      <input
        type="text"
        name="username"
        id="username"
        className=" text-black"
        value={usernameText}
        onChange={(e) => setUsernameText(e.target.value)}
        placeholder="Enter Username"
      />
      <input
        type="password"
        name="password"
        id="password"
        className=" text-black"
        value={passwordText}
        onChange={(e) => setPasswordText(e.target.value)}
        placeholder="Enter password"
      />
      <span>
        <button
          type="submit"
          name="signUp"
          className=" border bg-yellow-400 px-4 py-1 m-4 rounded-lg">
          SignUp
        </button>
        <button
          type="submit"
          name="signIn"
          className=" border bg-green-400 px-4 py-1 m-4 rounded-lg">
          SignIn
        </button>
      </span>
      <span className="flex justify-around">
        <span className="text-md w-20 justify-center flex gap-1 items-center">
          <input type="radio" name="role" onClick={() => setRoles(Role.ADMIN)} />
          Admin
        </span>

        <span className="text-md w-20 justify-center flex gap-1 items-center">
          <input type="radio" name="role" onClick={() => setRoles(Role.USER)} />
          User
        </span>
      </span>
    </form>
  )
}

export default LoginForm
