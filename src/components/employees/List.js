import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class EmployeeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get(`https://dct-ticket-master.herokuapp.com/employees`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const employees = response.data
                this.setState({ employees })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Listing Employees - {this.state.employees.length}</h2>
                <ul>
                    {this.state.employees.map(employee => {
                        return <li key={employee._id}> <Link to={`/employees/${employee._id}`}>{employee.name}- {employee.department.name}</Link></li>
                    })}
                </ul>

                <Link to="/employees/new">Add Employee</Link>
            </div>
        )
    }
}

export default EmployeeList