import { Button, Form } from "react-bootstrap"
import FormContainer from "../../components/FormContainer"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdLoginMutation } from "../../slices/adminApiSlice";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import { setAdminCredentials } from "../../slices/adminAuthSlice";
import Loader from "../../components/Loader";


const AdminLogin = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin,{isLoading}] = useAdLoginMutation();
  const { adminInfo } =useSelector((state:RootState) =>state.admin)


  const submitHandler = async(e:React.FormEvent) =>{
    e.preventDefault();
    try{
        const res = await adminLogin({email,password}).unwrap();

        console.log('response of adminLogin from node.js:',res);
        
        dispatch(setAdminCredentials({...res}));
        navigate('/admin/dashboard');
    }catch(err:unknown){
        const errorMessage = (err as { data?:{ message?:string } }).data?.message || (err as {error?:string}).error;
        toast.error(errorMessage);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <FormContainer>
      <Form onSubmit={submitHandler} className="p-5 bg-white rounded shadow-lg" >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check to remember" />
      </Form.Group>

      {isLoading && <Loader/>}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </FormContainer> 
    </div>
  )
}

export default AdminLogin
