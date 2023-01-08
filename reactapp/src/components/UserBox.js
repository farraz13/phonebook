import { Component } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import axios from "axios"

export default class UserBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try {
            const {data} = await axios.get('http://localhost:3000/users')
            this.setState({users: data.data})
        } catch (error) {
            console.log(error)
        }
    }

    addUser = async (name, phone) => {
        this.setState(function (state, props) {
            return {
                users:
                    [
                    {
                        name,
                        phone
                    },
                    ...state.users,
                    ]
            }
        })

            try {
                const {data} = await axios.post('http://localhost:3000/users',{name, phone})
                this.setState({users: data.data})
            } catch (error) {
                console.log(error)
            }
        
    
        // fetch('http://localhost:3000/users', {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, phone }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // console.log("ini data",data.data)
        //         // this.setState({ users: [data.data] })
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // fetch('http://localhost:3000/users')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         this.setState({ users: data })
        //     })
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
                    <div className="card-footer ">
                <UserList data={this.state.users} />
                    </div>
                </div>
            </div>
        )
    }
}