import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table, Tooltip} from 'reactstrap';
import ItemOrder from './ItemOrder';
import ItemRoom from "./ItemRoom";

const URL = "http://localhost:8080/user/_id_/orders";

export default class ListOfOrders extends Component {
    constructor(props) {
        super(props);
        this.loadOrders = this.loadOrders.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.tooltypeOpenAdults = this.tooltypeOpenAdults.bind(this);
        this.tooltypeOpenChildren = this.tooltypeOpenChildren.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            list: null,
            rooms: null,
            modal: false,
            currentOrderRooms: null,
            tooltipOpenAdults: false,
            tooltipOpenChildren: false
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

    tooltypeOpenAdults() {
        this.setState({
            tooltipOpenAdults: !this.state.tooltipOpenAdults
        });
    }

    tooltypeOpenChildren() {
        this.setState({
            tooltipOpenChildren: !this.state.tooltipOpenChildren
        });
    }

    tableWithOrders(){
        if (this.state.list.length !== 0) {
            return <Table hover>
                <thead>
                <tr>
                    <th>Order №</th>
                    <th>Hotel name</th>
                    <th>Arrival date</th>
                    <th>Departure date</th>
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
        }
    }

    showModal(){
        return <Modal isOpen={this.state.modal}>
            <ModalHeader>Rooms for order</ModalHeader>
            <ModalBody>
                {this.state.currentOrderRooms !== null ?
                    <Table hover>
                        <thead>
                        <tr>
                            <th>
                                Sleeps{' '}
                                <span style={{textDecoration: "underline", color: "white"}} id="TooltipAdults">(*</span>
                                <Tooltip placement="top" isOpen={this.state.tooltipOpenAdults} target="TooltipAdults"
                                         toggle={this.tooltypeOpenAdults}>
                                    Number of adults
                                </Tooltip>
                                {' '}+{' '}
                                <span style={{textDecoration: "underline", color: "white"}} id="TooltipChildren">*)</span>
                                <Tooltip placement="top" isOpen={this.state.tooltipOpenChildren} target="TooltipChildren"
                                         toggle={this.tooltypeOpenChildren}>
                                    Number of children
                                </Tooltip>
                            </th>
                            <th>Room type</th>
                            <th>Room №</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.currentOrderRooms.map(room =>
                                <ItemRoom
                                    me={this.props.me()}
                                    user={this.props.user()}
                                    roomNumber={true}
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
    }
    render() {
        if (!this.state.list) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <div>
                {this.state.list.length !== 0 ? this.tableWithOrders() : "You don't have any order"}
                {this.showModal()}
            </div>
        );
    }
};
