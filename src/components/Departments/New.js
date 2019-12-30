import React from 'react';
import DepartmentForm from './Form';
import axios from 'axios';

class DepartmentNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post(`http://dct-ticket-master.herokuapp.com/departments`, formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const newDep = response.data;
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.handleTable(newDep);
                    this.refs.resolve.clearInput();
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h4>Add Department</h4>
                <DepartmentForm handleSubmit={this.handleSubmit} ref="resolve" />
            </div>
        )
    }
}

export default DepartmentNew;