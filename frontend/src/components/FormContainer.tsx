import { ReactNode } from "react";
import { Container,Row,Col } from "react-bootstrap";

const FormContainer = ({ children }:{children:ReactNode}) => {
    return (
        <Container>
            <Row className="justify-content-md-center " >
                <h1 className="text-center mb-3">Welcome Admin</h1>
                <Col className="card p-5" xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;