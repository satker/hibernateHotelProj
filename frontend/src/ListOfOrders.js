import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import ItemOrder from './ItemOrder';
import CreateRequest from "./CreateRequest";

const URL = "http://localhost:8080/user/_id_/orders";

export default class ListOfRooms extends Component {
    constructor(props) {
        super(props);
        this.loadOrders = this.loadOrders.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            list: null,
            rooms: null,
            modal: false,
            currentOrderRooms: null
        };
    }

    componentDidMount() {
        this.loadOrders();
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    async loadOrders() {
        let resp = await fetch(URL.replace("_id_", this.props.user().id));
        let data = await resp.text();
        console.log(data);
        this.setState({list: JSON.parse(data)});
    }

    render() {
        let closeModal = () => this.setState({open: false});

        if (!this.state.list) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <div>
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
                            refresh={() => this.loadOrders()}
                            rooms={this.state.rooms}
                            onClickSeeDetails={() => {
                                this.setState({currentOrderRooms: order.rooms});
                                this.setState({modal: !this.state.modal});
                                console.log(this.state.currentOrderRooms);
                            }}
                        />)}
                </Table>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>Rooms for order</ModalHeader>
                        <ModalBody>
                            {this.state.currentOrderRooms !== null ?
                                <Table hover>
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
                                    <tbody>
                                    {
                                        this.state.currentOrderRooms.map(room =>
                                        <CreateRequest
                                            me={this.props.me()}
                                            user={this.props.user()}
                                            room={room}
                                            setScreen={this.props.setScreen}
                                            refresh={() => this.loadOrders()}
                                            rooms={this.state.currentOrderRooms}
                                        />)
                                    }
                                    </tbody>
                                </Table>
                                : null}
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Submit" color="primary" className="btn btn-primary"/>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }

};
