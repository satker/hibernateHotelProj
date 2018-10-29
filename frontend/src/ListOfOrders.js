import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import ItemOrder from './ItemOrder';
import ItemRoom from "./ItemRoom";

const URL = "http://localhost:8080/user/_id_/orders";

export default class ListOfRooms extends Component {
    constructor(props) {
        super(props);
        this.loadOrders = this.loadOrders.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

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

    async loadOrders() {
        let resp = await fetch(URL.replace("_id_", this.props.user().id));
        let data = await resp.text();
        console.log(data);
        this.setState({list: JSON.parse(data)});
    }

    handleShow() {
        this.setState({modal: true});
    }

    handleClose() {
        this.setState({modal: false});
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
                                this.handleShow();
                                console.log(this.state.currentOrderRooms);
                            }}
                        />)}
                </Table>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>Rooms for order</ModalHeader>
                    <ModalBody>
                        {this.state.currentOrderRooms !== null ?
                            <Table hover>
                                <thead>
                                <tr>
                                    <th>Room type</th>
                                    <th>Adults</th>
                                    <th>Children</th>
                                    <th>Night cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.currentOrderRooms.map(room =>
                                        <ItemRoom
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
                        <Button color="danger" onClick={this.handleClose}>Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};
