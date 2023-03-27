import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import useGoogleData from '../hooks/useGoogleData'
import useGoogleLogin from '../hooks/useGoogleLogin'

const Login = () => {
  const google = useGoogleLogin()
  const [user, token] = useGoogleData()
  const navigate = useNavigate()

  return (
    <>
      {!token ? (
        <div className="bg-yellow flex justify-center items-center h-screen w-screen">
          <button id="signIn"></button>
        </div>
      ) : (
        <>{navigate('/')}</>
      )}
      <Footer />
    </>
  )
}

export default Login
