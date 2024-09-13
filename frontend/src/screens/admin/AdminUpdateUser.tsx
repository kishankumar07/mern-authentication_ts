import { Button, Form } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useAdupdateUserMutation, useGetUserInfoQuery } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

const AdminUpdateUser = () => {

    const navigate = useNavigate()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

     const {id} = useParams()
    //  console.log('id got at frontend:',id)
     const {data,isLoading,error} = useGetUserInfoQuery(id);

useEffect(()=>{
    if(data && data.userInfo){
        setName(data.userInfo.name);
        setEmail(data.userInfo.email);
    }
},[data])

 

    const [updateUser] = useAdupdateUserMutation()

    const handleFormSubmit =async(e:FormEvent) =>{
        e.preventDefault();
        try{
            await updateUser({id,name,email}).unwrap();
        
            navigate('/admin/dashboard')
        }catch(err){
            const errorMessage = (err as {data?:{message?:string,error?:string}}).data?.message || (err as {error?:string}).error;
            toast.error(errorMessage)
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching user data.</p>;


  return (
    <div>
      <FormContainer>
        <Form onSubmit={handleFormSubmit}>

        <Form.Group className="mb-3" controlId="userId">
            
            <Form.Control
              type="hidden"
              value={id}
              
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="checkbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AdminUpdateUser;
