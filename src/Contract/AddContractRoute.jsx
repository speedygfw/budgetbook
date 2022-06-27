import { Container } from "react-bootstrap";
import AddContract from "./AddContract.js";
import LayoutHeader from "../components/LayoutHeader.js";


export default function AddContractRoute() {
  return (
    <Container>
      {/* <h2>Add Contract</h2> */}
      <LayoutHeader />
      <AddContract />
      
    </Container>
  );
}