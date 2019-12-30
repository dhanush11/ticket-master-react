import React from 'react'
import axios from 'axios'

class EmployeeShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`https://dct-ticket-master.herokuapp.com/employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const employee = response.data
                this.setState({ employee })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleRemove = () => {
        axios.delete(`https://dct-ticket-master.herokuapp.com/employees/${this.state.employee._id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response.data)
            this.props.history.push('/employees')
        })
            .catch(err => {
                console.log(err)
            })

    }

    handleBack = () => {
        this.props.history.push('/employees')
    }

    render() {
        return (
            <div>
                <h2>Showing Employee Details </h2>
                <h2>{this.state.employee.name}</h2>
                <p>{this.state.employee.mobile}</p>
                <p>{this.state.employee.email}</p>

                <button onClick={this.handleRemove} >Remove</button>or
                <button onClick={this.handleBack} > Back</button>
            </div>
        )
    }
}

export default EmployeeShow 