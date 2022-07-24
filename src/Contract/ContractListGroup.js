import { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Moment from 'react-moment'
import ContractService from "../services/ContractService";




class ContractListGroup extends Component
{
  constructor()
  {
    super();
    this.onClick = this.onClick.bind(this);

  }
  onClick(id) {
    ContractService.deleteContract(id).then(() => {
      window.location.reload();
    });
    
  }

  editContract(id) {
    // TransactionService.Transaction(id).then(() => {
    //   window.location.reload();
    // });
    window.location.href = "/contracts/edit?id=" + id
    
  }

  getNames(categories) {
    if (categories === undefined)
      return;
    
    let total = [];
    for (let n = 0; n < categories.length; n++)
        total.push(categories[n].name);
    
    
    return total.join(", ");
  }
  
  // onRowClick(e) {
  //   console.log(e.target.className)
  //   }
    render() {
        return (
            <ListGroup>
            {this.props.contracts.map((item) => (
              <ListGroupItem
                // onClick={this.onRowClick}
                key={item.Id}
                value={item.id}
                className={
                  item.type === 1
                    ? 'list-group-item-danger'
                    : 'list-group-item-success'
                }
              >
                <div className="row">
                  <div className="col-md-1">
                    <strong>
                      <Moment
                        date={item.startDate}
                        parse="YYYY-MM-DD"
                        format="DD"
                      />
                    </strong>
                  </div>
                  {/* <div className="col-md-3">
                    <strong>
                      {this.getRotationString(item.rotation)}
                    </strong>
                  </div> */}
                  <div className="col-md-4"><strong>{item.name}</strong></div>
                  <div className="col-md-3"><small>{this.getNames(item.categories)}</small></div>
  
                  <div className="col-md-2 amount"><strong>{item.amount.toLocaleString()} €</strong></div>
                  <div className="col-md-2 btn-group">
                    
                    <button className="btn btn-primary" onClick={() => {
                      this.editContract(item.Id)
                      }}>Edit</button>
                      
                    <button onClick={() => {
                      this.onClick(item.Id)
                    }}>Löschen</button>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        )
    }

}


export default ContractListGroup;
