import React from 'react'
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import Moment from 'react-moment';
import TransactionService from '../services/TransactionService';

class TransactionsListGroup extends React.Component{
  constructor()
  {
    super();
    this.onClick = this.deleteTransaction.bind(this);

  }
    
    getNames(categories) {
        let total = [];
        for (let n = 0; n < categories.length; n++)
            total.push(categories[n].name);
        
        
        return total.join(", ");
    }

    deleteTransaction(id) {
      TransactionService.deleteTransaction(id).then(() => {
        window.location.reload();
      });
      
  }
  
  editTransaction(id) {
    // TransactionService.Transaction(id).then(() => {
    //   window.location.reload();
    // });
    window.location.href = "/transaction/edit?id=" + id
    
  }
    
    
    
    render(){
 
        return(
            <ListGroup>
            {this.props.transactions.map((item) => (
              <ListGroupItem
                key={item.Id}
                className={
                  item.type === 1
                    ? 'list-group-item-danger '
                    : 'list-group-item-success'
                }
  
              >
                <div className="row no-gutters">
                  <div className="col-md-2">
                    <strong>
                      <Moment
                        date={item.bookingDate}
                        parse="YYYY-MM-DD"
                        format="DD.MM.YYYY"
                      />
                    </strong>
                  </div>
                        <div className="col-md-3">
                            <strong>{item.name}</strong>
                            
                        </div>
                        <div className="col-md-3">
                        <small>{this.getNames(item.category)}</small>
                        </div>
  
                  <div className="col-md-2 amount"><strong>{item.amount.toLocaleString()} €</strong></div>
                  <div className="col-md-2 btn-group">
                    
                    
                    <button className="btn btn-primary" onClick={() => {
                      this.editTransaction(item.Id)
                    }}>Edit</button>
                    <button className="btn btn-secondary" onClick={() => {
                      this.deleteTransaction(item.Id)
                    }}>X</button>

                  </div>
                </div>
              </ListGroupItem>
            
            ))}
            {/* <div className="row no-gutters">
              <ListGroupItem>Total: {this.props.totalAmount} €</ListGroupItem>
           </div> */}
          </ListGroup>
        )
    }
     
}
 
export default TransactionsListGroup;