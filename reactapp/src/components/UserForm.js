import { Component } from "react";

export default class UserForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
       this.props.add(this.state.name, this.state.phone)
        this.setState({ name: '', phone: '' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="card-body">
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="name" name="name" placeholder="" onChange={this.handleInputChange} value={this.state.name} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="phone" name="phone" placeholder="" onChange={this.handleInputChange} value={this.state.phone} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">save</button>
            </form>
        )
    }
}