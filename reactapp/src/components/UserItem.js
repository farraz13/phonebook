export default function UserItem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>{props.actions}
                <button type="button" className="btn btn-dark mx-2">edit</button>
                <button type="button" className="btn btn-danger">delete</button>
            </td>
        </tr>

    )
}