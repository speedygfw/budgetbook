import React, { Component } from 'react'
import { FormErrors } from '../components/FormErrors'
import DateService from '../services/DateService'

export default class ContractForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      name: '',
      startDate: DateService.toDateString(new Date()),
      type: 1,
      formErrors: { name: '' },
      formValid: false,
      nameValid: false,
      categories: [],
    }
    //console.log(this.props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    //this.handleSubmit = this.props.handleSubmit; //this.handleAdd.bind(this);
  }

  addCategory(e) {
    e.preventDefault();
    let categories = this.state.categories;
    categories.push({
      'name': "",
      '@id': -1
    });
    
    this.setState({'categories': categories});
  }

  removeCategory(e) {
    e.preventDefault();
    let index = e.target.getAttribute('data-index');
    let categories = this.state.categories;

    categories.splice(index, 1);
    
    this.setState({ "categories": categories });

    
  }

  handleSubmit(e) {
    e.preventDefault()
    let formData = {
      amount: this.state.amount,
      name: this.state.name,
      startDate: this.state.startDate,
      type: this.state.type,
      rotation: this.state.rotation,
      categories: this.state.categories.map((item) => {
        item.id = item["@id"];
        return item;
      })
    }
    // console.log(this.state);

    // console.log(this.props);
    this.props.handleSubmit(formData);
    this.handleCatChange = this.handleCatChange.bind(this);
  }
  componentDidMount() {
    // console.log("mount");
    if (this.props.data) {
      this.setState({
        amount: this.props.data.amount,
        rotation: this.props.data.rotation,
        name: this.props.data.name,
        startDate: this.props.data.startDate,
        type: this.props.data.type,
        categories: this.props.data.categories,
      });

      
    }

    // console.log(this.props.data);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 2
        fieldValidationErrors.name = nameValid ? '' : ': is to short'
        break
      default:
        break
    }
    this.setState(
      { formErrors: fieldValidationErrors, nameValid: nameValid },
      this.validateForm,
    )
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid })
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error alert-danger'
  }
  handleChange(e) {
    const tar = e.target;
    const value = tar.value;
    const name = tar.name;

    this.validateField(e.target.name, e.target.value)

    this.setState({
      [name]: value,
    });
    this.validateForm();
  }

  handleCatChange(e) {
    let tarName = e.target.name;
    let tarVal = e.target.value;
    let tarId = e.target.parentNode.childNodes[0];
    let tarIdVal = tarId.value;

    var re = /categories\[([0-9]*)\]\.name/i;
    var found = tarName.match(re);
    let id = found[1];
    
    let item = this.state.categories[id];
    item.name = tarVal;
    item.contentChanged = true;
    item.id = tarIdVal;

    this.setState({
      ['categories[' + id + ']']: item
    });
    //console.log(id + " " + catName);
  }

  handleSelectChange(e) {
    const tar = e.target

    this.setState({
      [tar.name]: tar.value,
    });

    this.validateForm();
  }

  render() {
    return (
      <div className={'card textcenter mt-3 '}>
        <div className="apt-addheading card-header bg-primary text-white">
          Vertrag hinzufügen
        </div>

        <div className="card-body">
          <form id="contractForm" noValidate onSubmit={this.handleSubmit}>
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
                  className={
                    'form-control ' +
                    this.errorClass(this.state.formErrors.name)
                  }
                  name="name"
                  placeholder="name"
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
                <select value={this.state.rotation} className="form-control" name="rotation" id="rotation" onChange={this.handleSelectChange}>
                    <option value="1">Monatlich</option>
                    <option value="2">Vierteljährlich</option>
                    <option value="3">Jährlich</option>
                </select>
              </div>
                    </div>

            <div className="form-group form-row">
            <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="categories"
                readOnly
              >
                Kategorien
              </label>
            {this.state.categories.map((category, index) => (
              <div key={index}>
                <input type="hidden" name={"categories[" + index + "].id"} value={category["@id"]} /> 
                <input type="text" name={"categories[" + index + "].name"} value={category.name} onChange={this.handleCatChange} />
                <button className='btn btn-primary' data-index={index} onClick={this.removeCategory}>X</button>
              </div>
            ))}
            <button className='btn btn-primary' onClick={this.addCategory} >Neue Kategorie</button>
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
                <select
                  className="form-control"
                  name="type"
                  id="type"
                  value={this.state.type}
                  onChange={this.handleSelectChange}
                >
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
                Datum
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

            <br />

            <div className="form-group form-row mb-0">
              <div className="offset-md-1 col-md-11">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!this.state.formValid}
                >
                  {this.props.labelSubmit}
                </button>
              </div>
            </div>
          </form>
          <div className="panel panel-default alert-danger">
            {' '}
            <FormErrors formErrors={this.state.formErrors} />
          </div>
        </div>
      </div>
    )
  }
}
