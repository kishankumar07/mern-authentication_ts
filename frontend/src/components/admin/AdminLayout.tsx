import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"

const AdminLayout = () => {
  return (
    <div style={{backgroundColor:'#000000',minHeight:'100vh',color:'#fff'}}>
        <AdminHeader/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout
