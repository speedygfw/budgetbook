import React from 'react'
import { Button, Container} from 'react-bootstrap'

import TransactionService from '../services/TransactionService'
import BootstrapDatePicker from '../components/BootstrapDatePicker'
import FormLabel from 'react-bootstrap/esm/FormLabel'
import moment from 'moment';
import TransactionsListGroup from './TransactionListGroup'
import { Link } from 'react-router-dom'
import MyChart from '../components/MyChart'



class ListTransaction extends React.Component {
  transactionsLoaded = false;

  constructor() {
    super()
    this.state = {
      // myLocation: "München",
      myTransactions: [],
      incomeAmount: 0,
      outcomFixedAmount: 0,
      variableAmount: 0,
      totalCostsAmount: 0,
      total: 0,
      transactionLoaded: false
    }
    this.sumIncome = 0;
    //this.deleteAppointment = this.deleteAppointment.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    
  }

  renderChart() {
    let data = [this.state.incomeAmount - (this.state.outcomFixedAmount + this.state.variableAmount), this.state.outcomFixedAmount , this.state.variableAmount ];

    
    if (this.transactionLoaded) {

      return (<MyChart labels={[
        'Verfügbar (' + (this.state.total / this.state.incomeAmount * 100).toFixed(2) + '%)',
        'Fixe Kosten (' + (this.state.outcomFixedAmount / this.state.incomeAmount * 100).toFixed(2) + '%)',
        'Variable Kosten (' + (this.state.variableAmount / this.state.incomeAmount * 100).toFixed(2) + '%)',]} data={data} />);
    }

  }

  renderFixcostsChart()
  {

    let tfa = this.state.totalFixedAmount;

    let labels = [];
    let amounts = [];

    for (let x in tfa) {
      if (x == "Fixkosten")
        continue;
      
      labels.push(x + " (" + (tfa[x].amount / this.state.outcomFixedAmount  * 100).toFixed(2) +"%)");
      amounts.push(tfa[x].amount);
    }

    if (this.transactionLoaded) {
      return (<MyChart labels={labels} data={amounts} />);
    }
  }

  renderVarcostsChart()
  {

  
    let tfa = this.state.totalVarAmount;

    let labels = [];
    let amounts = [];

    for (let x in tfa) {
      if (x == "Fixkosten")
        continue;
      
      labels.push(x);
      amounts.push(tfa[x].amount);
    }

    if (this.transactionLoaded) {
      return (<MyChart labels={labels} data={amounts} />);
    }
  }

  hasCategory(item, searchStr) {
    for (let n = 0; n < item.category.length; n++){
      if (item.category[n].name === searchStr)
        return true;
    }
    return false;
  }
  

