import React from "react"

export default function UserItem(props) {
    // console.log(props.user,'ini props')
    return (
        <tr>
            <td>{props.no}</td>
            <td>{props.user.name}</td>
            <td>{props.user.phone}</td>
            <td>
                <button type="button" className="btn btn-dark mx-2">edit</button>
                <button type="button" className={props.user.sent ? 'btn btn-danger' : 'btn btn-warning'}
                    onClick={props.user.sent ? props.remove : props.resend}>
                    {props.user.sent ? 'Delete' : 'Resend'}
                </button>
            </td>
        </tr>

    )
}