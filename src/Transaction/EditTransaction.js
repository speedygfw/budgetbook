
import React from "react";
import { Container } from "react-bootstrap";
import TransactionService from "../services/TransactionService";
import TransactionForm from "./TransactionForm";


export default class EditTransaction extends React.Component {
  
  
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

    TransactionService.fetchTransaction(this.props.id).then((response) => {
      d = response.data;
      this.taLoaded = true;
      this.setState({ data: response.data });
      
      //console.log(d);
    }).catch(error => {
        let responseCode = error.response.status;
        if (responseCode === 404) { //not found?
          alert("not found.");
          window.location = "/transactions";
        }
      }
    );
    //console.log(d);
    //this.setState({data: d});


  }

  handleSubmit(formData) {
    TransactionService.patchTransaction(this.props.id, formData).then((response) => {
      window.location = "/transactions";
    });
    //console.log(formData);
  }

  render() {
    if (this.taLoaded) {
      return (
        <Container>
          <TransactionForm data={this.state.data} handleSubmit={this.handleSubmit} labelSubmit="Aktualisieren" />
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