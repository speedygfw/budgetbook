import { Container } from "react-bootstrap";
import LayoutHeader from "../components/LayoutHeader.js";
import { useSearchParams } from "react-router-dom";
import EditTransaction from "../Transaction/EditTransaction.js";

export default function EditTransactionRoute() {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      {/* <h2>Add Contract</h2> */}
      <LayoutHeader />
      <EditTransaction id={searchParams.get("id")} />

      
    </Container>
  );
}