import React, {Component} from 'react';
import {Button} from "reactstrap";

const URL_DELETE = "http://localhost:8080/user/_user_/orders/_id_";
const URL_ROOMS = "http://localhost:8080/admin/appartments/_id_/rooms";
const URL_CONFIRM = "http://localhost:8080/admin/users/_id_/confirms";

export default class ItemOrder extends Component {
    constructor(props) {
        super(props);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.adminConfirm = this.adminConfirm.bind(this);
        this.state = {rooms: null};
    }

    async componentDidMount() {
        if(this.props.me.role === "ROLE_ADMIN") {
            let resp = await fetch(URL_ROOMS.replace("_id_", this.props.order.roomType.id), {
                credentials: "include",
            });
            let text = await resp.text();
            console.log(text);
            let rooms = JSON.parse(text);
            this.setState({rooms: rooms, roomNumber: rooms[0].number});
        }
    }

    async deleteOrder() {
        let url = URL_DELETE
            .replace("_user_", this.props.user.id)
            .replace("_id_", this.props.order.id);
        await fetch(url, {method: "delete"});
        this.props.refresh();
    }

    async adminConfirm() {
        let room = this.state.rooms.find(room => room.number == this.state.roomNumber);

        await fetch(URL_CONFIRM.replace("_id_", this.props.user.id), {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user: this.props.user,
                request: this.props.order,
                room: room,
            }),
        });

        this.props.refresh();
    }

    confirmButton() {
        if (this.props.me.role === "ROLE_ADMIN") {
            let select = null;
            if (this.state.rooms) {
                select = this.state.rooms.map(room => <option value={room.number}>{room.number}</option>);
            }
            return <td>
                <select onChange={(evt)=>this.setState({roomNumber: evt.target.value})}>{select}</select>
                <Button className="btn-success" onClick={this.adminConfirm}>Confirm</Button>
            </td>
        }
    }

    render() {
        let order = this.props.order;

        if (order.idDone) {
            return null;
        }

        return (
            <tr>
                <td>{order.idDone ? "Done" : "Pending"}</td>
                <td>{order.capacity}</td>
                <td>{order.arrivalDate}</td>
                <td>{order.departureDate}</td>
                <td>{order.roomType.name}</td>
                <td>{order.roomType.description}</td>
                <td><Button className="btn-danger" onClick={this.deleteOrder}>Delete</Button></td>
                {this.confirmButton()}
            </tr>
        );
    }
};