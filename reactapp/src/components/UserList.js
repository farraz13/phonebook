import UserItem from "./UserItem"
import React from "react"
export default function UserList(props) {
    // console.log(props, 'ini props')
    return (
        <div className="card"  >
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>no</th>
                        <th>name</th>
                        <th>phone</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>

                    {props.data.map((user, index) => (
                        <UserItem
                            key={user.id}
                            no={index + 1}
                            user= {user}
                            remove={() => props.remove(user.id)}
                            resend={() => props.resend(user)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
} 