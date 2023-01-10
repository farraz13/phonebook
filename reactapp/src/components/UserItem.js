import React, { Component, Fragment } from "react"

export default class UserItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.user.name,
            phone: props.user.phone,
            isEdit: false
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

    handleEdit = () => {
        this.setState({
            isEdit: true
        });
    }

    handleCancel = () => {
        this.setState({
            isEdit: false
        });
    }
    saveEdit = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({
            isEdit: false
        });
    }

    render() {
        // console.log(props.user,'ini props')
        return (
            <tr>
                <td>{this.props.no}</td>

                {this.state.isEdit ?
                    <Fragment>
                        <td>
                            <input
                            className=""
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="insert name"
                                onChange={this.handleInputChange} />
                                </td>
                                <td>
                            <input
                            className="mx-2"
                                type="text"
                                name="phone"
                                value={this.state.phone}
                                placeholder="insert phone"
                                onChange={this.handleInputChange} />
                        </td>
                    </Fragment>

                    :
                    <Fragment>
                        <td>{this.props.user.name}</td>

                        <td>{this.props.user.phone}</td>
                    </Fragment>
                }

                {this.props.user.sent ?
                    this.state.isEdit ?
                        <td>
                            <button type="button" className="btn btn-dark mx-2" onClick={this.saveEdit}>save</button>
                            <button type="button" className="btn btn-warning mx-2" onClick={this.handleCancel}>cancel</button>
                        </td>
                        :
                        <td>
                            <button type="button" className="btn btn-success mx-2" onClick={this.handleEdit}>edit</button>
                            <button type="button" className="btn btn-danger mx-2" onClick={this.props.remove}>delete</button>
                        </td>
                    :

                    <td>
                        <button type="button" className="btn btn-warning mx-2" onClick={this.props.resend}>resend</button>
                    </td>
                }
            </tr>

        )
    }
}
