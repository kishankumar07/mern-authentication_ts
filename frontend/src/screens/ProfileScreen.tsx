import { useState, useEffect, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { RootState } from '../store';
import { useLogoutMutation, useUpdateUserMutation } from '../slices/userApiSlice';
import { logout, setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const {userInfo} = useSelector((state:RootState) => state.auth);
    const dispatch = useDispatch();
    const [updateProfile,{isLoading}] = useUpdateUserMutation();
    const [logoutApiCall]  = useLogoutMutation();

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.email,userInfo.name])


    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
        } else {
          try {
            const res = await updateProfile({
              _id: userInfo._id,
              name,
              email,
              password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile updated successfully');
          } catch (err) {
            //First check whether  error has a property called 'status'.
            if(err && typeof err === 'object' && 'status' in err){
                const status = (err as {status?:number}).status;
            

            if( status === 401){
                dispatch(logout());
                await logoutApiCall({});
                toast.error('Session expired, please login again');
            }}
            const errorMessage = (err as { data?: { message?: string; error?: string }}).data?.message || (err as { error?: string }).error;
       
        toast.error(errorMessage);
          }
        }
      };

  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
            {isLoading && <Loader/>}
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;