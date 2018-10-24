import React, {Component} from 'react';
import {Button, Table} from "reactstrap";
import CreateRequest from "./CreateRequest";

const URL_REJECT = "http://localhost:8080/user/_user_/orders/_id_";
const URL_ROOMS = "http://localhost:8080/admin/appartments/_id_/rooms";
const URL_CONFIRM = "http://localhost:8080/admin/users/_id_/confirms";

export default class ItemOrder extends Component {
    constructor(props) {
        super(props);
        this.rejectOrder = this.rejectOrder.bind(this);
        this.adminConfirm = this.adminConfirm.bind(this);
        this.state = {
            rooms: null,
            roomsByOrder: null
        };
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

    async rejectOrder() {
        let url = URL_REJECT
            .replace("_user_", this.props.user.id)
            .replace("_id_", this.props.order.id);
        await fetch(url, {method: "delete"});
        this.props.refresh();
    }

    async seeDetails(){
        if (this.state.roomsByOrder !== null) {
            this.state.roomsByOrder.forEach((elen) => console.log(elen.number));
            //if (this.state.roomsByOrder !== null) {
            return <Table hover>
                <thead>
                <tr>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Night cost</th>
                    <th>Room number</th>
                    <th>Room type</th>
                    <th>Room type description</th>
                </tr>
                </thead>
                <tbody>{this.state.roomsByOrder.map(room =>
                    <CreateRequest
                        me={this.props.me()}
                        user={this.props.user()}
                        room={room}
                        setScreen={this.props.setScreen}
                        refresh={() => this.loadOrders()}
                        rooms={this.state.roomsByOrder}
                    />)}
                </tbody>
            </Table>
        }
        //}
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
        return (
            <tbody>
                <tr>
                <td>{order.id}</td>
                <td>{order.arrivalDate}</td>
                <td>{order.departureDate}</td>
                <td>{order.payedType}</td>
                <td>{order.isPaid ? "Payed" : "Not payed"}</td>
                <td>{order.orderStatus}</td>
                <td>{order.rooms.length}</td>
                <td>{order.totalPrice}</td>
                <td><Button onClick={() => {
                    console.log(order.rooms);
                    this.setState({roomsByOrder: this.props.order.rooms});
                    this.seeDetails();
                }}>See Details</Button></td>
                <td><Button className="btn-danger" onClick= {this.rejectOrder}>Delete</Button></td>
                {this.confirmButton()}
                </tr>
            </tbody>
        );
    }
};