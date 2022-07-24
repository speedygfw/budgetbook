import { Container } from "react-bootstrap";
import LayoutHeader from "../components/LayoutHeader.js";
import { useSearchParams } from "react-router-dom";
import EditContract from "../Contract/EditContract.js";

export default function EditContractRoute() {
  let [searchParams] = useSearchParams();

  return (
    <Container>
      {/* <h2>Add Contract</h2> */}
      <LayoutHeader />
      <EditContract id={searchParams.get("id")} />

      
    </Container>
  );
}