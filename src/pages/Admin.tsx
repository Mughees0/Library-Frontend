import Navbar from '../components/Navbar'
import AdminAuthor from '../components/authorForAdmin/AdminAuthors'
import AdminBooks from '../components/bookForAdmin/AdminBooks'

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
