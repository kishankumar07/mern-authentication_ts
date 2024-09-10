import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'
import { RootState } from '../store';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login,{isLoading}] = useLoginMutation();
  const { userInfo } = useSelector((state:RootState) => state.auth);

  useEffect(()=>{
    if(userInfo){
        navigate('/');
    }
  },[navigate,userInfo])

  // The event here is typed as React.FormEvent as it happens as a part of form submission.
  const submitHandler = async (e:React.FormEvent) => {
    e.preventDefault();
    try{
        const res = await login({email,password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/');
    }  catch (err: unknown) {    
        const errorMessage = (err as { data?: { message?: string; error?: string }}).data?.message || (err as { error?: string }).error;
       
        toast.error(errorMessage);
      }
    
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group className='my-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
          Sign In
        </Button>
      </Form>



    {isLoading &&  <Loader/>}


      <Row className='py-3'>
        <Col>
          New Customer? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;