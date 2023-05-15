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
      className=" w-1/4 min-w-max border border-white bg-slate-700 p-7 rounded-2xl"
      onSubmit={(e) => {
        e.preventDefault()
        e.nativeEvent.submitter.name === 'signIn' ? handleSignIn(e) : handleSignUp(e)
      }}
      method="post">
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-white dark:text-white">
          Your email
        </label>
        <input
          type="username"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={usernameText}
          onChange={(e) => setUsernameText(e.target.value)}
          placeholder="Enter Username"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-white dark:text-white">
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={passwordText}
          onChange={(e) => setPasswordText(e.target.value)}
          placeholder="Enter password"
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <label className="relative inline-flex items-center mb-4 cursor-pointer">
          <input type="checkbox" className="sr-only peer" onChange={() => setRoles(Role.ADMIN)} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">Admin</span>
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          name="signUp"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          SignUp
        </button>
        <button
          type="submit"
          name="signIn"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          SignIn
        </button>
      </div>
    </form>
  )
}

export default LoginForm
