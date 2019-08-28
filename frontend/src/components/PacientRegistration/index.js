import React, { Component } from 'react';

const URL = "http://localhost:3001/pacients";

const options = [
  { value: 'A+', label: 'A+' },
  { value: 'B+', label: 'B+' },
  { value: 'O+', label: 'O+' },
  { value: 'AB+', label: 'AB+' },
  { value: 'A-', label: 'A-' },
  { value: 'B-', label: 'B-' },
  { value: 'O-', label: 'O-' },
  { value: 'AB-', label: 'AB-' }
];

class DonorRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
        name: '',
        email: '',
        msg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      surname: event.target.surname.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      healthPlan: event.target.healthPlan.value,
      bloodType: event.target.bloodType.value
    };
    console.log(data);
    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then((response) => response.json()
    ).then((respData) => {
      if (respData.affectedRows > 0) {
        this.setState({msg:"Paciente cadastrado com sucesso!"});
      }
      //redirect to pacients list
      this.props.router.push('/list');
    }).catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="section-content-block section-process">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 appointment-form-wrapper text-center clearfix">
            <form onSubmit={event => this.handleSubmit(event)} className="appoinment-form">
              <div className="form-group col-md-6">
                <input required name="name" className="form-control" placeholder="Nome" type="text" />
              </div>
              <div className="form-group col-md-6">
                <input required name="surname" className="form-control" placeholder="Sobrenome" type="text" />
              </div>
              <div className="form-group col-md-6">
                <input name="phone" className="form-control" placeholder="Telefone" type="text" />
              </div>
              <div className="form-group col-md-6">
                <div className="select-style">
                  <select required className="form-control" name="bloodType">
                    {options.map(optionVal => <option key={optionVal.value} value={optionVal.value}>{optionVal.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6">
                <input required name="email" className="form-control" placeholder="Email" type="email" />
              </div>
              <div className="form-group col-md-6">
                <input name="healthPlan" className="form-control" placeholder="Convênio" type="text" />
              </div>
              <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <button className="btn-submit" type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default DonorRegistration;
