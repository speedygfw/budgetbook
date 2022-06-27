
import { Container } from "react-bootstrap";
import LayoutHeader from "./LayoutHeader"
import AddContract  from "../Contract/AddContract";
import Login from "./Login";

export default function App() {
  
  return (
    <div>
      <Container className="p-3">
        
        <LayoutHeader />
        <h1>Haushaltsbuch</h1>
        <Login />
        {/* <AddContract/> */}
       
      </Container>
    </div>
    
  );
}