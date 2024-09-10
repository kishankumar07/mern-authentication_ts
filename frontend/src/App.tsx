import { Container } from "react-bootstrap"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
       <Header/>
       <ToastContainer/>
        <Container className="my-2">
          <Outlet/>
        </Container>
    </div>
  )
}

export default App
