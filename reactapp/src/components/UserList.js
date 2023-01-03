import UserItem from "./UserItem"

export default function UserList(props) {
    console.log(props)
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
                        <UserItem key={index} no={index + 1} name={user.name} phone={user.phone} />
                    ))}
                </tbody>
            </table>
        </div>
    )
} 