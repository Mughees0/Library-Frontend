import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Nav'
import AdminAuthor from '../components/authorForAdmin/Index'
import AdminBooks from '../components/bookForAdmin/Index'

const Admin = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button
        onClick={() => navigate('/admin/copies')}
        className=" bg-red-500 px-5 py-2 rounded-r-full">
        MANAGE BOOK COPIES
      </button>
      <AdminBooks />
      <AdminAuthor />
    </div>
  )
}

export default Admin
