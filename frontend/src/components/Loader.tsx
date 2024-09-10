import { Spinner } from 'react-bootstrap'


const Loader = () => {
  return (
    <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
            style={{width:'100px',height:'100px',margin:'auto',display:'block'}}
        ></Spinner>
  )
}
export default Loader
