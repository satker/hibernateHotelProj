import React, {Component} from 'react';
import {Button} from "reactstrap";

const URL_REJECT = "http://localhost:8080/user/_user_/orders/_id_";
const URL_ROOMS = "http://localhost:8080/admin/appartments/_id_/rooms";
const URL_CONFIRM = "http://localhost:8080/admin/users/_id_/confirms";

export default class ItemOrder extends Component {
    state = {
      rooms: null,
      isDetailsOpened: false
    };

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

    rejectOrder = async () => {
        let url = URL_REJECT
            .replace("_user_", this.props.user.id)
            .replace("_id_", this.props.order.id);
        await fetch(url, {method: "delete"});
        this.props.refresh();
    };

    adminConfirm = async () => {
        let room = this.state.rooms.find(room => room.number === this.state.roomNumber);

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
    };

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
        return (
            <tbody>
                <tr>
                <td>{order.id}</td>
                <td>{order.arrivalDate}</td>
                <td>{order.departureDate}</td>
                <td>{order.isPaid ? "Payed" : "Not payed"}</td>
                <td>{order.orderStatus}</td>
                <td>{order.rooms.length}</td>
                <td>{order.totalPrice}</td>
                <td><Button onClick={ this.props.onClickSeeDetails }>See Details</Button></td>
                <td><Button className="btn-danger" onClick= {this.rejectOrder}>Delete</Button></td>
                {this.confirmButton()}
                </tr>
            </tbody>
        );
    }
};