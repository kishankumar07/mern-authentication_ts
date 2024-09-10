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
