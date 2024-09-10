import { Button, Col, Form, Row } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const RegisterScreen = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register,{isLoading}] = useRegisterMutation();

    const {userInfo} = useSelector((state:RootState) =>state.auth)

    const submitHandler= async(e:React.FormEvent)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password do not match');
        }else{
            try{
                const res = await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/')
            }catch(err){
                const errorMessage = (err as { data?: { message?: string; error?: string }}).data?.message || (err as { error?: string }).error;
       
                toast.error(errorMessage);
            }
           
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[userInfo,navigate])

  return (
    <FormContainer>
        <h1>Register</h1>
        
        <Form onSubmit={(e)=>{submitHandler(e)}}>

            <Form.Group className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}
                ></Form.Control>
            </Form.Group>
            {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3">
            Register
        </Button>
        </Form>
        
    <Row className='py-3'>
        <Col>
            Already have an account?  <Link to={'/login'}>Login</Link>
        </Col>
    </Row>

    </FormContainer>
  )
}

export default RegisterScreen
