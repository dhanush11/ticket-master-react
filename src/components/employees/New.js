import React from 'react'
import EmployeeForm from './Form'
import axios from 'axios'

class EmployeeNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleSubmit = (formData) => {
        axios.post(`https://dct-ticket-master.herokuapp.com/employees`, formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    console.log(response.data)
                    alert(response.data.message)
                } else {
                    this.props.history.push('/employees')

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add Employee</h2>
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default EmployeeNew