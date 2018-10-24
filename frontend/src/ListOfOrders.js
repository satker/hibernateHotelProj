import React, {Component} from 'react';
import {Table} from 'reactstrap';
import ItemOrder from './ItemOrder';

const URL = "http://localhost:8080/user/_id_/orders";

export default class ListOfRooms extends Component {
    constructor(props) {
        super(props);
        this.loadOrders = this.loadOrders.bind(this);
        this.state = {list: null, rooms: null};
    }

    componentDidMount() {
        this.loadOrders();
    }

    async loadOrders() {
        let resp = await fetch(URL.replace("_id_", this.props.user().id));
        let data = await resp.text();
        console.log(data);
        this.setState({list: JSON.parse(data)});
    }

    render() {
        if (!this.state.list) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <Table hover>
                <thead>
                <tr>
                    <th>Order №</th>
                    <th>Arrival date</th>
                    <th>Departure date</th>
                    <th>Payment type</th>
                    <th>Payment status</th>
                    <th>Order status</th>
                    <th>Number of rooms</th>
                    <th>Total price</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>

                {this.state.list.map(order =>
                    <ItemOrder
                        me={this.props.me()}
                        user={this.props.user()}
                        order={order}
                        setScreen={this.props.setScreen}
                        refresh={()=>this.loadOrders()}
                        rooms={this.state.rooms}
                    />)}
            </Table>
        );
    }
};