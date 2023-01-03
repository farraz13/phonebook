export default function UserItem(props){
    return(
        <tr>
        <td>{props.no}</td>
        <td>{props.name}</td>
        <td>{props.phone}</td>
        <td>{props.actions}</td>
        <td ><button type="button" className="btn btn-dark ">edit</button></td>

    </tr>
    
    )
}