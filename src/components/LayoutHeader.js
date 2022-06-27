
import React from "react";
import { ButtonGroup, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


class LayoutHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            // myLocation: "München",
            //myTransactions: []
        };
        //this.deleteAppointment = this.deleteAppointment.bind(this);


    }

    render() {
        const divStyle = {
            color: "white",
            textDecoration: "none"
          }
        return (
            <Row className="mx-0">
                <ButtonGroup size="lg" className="mb-2">
                <Button as={Col} variant="success"><Link style={divStyle} to="/">Start</Link></Button>
      <Button as={Col} variant="primary"><Link style={divStyle} to="/transactions">Transaktionen</Link></Button>
      <Button as={Col} variant="secondary"><Link style={divStyle} to="/contracts">Verträge</Link></Button>
      
            </ButtonGroup>
            </Row>
        );
    }
}

export default LayoutHeader;