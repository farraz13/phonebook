import { Component } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import axios from "axios"

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class UserBox extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            users: [] 
        }
    }

    async componentDidMount() {
        try {
            const { data } = await request.get('users')
            this.setState({ users: data.data })
        } catch (error) {
            console.log(error)
        }
    }

    addUser = ({ name, phone }) => {
        console.log(name,phone,'ini userphone')
        const id = Date.now()
        this.setState(function (state) {
            return {
                users: [
                    ...state.users,
                    {
                        id,
                        name,
                        phone,
                        sent: true
                    }]
            }
        })
       
       

        axios.post('http://localhost:3000/users', {
            name,
            phone
        }).then((data) => {
            this.setState(function (state) {
                return {
                    users:
                        state.users.map(item => {
                            if (item.id === id) {
                                return {
                                    id: data.data.data.id,
                                    name: data.data.data.name,
                                    phone: data.data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                }
            })
        }).catch(() => {
            this.setState(function (state) {
                return {
                    users:
                        state.users.map(item => {
                            if (item.id === id) {
                                return { ...item, sent: false }
                            }
                            return item
                        })
                }
            })
        });
    }

    removeUser = async (id) => {
        try {
            const { data } = await request.delete(`users/${id}`)
            if(data.success){
                this.setState((state) =>({
                    users: state.users.filter(item => item.id != id)
                }))
            } else {
                alert ('delete failure')
            }
        } catch (error) {
            
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center"> Phone Book Apps</h1>
                    </div>
                    <div>
                        <UserForm
                            add={this.addUser}
                        />
                    </div>
                    <div className="card-footer">
                        <UserList data={this.state.users} remove = {this.removeUser} />
                    </div>
                </div>
            </div>
        )
    }
}