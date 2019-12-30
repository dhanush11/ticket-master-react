import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class CustomerShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
    }



    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`https://dct-ticket-master.herokuapp.com/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const customer = response.data;
                this.setState(() => ({ customer }))
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleBack = () => {
        this.props.history.push("/customers")
    }

    handleRemove() {
        const confirmRemove = window.confirm("Are you sure ?")
        if (confirmRemove) {
            const id = this.props.match.params.id
            axios.delete(`https://dct-ticket-master.herokuapp.com/customers/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.props.history.push('/customers')
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <div>
                <h2>Showing customer details </h2>
                <h3>{this.state.customer.name}</h3>
                <p>{this.state.customer.email}</p>
                <p>{this.state.customer.mobile}</p>
                <Link to={`/customers/edit/${this.state.customer._id}`}>Edit</Link> or
                <button onClick={this.handleRemove}>Remove</button> or
            < button onClick={this.handleBack} > Back</button >
            </div >
        )
    }
}

export default CustomerShow
