import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { HiOutlineUserCircle } from "react-icons/hi2";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LuLogOut } from "react-icons/lu";

function Header() {
  return (
    <>
      <Navbar expand='lg' bg='dark' variant='dark'>
        <Container>
          {/* Navbar Brand on the left */}
          <Navbar.Brand href="#"><h1><Badge bg="secondary">MERN Auth</Badge></h1></Navbar.Brand>
          <Navbar.Toggle aria-controls='offCanvasNavbar' />
          <Navbar.Offcanvas
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id='offcanvasNavbarLabel'>
                Hi Kishan,
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Search bar centered only in offcanvas */}
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Form className="d-flex mb-1 offcanvas-search"> {/* The width is adjustable */}
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>

              {/* Align the rest of the content to start */}
                <Nav.Link className='d-flex align-items-center gap-1' href="#action1"> <HiOutlineUserCircle /> Profile</Nav.Link>
                <NavDropdown className='d-flex align-items-center' title="Advanced" id='offcanvasNavbarDropdown'>
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className='d-flex align-items-center gap-1' href="#action2"> <LuLogOut /> Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <style jsx>{`
        @media (max-width: 991.98px) {
          /* Center the search bar only in offcanvas mode */
          .offcanvas-search {
            justify-content: center;
          }
        }

        @media (min-width: 992px) {
          /* Align search bar properly with other elements in expanded mode */
          .offcanvas-search {
            justify-content: flex-end;
          }

          .nav-link,
          .dropdown {
            margin-left: 20px;
          }
        }
      `}</style>
    </>
  );
}

export default Header;











router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, (req, res, next) => {
    console.log('Before Multer middleware');
    upload.single('profileImage')(req, res, (err) => {
      if (err) {
        console.log('Multer error:', err);
        return res.status(400).json({ error: err.message });
      }
      console.log('File uploaded successfully:', req.file);
      next();
    });
  }, updateUserProfile);
























  import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setImage(target.files[0]);
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
        if (image) formData.append('profileImage', image);

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        const status = (err as { status?: number }).status;
        if (status === 401) {
          dispatch(logout());
          await logoutApiCall({});
          toast.error('Session expired, please login again');
        }
        const errorMessage =
          (err as { data?: { message?: string; error?: string } }).data
            ?.message || (err as { error?: string }).error;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className='text-center'>Update Profile</h1>

      <Form onSubmit={submitHandler} encType='multipart/form-data'>
        <Row className='align-items-center'>
          {/* Profile Image */}
          <Col md={4} className='text-center'>
            {userInfo.profileImage && (
              <img
                src={userInfo.profileImage}
                alt='Profile'
                className='img-fluid rounded-circle'
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            )}
          </Col>

          {/* Form Fields */}
          <Col md={8}>
            <Form.Group className='my-2' controlId='image'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type='file' onChange={handleImageUpload}></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
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

            {isLoading && <Loader />}

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
