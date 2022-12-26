import { Component } from "react";

export default class UserBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [
                { name: "farraz", phone: "03093704914" },
                { name: "ujang", phone: "0398404783984" }
            ],
            name:'',
            phone:''
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

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center"> Phone Book Apps</h1>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control form-control-sm" id="name" placeholder="name" onChange={this.handleInputChange} value={this.state.name} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">phone</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="phone" placeholder="phone number" onChange={this.handleInputChange} value={this.state.phone}/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">save</button>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <th>no</th>
                            <th>name</th>
                            <th>phone</th>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="card-footer">
                    </div>
                </div>
            </div>
        )
    }
}