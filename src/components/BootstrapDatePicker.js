import React from 'react'
import { Form } from 'react-bootstrap';
 
class BootstrapDatePicker extends React.Component{
 
    render(){
 
        return(
            <div>
                {/* <div className="row"> */}
                    {/* <div className="col-md-4"> */}
                        <Form.Group controlId={this.props.label}>
                            <Form.Label>{this.props.label}</Form.Label>
                            <Form.Control type="date" name={this.props.label} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} />
                        </Form.Group>
                    {/* </div> */}
                {/* </div> */}
            </div>
        )
    }
     
}
 
export default BootstrapDatePicker;