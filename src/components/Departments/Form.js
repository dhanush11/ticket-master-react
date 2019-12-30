import React from 'react';

class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }

        this.props.handleSubmit(formData)
    }

    clearInput() {
        this.setState({ name: '' })
    }

    handleNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="department name" value={this.state.name} onChange={this.handleNameChange} />
                <input type="submit" value="Add" />
            </form>
        )
    }
}

export default DepartmentForm;