import Navbar from '../components/Nav'
import AdminAuthor from '../components/authorForAdmin/Index'
import AdminBooks from '../components/bookForAdmin/Index'

const Admin = () => {
  return (
    <div>
      <Navbar />
      <AdminBooks />
      <AdminAuthor />
    </div>
  )
}

export default Admin
