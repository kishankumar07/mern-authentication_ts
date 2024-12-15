import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import { ToastContainer } from "react-toastify"

const AdminLayout = () => {
  return (
    <div style={{backgroundColor:'#000000',minHeight:'100vh',color:'#fff'}}>
      <ToastContainer/>
        <AdminHeader/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout
