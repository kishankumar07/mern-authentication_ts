import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdLogoutMutation } from '../../slices/adminApiSlice';
import { adminLogout } from '../../slices/adminAuthSlice';

function AdminHeader() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [adminLogoutApiCall] = useAdLogoutMutation()

  const logoutHandler =async() =>{

    try{
        await adminLogoutApiCall({}).unwrap();
        dispatch(adminLogout());
        navigate('/admin/login')
    }catch(err){
      const errorMessage = (err as {data?:{message?:string;error?:string}}).data?.message || (err as {error?:string}).error
      toast.error(errorMessage)
    }
  }




  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand style={{color:'#fff'}}>MERN Auth</Navbar.Brand>

          <NavDropdown title="Hello admin" id="basic-nav-dropdown">
            
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{logoutHandler()}}>
              Logout
              </NavDropdown.Item>
            </NavDropdown>
           
         
      </Container>
    </Navbar>
  );
}

export default AdminHeader;