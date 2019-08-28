import React, {Component} from 'react';
import Modal from 'react-modal';
import Validation from 'react-validation';
import "../validation.js";
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

export default class PacientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pacients: [],
            modalIsOpen: false,
            name: '',
            email: '',
            msg: '',
            pacient_id: 0
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(pacient) {
        this.setState({
            modalIsOpen: true,
            name: pacient.name,
            email: pacient.email,
            pacient_id: pacient.pacient_id
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        //Edit functionality
        event.preventDefault()
        var data = {
            name: this.state.name,
            email: this.state.email,
            pacient_id: this.state.pacient_id
        }
        fetch(URL+"/"+this.state.pacient_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            if (respData.affectedRows > 0) {
                this.setState({msg:"Paciente alterado com sucesso."});
            }
        }).catch(err => console.log(err));
    }

    deletePacient(pacient){
        
        fetch(URL+"/"+this.state.pacient_id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then((response) => response.json()
        ).then((respData) => {
            if (respData.affectedRows > 0) {
                this.setState({msg:"Paciente excluído com sucesso."});
            }
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        let self = this;
        fetch(URL, {
            method: 'GET'
        }).then((response) =>response.json()
        ).then((data) => {
            self.setState({pacients: data});
            console.log(data);
        }).catch(err => console.log(err));
    }

    render() {
        return (
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Tipo sanguíneo</th>
                            <th>Email</th>
                            <th>Convênio</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pacients.map(pacient =>
                        <tr key={pacient.pacient_id}>
                        <td>{pacient.name + ' ' + pacient.surname} </td>
                        <td>{pacient.phone}</td>
                        <td>{pacient.bloodType}</td>
                        <td>{pacient.email}</td>
                        <td>{pacient.healthPlan}</td>
                        <td><a onClick={() => this.openModal(pacient)}>Alterar</a>|<a onClick={() => this.deletePacient(pacient)}>Excluir</a></td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}