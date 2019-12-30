import React from 'react';
import axios from 'axios';
import DepartmentNew from './New';
import List from './List';


class DepartmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departments: []
        }
    }

    componentDidMount() {
        axios.get(`https://dct-ticket-master.herokuapp.com/departments`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const departments = response.data;
                this.setState(() => ({ departments }))
            })
            .catch(err => {
                console.log(err);
            })
    }


    handleRemove = (department) => {
        const confirmRemove = window.confirm("Are you sure ?")
        if (confirmRemove) {
            axios.delete(`https://dct-ticket-master.herokuapp.com/departments/${department._id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.setState((prevState) => {
                        return {
                            departments: prevState.departments.filter(dep => dep._id !== department._id)
                        }
                    })

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleTable = (newDep) => {
        const departments = this.state.departments
        departments.push(newDep)
        this.setState(() => ({ departments }))
    }


    render() {
        return (
            <div>
                <h2>Departments</h2>

                <DepartmentNew handleTable={this.handleTable} /><br />

                <List departments={this.state.departments} handleRemove={this.handleRemove} />
            </div>
        )
    }

}

export default DepartmentList;