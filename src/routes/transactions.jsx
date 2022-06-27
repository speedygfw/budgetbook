import { Container } from "react-bootstrap";
import LayoutHeader from "../components/LayoutHeader.js";
import ListTransaction from "../Transaction/ListTransaction.js";
import DateService from "../services/DateService.js";

String.prototype.paddingLeft = function (paddingValue) {
  return String(paddingValue + this).slice(-paddingValue.length);
};


var dStart = new Date();
dStart.setDate("01");

var dEnd = new Date(dStart.getFullYear(), dStart.getMonth() + 1, 0);


dEnd = DateService.toDateString(dEnd);
dStart = DateService.toDateString(dStart);

export default function Transactions() {
  return (
    <Container>
      {/* <h2>Transactions</h2> */}
      <LayoutHeader />
      <ListTransaction startDate={dStart} endDate={dEnd} />
      
    </Container>
  );
}