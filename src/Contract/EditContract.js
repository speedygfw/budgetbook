
import React from "react";
import { Container } from "react-bootstrap";
import ContractService from "../services/ContractService";
import ContractForm from "./ContractForm";


export default class EditContract extends React.Component {
  
  
  mounted = false;

  constructor(props)
  {
    super(props);

    
 

    this.state = {
      'data': null
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    
  }



  componentDidMount() {
    let d= null;

    ContractService.fetchContract(this.props.id).then((response) => {
      d = response.data;
      this.taLoaded = true;
      this.setState({ data: response.data });
      
      //console.log(d);
    }).catch(error => {
        let responseCode = error.response.status;
        if (responseCode === 404) { //not found?
          alert("not found.");
          window.location = "/contracts";
        }
      }
    );
    //console.log(d);
    //this.setState({data: d});


  }

  handleSubmit(formData) {
    ContractService.patchContract(this.props.id, formData).then((response) => {
      window.location = "/contracts";
    });
    //console.log(formData);
  }

  render() {
    if (this.taLoaded) {
      return (
        <Container>
          <ContractForm data={this.state.data} handleSubmit={this.handleSubmit} labelSubmit="Aktualisieren" />
        </Container>
      );
    }
    else
      return (
        <Container>
        </Container>
      );
  }
}