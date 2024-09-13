import { Button, Form } from "react-bootstrap"
import FormContainer from "../../components/FormContainer"
import { FormEvent, useState } from "react"
import { useCreateUserMutation } from "../../slices/adminApiSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

const AdminCreateUser = () => {

    const navigate = useNavigate()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [createUser,{loading}] = useCreateUserMutation()

    const handleFormSubmit = async(e:FormEvent) =>{
        e.preventDefault()
        try{
             await createUser({name,email,password}).unwrap();
            navigate('/admin/dashboard');
        }catch(err){
            const errorMessage = (err as {data?:{message?:string,error?:string}}).data?.message || (err as {error?:string}).error;
            toast.error(errorMessage)
        }
       
    }


  return (
    <FormContainer>

     <Form onSubmit={handleFormSubmit}>
     <Form.Group className="mb-3" controlId="Name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
     
    </Form.Group>
    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="confirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="checkbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    {loading && <Loader/>}
    <Button variant="primary" type="submit">
      Submit
    </Button>
     </Form>
    </FormContainer>
  )
}

export default AdminCreateUser
