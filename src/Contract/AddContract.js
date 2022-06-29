import React, { Component } from 'react'
import ContractService from '../services/ContractService';
import { FormErrors } from '../components/FormErrors';
import DateService from '../services/DateService';

class AddContract extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0,
      name: '',
      rotation: 0,
      startDate: DateService.toDateString(new Date()),
      type: 0,
      formErrors: { name: '' },
      formValid: false,
      nameValid: false
      
      }
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
  }
  
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;

  
    switch(fieldName) {
      case 'name':
        nameValid  = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '' : ': is to short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.nameValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error alert-danger');
 }

    
    handleChange(e) {
        const tar = e.target;
        const value = tar.value;
      const name = tar.name;
      
      this.validateField(e.target.name, e.target.value);

        this.setState({
            [name]: value
        });

  }
  
  handleSelectChange(e) {
    const tar = e.target;

     this.setState({
         [tar.name]: tar.value
     });

}

    handleAdd(e) {
        e.preventDefault();
      let data = {
        amount: this.state.amount,
        name: this.state.name,
        startDate: this.state.startDate,
        rotation: this.state.rotation,
        type: this.state.type
      };

      console.log(data);
      ContractService.addContract(data).then(() => {
        alert("Vertrag wurde angelegt.");
        window.location.href = "/contracts";
      });
     
    }

    renderRotation() {
        
    }

  render() {
    return (
      <div
        className={
          'card textcenter mt-3 '
        }
      >
        <div className="apt-addheading card-header bg-primary text-white">
           Vertrag hinzufügen
        </div>

        <div className="card-body">
          <form id="contractForm" noValidate onSubmit={this.handleAdd}>
          
            <div className={'form-group form-row'}>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="name"
                readOnly
              >
                Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className={'form-control ' + this.errorClass(this.state.formErrors.name)}
                  name="name"
                  placeholder="name of contract"
                                value={this.state.name}
                                onChange={this.handleChange}
                />
              </div>
                    </div>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="rotation"
                readOnly
              >
                Turnus
              </label>
              <div className="col-md-10">
                <select className="form-control" name="rotation" id="rotation" onChange={this.handleSelectChange}>
                    <option value="0">Monatlich</option>
                    <option value="1">Vierteljährlich</option>
                    <option value="2">Jährlich</option>
                </select>
              </div>
                    </div>
                    
                    <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="rotation"
                readOnly
              >
                Type
              </label>
              <div className="col-md-10">
                <select className="form-control" name="type" id="type" onChange={this.handleSelectChange}>
                    <option value="0">Einnahme</option>
                    <option value="1">Ausgabe</option>
                    
                </select>
              </div>
            </div>
                    

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
               Start Datum
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                                id="startDate"
                                value={this.state.startDate}
                                onChange={this.handleChange}
                />
              </div>
             
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="amount"
                readOnly
              >
                Betrag
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  placeholder="amount"
                                value={this.state.amount}
                                onChange={this.handleChange}
                />
              </div>
                    </div>

           <br/>

            <div className="form-group form-row mb-0">
              <div className="offset-md-1 col-md-11">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!this.state.formValid}
                >
                  Vertrag hinzufügen
                </button>
              </div>
            </div>
          </form>
          <div className="panel panel-default alert-danger"> <FormErrors formErrors={this.state.formErrors} /></div>
        </div>
      </div>
    )
  }
}

export default AddContract
