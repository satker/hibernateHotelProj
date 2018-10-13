import React from "react";
import {Button} from "reactstrap";

const URL_DELETE = "http://localhost:8080/admin/_admin_/users/_user_/confirms/_id_";

export default class ItemConfirmed extends React.Component {
    async deleteConfirm() {
        await fetch(URL_DELETE
                .replace("_user_", this.props.user.id)
                .replace("_admin_", this.props.me.id)
                .replace("_id_", this.props.order.id),
            {
                method: "delete",
                credentials: "include",
            });
        this.props.refresh();
    }

    render() {
        let order = this.props.order;
        return (
            <tr>
                <td>{order.request.arrivalDate}</td>
                <td>{order.request.departureDate}</td>
                <td>{order.room.roomType.name}</td>
                <td>{order.room.number}</td>
                <td>{order.room.numberPlace}</td>
                <td>{order.room.costNight}</td>
                {this.props.me.role === "ROLE_ADMIN" && <td>
                    <Button className="btn-danger" onClick={() => this.deleteConfirm()}>Delete</Button>
                </td>}
            </tr>
        );
    }
};
