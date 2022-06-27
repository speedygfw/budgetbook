import React, { Component } from 'react'
import { FormErrors } from '../components/FormErrors';
import DateService from '../services/DateService';
import TransactionService from '../services/TransactionService';
import TransactionForm from './TransactionForm';

class AddTransaction extends Component {
  constructor() {
    super();
    this.state = {};
      
      
      this.handleAdd = this.handleAdd.bind(this);
  }
  
  
  

    handleAdd(formData) {

      console.log(formData);
      TransactionService.addTransaction(formData).then(() => {
        // alert("Transaktion wurde angelegt.");
        window.location.href = "/transactions";
      });
    
    }


  render() {
    return (
      <TransactionForm labelSubmit="Transaktion hinzufügen" handleSubmit={this.handleAdd} />
    )
  }
}

export default AddTransaction
