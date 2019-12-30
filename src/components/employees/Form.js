import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile: '',
            department: '',
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
                const departments = response.data
                this.setState({ departments })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleNameChange = (e) => {
        const name = e.target.value
        this.setState({ name })
    }

    handleEmailChange = (e) => {
        const email = e.target.value
        this.setState({ email })
    }

    handleMobileChange = (e) => {
        const mobile = e.target.value
        this.setState({ mobile })
    }

    handleDeptChange = (e) => {
        const department = e.target.value
        this.setState({ department })
    }

    handleBack = () => {
        this.props.history.push('/employees')
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email,
            department: this.state.department
        }

        this.props.handleSubmit(formData);
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label><br />
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label><br />
                <label>
                    Mobile:
                    <input type="text" value={this.state.mobile} onChange={this.handleMobileChange} />
                </label><br />
                <label>
                    Departments:
                    <select value={this.state.department} onChange={this.handleDeptChange}>
                        <option value="">Select</option>
                        {this.state.departments.map(department => {
                            return <option key={department._id} value={department._id} >{department.name}</option>
                        })}
                    </select>
                </label><br />

                <input type="submit" /> or <Link to="/employees">Back</Link>
            </form>
        )
    }
}

export default EmployeeForm