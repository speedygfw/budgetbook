import { Container } from "react-bootstrap";
import LayoutHeader from "../components/LayoutHeader.js";
import Login from "../components/Login.js";


export default function LoginRoute() {
  return (
    <Container>
      {/* <h2>Add Contract</h2> */}
      <LayoutHeader />
      <Login />
      
    </Container>
  );
}