import React from 'react';
import CustomerForm from './Form';
import axios from 'axios';

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {},
            isLoading: true
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`https://dct-ticket-master.herokuapp.com/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const customer = response.data
                this.setState({
                    customer,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSubmit = (formData) => {
        console.log('edit handle')
        const id = this.props.match.params.id
        axios.put(`https://dct-ticket-master.herokuapp.com/customers/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.hasOwnProperty('errors')) {
                    alert('response.data.message')
                } else {
                    this.props.history.push(`/customers/${this.state.customer._id}`)
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Edit Customers</h2>
                {!this.state.isLoading && <CustomerForm customer={this.state.customer} isEdit={true} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default CustomerEdit;