import { Container } from "react-bootstrap";
import AddTransaction from "../Transaction/AddTransaction.js";
import LayoutHeader from "../components/LayoutHeader.js";


export default function AddTransactionRoute() {
  return (
    <Container>
      {/* <h2>Add Contract</h2> */}
      <LayoutHeader />
      <AddTransaction />
      
    </Container>
  );
}