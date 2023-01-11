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
        this.params = {}
        this.state = {
            users: []
        }
    }

     componentDidMount() {
        this.loadUser()
    }

    loadUser = async () => {
        try {
            const { data } = await request.get('users', { params: this.params })
            this.setState({
                users:[ ...(this.params.page === 1 ? [] : this.state.users), ...data.data.result.map(item => {
                    item.sent = true
                    return item
                })]
            })
            this.params.page = data.data.page
            this.params.totalPage = data.data.totalPage

        } catch (error) {
            console.log(error)
        }
    }

    addUser = ({ name, phone }) => {
        // console.log(name,phone,'ini userphone')
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
            if (data.success) {
                this.setState((state) => ({
                    users: state.users.filter(item => item.id != id)
                }))
            } else {
                alert('delete failure')
            }
        } catch (error) {

        }
    }

    resendUser = async ({ id, name, phone }) => {
        console.log(id, name, phone, 'resend')
        try {
            const { data } = await request.post(`users`, { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    users: state.users.map(item => {
                        if (item.id == id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            } else {
                console.log(data.data)
            }
        } catch (error) {
            console.log(error)
        }

    }

    updateUser = (id, name, phone) => {
        axios.put(`http://localhost:3000/users/${id}`, {
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
        })

    }

    loadMore = () => {
        if (this.params.page <= this.params.totalPage) {
            this.params = { ...this.params, page: this.params.page + 1 }
        }
        this.loadUser()
    }

    searchUser = (query = {}) => {
        console.log(query)
        this.params = { ...this.params, ...query, page: 1 }
        this.loadUser()
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center"> Phone Book Apps</h1>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="card">
                                <div className="card-header">
                                    <strong className=""> Searching</strong>
                                </div>
                                <UserForm submit={this.searchUser} submitLabel="search" nameType="text" />
                            </div>
                            <hr />
                            <div className="card card-header my-3">
                                <strong className="card-header"> Add User</strong>
                                <UserForm submit={this.addUser} />
                            </div>
                        </div>

                        <div className="card-footer">

                            <UserList data={this.state.users}
                                remove={this.removeUser}
                                resend={this.resendUser}
                                update={this.updateUser}
                                loadUser={this.loadMore}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}