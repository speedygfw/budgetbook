import React from 'react'
import { Button, Container } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import ContractService from '../services/ContractService'
import ContractListGroup from './ContractListGroup'

class ListContracts extends React.Component {
  constructor() {
    super()
    this.state = {
      myContracts: [],
      totalCostsMonthly: 0,
      totalCostsQuaterly: 0,
      totalIncomeMonthly: 0
    }
  }

  componentDidMount() {
    ContractService.fetchContracts().then((response) => {
      let totalCostsMonthly = 0;
      let totalCostsQuaterly = 0;
      let totalIncomeMonthly = 0;

      const resp = response.data.map((item) => {
        item.Id = item.id
        delete item.id

        if (item.rotation === 0 && item.type === 1)
          totalCostsMonthly += item.amount;
        else if (item.rotation === 2 && item.type === 1)
          totalCostsQuaterly += item.amount;
        else if (item.type === 0 && item.rotation === 0)
          totalIncomeMonthly += item.amount;
          
        return item
      })
      this.setState({
        myContracts: resp,
        totalCostsMonthly: totalCostsMonthly,
        totalCostsQuaterly: totalCostsQuaterly,
        totalIncomeMonthly: totalIncomeMonthly
      })
    }).catch(error => {
      let responseCode = error.response.status;
      if (responseCode === 401) {
        localStorage.setItem("tokenExpired", true);
      }

      let oldHref = window.location.href;
      localStorage.setItem("redirect", JSON.stringify(oldHref));
      window.location.href = "login";
    });
  }

  getRotationString(rotation)
  {
    if (rotation === 0)
      return "Monatlich"
    else if (rotation === 2)
      return "vierteljährlich"

  }

  filterMonthlyIncome(item) {
    if (item.type === 0 && item.rotation === 0) return true;

    return false;
  }
  filterQuaterlyIncome(item) {
    if (item.rotation.typ === 2) return true;

    return false;
  }

  filterMonthlyCosts(item) {
    if (item.type === 1 && item.rotation === 0) return true;

    return false;
  }
  filterQuaterlyCosts(item) {
    if (item.type === 1 && item.rotation === 2) return true;

    return false;
  }

  render() {
    const divStyle = {
      color: 'white',
      textDecoration: 'none',
    }
    return (
      <Container>
        
        {/* <div className="input-group date" data-provide="datepicker">
          <input type="text" className="form-control" />
          <div className="input-group-addon">
            <span className="glyphicon glyphicon-th"></span>
          </div>
        </div> */}
        <h2>Verträge</h2>
        <h5>Monatliches Einkommen - {this.state.totalIncomeMonthly.toLocaleString()} €</h5>
        <ContractListGroup contracts={this.state.myContracts.filter(this.filterMonthlyIncome)} />
        <h5>Monatliche Kosten - {this.state.totalCostsMonthly.toLocaleString()} €</h5>
        <ContractListGroup contracts={this.state.myContracts.filter(this.filterMonthlyCosts)} />
        <h5>Vierteljährliche Kosten - {this.state.totalCostsQuaterly.toLocaleString()} €</h5>
        <ContractListGroup contracts={this.state.myContracts.filter(this.filterQuaterlyCosts)} />
        <br />
        <div className="row">
          <div className="col-md-3">
            <Button variant="primary">
              <Link style={divStyle} to="/contracts/add">
                Add Contract
              </Link>
            </Button>
          </div>
        </div>
        <br />
      </Container>
    )
  }
}

export default ListContracts
