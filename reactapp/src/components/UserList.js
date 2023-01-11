import UserItem from "./UserItem"
import React from "react"
export default function UserList(props) {
    
    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight)
        {
            props.loadUser()
        }
    }

    return (
        <div onScroll={scrolling} style={{overflow: 'scroll', height: 200}}>
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
                            user={user}
                            remove={() => props.remove(user.id)}
                            resend={() => props.resend(user)}
                            update={(name, phone) => props.update(user.id, name, phone)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
} 