  updateTransactions(search, from, to)
  {
    let totalAmountIncome = 0;
    let totalAmountFixedOutcome = 0;
    let totalVarCosts = 0;
    let totalFixedAmount = [];
    let totalVarAmount = [];
    this.setState({
      myTransactions: [],
      incomeAmount: 0,
      outcomFixedAmount: 0,
      variableAmount: 0,
      totalCostsAmount: 0,
      total: 0,
      transactionLoaded: false
    });
    this.transactionLoaded = false;

    TransactionService.fetchTransactions(search, from, to).then((response) => {
      const resp = response.data.map((item) => {
        item.Id = item.id;
        delete item.id;
        if (item.type === 0)
          totalAmountIncome += item.amount;
        else if (item.type === 1 && this.hasCategory(item, 'Fixkosten')) {
          totalAmountFixedOutcome += item.amount;
          for (let n = 0; n < item.category.length; n++) {
            if (totalFixedAmount[item.category[n].name] === undefined) {
              totalFixedAmount[item.category[n].name] = {};
              totalFixedAmount[item.category[n].name].amount = item.amount;
            }
            else
              totalFixedAmount[item.category[n].name].amount += item.amount;
          }
        }
        else {
          totalVarCosts += item.amount;

          
            if (totalVarAmount[item.name] === undefined) {
              totalVarAmount[item.name] = {};
              totalVarAmount[item.name].amount = item.amount;
            }
            else
              totalVarAmount[item.name].amount += item.amount;
          

          
        }

        return item;
      });

      let tLoaded = true;
      
      this.setState({
        myTransactions: resp,
        incomeAmount: totalAmountIncome,
        outcomFixedAmount: totalAmountFixedOutcome,
        variableAmount: totalVarCosts,
        totalCostsAmount: totalVarCosts + totalAmountFixedOutcome,
        total: totalAmountIncome - (totalVarCosts + totalAmountFixedOutcome),
        transactionsLoaded: tLoaded,
        totalFixedAmount: totalFixedAmount,
        totalVarAmount: totalVarAmount
      });
      this.transactionLoaded = true;


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
  componentDidMount() {
    // fetch('https://localhost:8000/api/bookings.json')
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (!Array.isArray(result)) return 'results are not array'
    //     const apts = result.map((item) => {
    //       item.Id = item.id
    //       delete item.id
    //       return item
    //     })
    //     this.setState({
    //       myTransactions: apts,
    //     })
    //   })
    this.handleSearch();
  }

  filterTransactionsIncome(item) {
    if (item.type === 0)
      return true;
    else
      return false;
  }
  filterTransactionsOutcome(item) {
    if (item.type === 1)
      return true;
    else
      return false;
  }


  filterByCategoryName(items, categoryName) {
    return items.filter(function (item) {
      for (let n = 0; n < item.category.length; n++)
      if (categoryName === item.category[n].name)
        return true;
    
    return false;
    });
  }

  filterVarCosts(item)
  {
    if (item.type === 0)
      return false;
    
      for (let n = 0; n < item.category.length; n++){
        if (item.category[n].name === "Fixkosten")
          return false;
      }
    
    return true;
  }

  handleSearch() {
    let valName = document.getElementById("search").value;
    let valVon = moment(document.getElementsByName("Von")[0].value).format("DD.MM.YYYY");
    let valBis = moment(document.getElementsByName("Bis")[0].value).format("DD.MM.YYYY");
    
    
    this.updateTransactions(valName, valVon, valBis);
  }

  prevMonth() {
    let compVon = document.getElementsByName("Von")[0];
    let compBis = document.getElementsByName("Bis")[0];
    let valVon = moment(compVon.value).subtract(1, "month");
    let valBis = moment(compBis.value).subtract(1, "month");
    let x = moment(valVon).format('YYYY-MM-DD');
    let y = moment(valBis).format('YYYY-MM-DD');

    compVon.value = x;
    compBis.value = y;

    let valName = document.getElementById("search").value;
    this.updateTransactions(valName, x, y);
  }

  nextMonth() {

    let compVon = document.getElementsByName("Von")[0];
    let compBis = document.getElementsByName("Bis")[0];
    let valVon = moment(compVon.value).add(1, "month");
    let valBis = moment(compBis.value).add(1, "month");
    let x = moment(valVon).format('YYYY-MM-DD');
    let y = moment(valBis).format('YYYY-MM-DD');

    compVon.value = x;
    compBis.value = y;

    let valName = document.getElementById("search").value;
    this.updateTransactions(valName, x, y);

  }

 
  render() {
    
    
    const divStyle = {
      color: 'white',
      textDecoration: 'none',
    };
    
    return (
      
      <Container>
        
        <div className="row">
          <div className="col-md-4">
            <BootstrapDatePicker label="Von" placeholder="Von" id="from" defaultValue={this.props.startDate} />
          </div>
          <div className="col-md-4">
            <BootstrapDatePicker label="Bis" placeholder="Bis" id="to" defaultValue={this.props.endDate}  />
          </div>
          <div className="col-md-4">
          <FormLabel>Name</FormLabel>
          <input type="text" className="form-control" id="search" />
        </div>
        </div>
        <br/>
        <div className="row">
          <button className="btn btn-primary col-md-12" onClick={this.handleSearch}>Suche</button>
          
        </div>
        <br/>
        <div className='row'>
        <button className="btn btn-secondary col-md-6" onClick={this.prevMonth}>Voriger Monat</button>
          <button className="btn btn-secondary col-md-6" onClick={this.nextMonth}>Nächster Monat</button>
        </div>
        <br />
        
        <div className="row">
                <h4>Verfügbar - {this.state.total.toLocaleString()} €</h4>
        <div className="row">
          <div className="col-md-6 alert-success">Einnahmen</div>
          <div className="col-md-6 alert-success">{this.state.incomeAmount.toLocaleString()} €</div>
        </div>
        <div className="row">
          <div className="col-md-6 alert-danger">Fixkosten</div>
          <div className="col-md-6 alert-danger">{this.state.outcomFixedAmount.toLocaleString()} € ({ (this.state.outcomFixedAmount / this.state.incomeAmount * 100).toFixed(2)}%)</div>
        </div>
        <div className="row">
          <div className="col-md-6 alert-danger">Varkosten</div>
          <div className="col-md-6 alert-danger">{this.state.variableAmount.toLocaleString()} € ({ (this.state.variableAmount / this.state.incomeAmount * 100).toFixed(2)}%)</div>
        </div>
        <div className="row">
          <div className="col-md-6 alert-danger">Gesamtkosten</div>
          <div className="col-md-6 alert-danger">{(this.state.outcomFixedAmount + this.state.variableAmount).toLocaleString()} € ({ (this.state.totalCostsAmount / this.state.incomeAmount * 100).toFixed(2)}%)</div>
        </div>
        </div>
        {this.renderChart()}

        
        <h4>Einnahmen - {this.state.incomeAmount.toLocaleString()} €</h4>
        <TransactionsListGroup transactions={this.state.myTransactions.filter(this.filterTransactionsIncome)} totalAmount={ this.state.incomeAmount } />
        <br/>
        <h4>Fixkosten - {this.state.outcomFixedAmount.toLocaleString()} € ({ (this.state.outcomFixedAmount / this.state.incomeAmount * 100).toFixed(2)}%)</h4>
        {this.renderFixcostsChart()}
        <br/>
        <TransactionsListGroup transactions={this.filterByCategoryName(this.state.myTransactions, "Fixkosten")} totalAmount={this.state.outcomFixedAmount} />
        <br/>
        <h4>Variable Kosten - {this.state.variableAmount.toLocaleString()} € ({ (this.state.variableAmount / this.state.incomeAmount * 100).toFixed(2)}%) </h4>
        {this.renderVarcostsChart()}
        <br/>
        <TransactionsListGroup transactions={this.state.myTransactions.filter(this.filterVarCosts)} totalAmount={this.state.variableAmount} />
        
        <div className="row">
          <div className="col-md-3">
            <Button variant="primary">
              <Link style={divStyle} to="/transaction/add">
                Neue Transaktion
              </Link>
            </Button>
            
          </div>
          
        </div>

      </Container>
    )
  }
}

export default ListTransaction
