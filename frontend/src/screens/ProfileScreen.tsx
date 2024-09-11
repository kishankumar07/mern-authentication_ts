import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
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
  const [image, setImage] = useState<File | null>(null);

    const {userInfo} = useSelector((state:RootState) => state.auth);
    const dispatch = useDispatch();
    const [updateProfile,{isLoading}] = useUpdateUserMutation();
    const [logoutApiCall]  = useLogoutMutation();

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.email,userInfo.name])


    const handleImageUpload =(e:ChangeEvent<HTMLInputElement>)=>{
        const target = e.target as HTMLInputElement;
            if(target.files && target.files[0]){
                setImage(target.files[0]);
            }
    }

    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
        } else {
          try {


            const formData =new FormData();
            formData.append('_id',userInfo._id);
            formData.append('name',name);
            formData.append('email',email);
            if(password) formData.append('password',password);
            if(image) formData.append('profileImage',image);

            console.log([...formData.entries()]);


            const res = await updateProfile( formData ).unwrap();
            dispatch(setCredentials({ ...res }));
            
            console.log('user updated successfully, this message youll see after response came from backend node.js',res)

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
      <h1 className='text-center'>Update Profile</h1>

      <Form onSubmit={submitHandler} encType='multipart/form-data'>
    <Row className='align-items-center'>

    <Col xs={12} className='text-center my-3'>
      {userInfo.profileImage && (
         <img 
         src={userInfo.profileImage} 
         alt="Profile" 
         style={{ width: '150px', height: '150px', borderRadius: '50%',objectFit:'cover' }}
     />
      )}
    </Col>

      {/* Form fields */}
      <Col xs={12}>
        <Form.Group className='my-2' controlId='image'>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
                type='file' onChange={handleImageUpload}
            ></Form.Control>
        </Form.Group>



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
      </Col>
    </Row>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;