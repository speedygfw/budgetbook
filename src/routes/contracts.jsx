import { Container } from "react-bootstrap";
import LayoutHeader from "../components/LayoutHeader.js";
import ListContracts from "../Contract/ListContracts";

export default function Contracts() {
  return (
    <Container>
      {/* <h2>Contracts</h2> */}
      <LayoutHeader />
      <ListContracts/>
      
    </Container>
  );
}