import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
// Other imports...

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState<File | null>(null); // State to handle image file

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  // Handle image file selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const formData = new FormData();
        formData.append('_id', userInfo._id);
        formData.append('name', name);
        formData.append('email', email);
        if (password) formData.append('password', password);
        if (image) formData.append('image', image); // Add image to form data

        const res = await updateProfile(formData).unwrap(); // Send form data
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        // Handle errors (same as before)
        if (err && typeof err === 'object' && 'status' in err) {
          const status = (err as { status?: number }).status;
          if (status === 401) {
            dispatch(logout());
            await logoutApiCall({});
            toast.error('Session expired, please login again');
          }
        }
        const errorMessage = (err as { data?: { message?: string; error?: string } }).data?.message || (err as { error?: string }).error;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler} encType="multipart/form-data">
        {/* Other form fields */}
        <Form.Group className='my-2' controlId='image'>
          <Form.Label>Upload Profile Picture</Form.Label>
          <Form.Control
            type='file'
            onChange={handleImageUpload}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
