import React from "react";
import {Button, Col, Container, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";

import ItemRoom from "./ItemRoom";

const URL = "http://localhost:8080/user/_id_/orders";

export default class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            roomTypes: null,
            adults: null,
            children: null,
            numbersOfRooms: null,
            arrivalDate: null,
            departureDate: null,
            findRooms: null,
            selectedRooms: [],
            paymentStep: false,
            isOnlinePayment: false,
            isCashPayment: false,
            isBooked: false,
            months: null,
            years: null,
            totalPrice: null,
            checked: false,
            modal: false,
            currentRoom: null
        };
    }

    async componentDidMount() {
        let resp = await fetch(URL.replace("_id_", this.props.me().id) + "/appartments");
        let text = await resp.text();
        let types = JSON.parse(text);
        this.setState({roomTypes: types, roomType: types[0].name});

        let numbersForAdultsAndNumberOfRooms = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        let numbersForChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let year = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        this.setState({adults: numbersForAdultsAndNumberOfRooms, adult: numbersForAdultsAndNumberOfRooms[0]});
        this.setState({children: numbersForAdultsAndNumberOfRooms, child: numbersForAdultsAndNumberOfRooms[0]});
        this.setState({numbersOfRooms: numbersForChildren, numberOfRooms: numbersForChildren[0]});
        this.setState({months: month, month: month[0]});
        this.setState({years: year, year: month[0]});
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    async onSubmit(evt) {
        evt.preventDefault();
        let body = {};
        for (let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }
        body.roomType = this.state.roomTypes.find(room => room.name === this.state.roomType);
        body.adults = this.state.adult;
        body.children = this.state.child;
        body.numbersOfRooms = this.state.numberOfRooms;

        this.setState({arrivalDate: this.state["arrivalDate"]});
        this.setState({departureDate: this.state["departureDate"]});

        let resp = await fetch(URL.replace("_id_", this.props.me().id) + "/rooms", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let text = await resp.text();
        console.log(text);
        this.setState({findRooms: JSON.parse(text)});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                {this.formToFindRooms()}

                {!this.state.paymentStep && this.state.findRooms != null ?
                    this.findedRoomsTable()
                    : null
                }

                {this.state.selectedRooms != null ?
                    this.selectedRoomsTable()
                    : null
                }

                {this.state.selectedRooms.length !== 0 && !this.state.paymentStep && this.state.arrivalDate !== null && this.state.departureDate !== null ?
                    <Button
                        onClick={() => {
                            this.getPrice();
                            this.setState({paymentStep: true});
                            this.snoozeRooms();
                        }
                        }>Choose payment method
                    </Button>
                    : null
                }

                {this.state.paymentStep ?
                    <h2>Total price: {this.state.totalPrice}</h2>
                    : null
                }

                {this.state.paymentStep && !(this.state.isOnlinePayment || this.state.isCashPayment) ?
                    <Button onClick={() => this.setState({isOnlinePayment: true})}>Online payment</Button>
                    : null
                }

                {this.state.paymentStep && !(this.state.isOnlinePayment || this.state.isCashPayment) ?
                    <Button onClick={() => this.setState({isCashPayment: true})}>Cash payment</Button>
                    : null
                }

                {this.state.paymentStep && !(this.state.isOnlinePayment || this.state.isCashPayment) ?
                    <Button onClick={() => this.setState({isBooked: true})}>Book rooms</Button>
                    : null
                }

                {this.state.isOnlinePayment ?
                    this.creditCardForm()
                    : null}

                {this.state.isCashPayment ?
                    <Form className="wide-form" onSubmit={this.createOrder}>
                        <input className="btn btn-success" type="submit" value="Back to main page"/>
                    </Form>
                    : null}
                {this.state.isBooked ?
                    <Form className="wide-form" onSubmit={this.createOrder}>
                        <input className="btn btn-success" type="submit" value="Book rooms and back to main page"/>
                    </Form>
                    : null}
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>Rooms for order</ModalHeader>
                        <ModalBody>
                            {this.state.currentRoom !== null ?
                                <Table hover>
                                    <thead>
                                    <tr>
                                        <th>Room Type</th>
                                        <th>Description</th>
                                        <th>Photos</th>
                                        <th>Room number</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <td>{this.state.currentRoom.roomType.name}</td>
                                    <td>{this.state.currentRoom.roomType.description}</td>
                                    <td>Place for photos</td>
                                    <td>{this.state.currentRoom.number}</td>
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

    formToFindRooms() {
        let selectType = null;
        let selectChildren = null;
        let selectAdult = null;
        let selectNumbersOfRooms = null;

        if (this.state.roomTypes) {
            selectType = this.state.roomTypes.map(type => <option value={type.name}>{type.name}</option>);
        }

        if (this.state.children) {
            selectChildren = this.state.children.map(child => <option value={child}>{child}</option>);
        }

        if (this.state.adults) {
            selectAdult = this.state.adults.map(adult => <option value={adult}>{adult}</option>);
        }

        if (this.state.numbersOfRooms) {
            selectNumbersOfRooms = this.state.numbersOfRooms.map(numberOfRooms => <option
                value={numberOfRooms}>{numberOfRooms}</option>);
        }

        return <Form className="wide-form" onSubmit={this.onSubmit}>
            <h2>Create request:</h2>
            <Container>
                <Row>
                    <Col>Number of rooms</Col>
                    <Col>
                        <select onChange={this.onChange} name="numberOfRooms">{selectNumbersOfRooms}</select>
                    </Col>
                </Row>
                <Row>
                    <Col>Children</Col>
                    <Col>
                        <select onChange={this.onChange} name="child">{selectChildren}</select>
                    </Col>
                </Row>
                <Row>
                    <Col>Adults</Col>
                    <Col>
                        <select onChange={this.onChange} name="adult">{selectAdult}</select>
                    </Col>
                </Row>
                <Row>
                    <Col>Arrival date</Col>
                    <Col><input onChange={this.onChange} type="date" name="arrivalDate"/></Col>
                </Row>
                <Row>
                    <Col>Departure date</Col>
                    <Col><input onChange={this.onChange} type="date" name="departureDate"/></Col>
                </Row>
                <Row>
                    <Col>Room type</Col>
                    <Col>
                        <select onChange={this.onChange} name="roomType">{selectType}</select>
                    </Col>
                </Row>
            </Container>
            <input className="btn btn-success" type="submit" value="Find available rooms"/>
        </Form>
    }

    selectedRoomsTable() {
        return <Table hover>
            <thead>
            <tr>
                <th>Room type</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Night cost</th>
            </tr>
            </thead>
            <tbody>{this.state.selectedRooms.map(room =>
                <ItemRoom
                    me={this.props.me()}
                    room={room}
                    setScreen={this.props.setScreen}
                    refresh={() => this.loadOrders()}
                    rooms={this.state.selectedRooms}
                    isCheckBox={true}
                    isModal={true}
                    checked={true}

                    onClickSeeDetails={() => {
                        this.setState({currentRoom: room});
                        this.setState({modal: !this.state.modal});
                    }}

                    onClickOnCheckBox={() => {
                        this.setState({checked: false});
                        this.setState({
                            findRooms: [...this.state.findRooms, room]
                        });
                        this.removeRoomFromSelectedRoms(room);
                    }}

                />)}
            </tbody>
        </Table>
    }

    findedRoomsTable() {
        return <Table hover>
            <thead>
            <tr>
                <th>Room type</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Night cost</th>
            </tr>
            </thead>
            <tbody>
            {this.state.findRooms.map(room =>
                <ItemRoom
                    me={this.props.me()}
                    room={room}
                    setScreen={this.props.setScreen}
                    refresh={() => this.loadOrders()}
                    rooms={this.state.rooms}
                    isCheckBox={true}
                    isModal={true}
                    checked={false}
                    onClickSeeDetails={() => {
                        this.setState({currentRoom: room});
                        this.setState({modal: !this.state.modal});
                    }}

                    onClickOnCheckBox={() => {
                        this.setState({checked: true});
                        console.log(this.props.checked);
                        const isChosed = this.state.selectedRooms.includes(room);
                        if (!isChosed) {
                            this.setState({
                                selectedRooms: [...this.state.selectedRooms, room]
                            });
                            this.removeRoomFromFindedRoms(room);
                        }
                    }
                    }
                />)}
            </tbody>
        </Table>

    }

    creditCardForm() {
        let selectYears = null;
        let selectMonths = null;


        if (this.state.years) {
            selectYears = this.state.years.map(year => <option
                value={year}>{year}</option>);
        }

        if (this.state.months) {
            selectMonths = this.state.months.map(month => <option
                value={month}>{month}</option>);
        }

        return <Form className="wide-form" onSubmit={this.createOrder}>
            <Container>
                <Row>
                    <Col>Card number: </Col>
                    <Col><input onChange={this.onChange} type="text" name="card_number"/></Col>
                </Row>
                <Row>
                    <Col>Date (month/year) : </Col>
                    <Col>
                        <select onChange={this.onChange} name="month">{selectMonths}</select>
                        /
                        <select onChange={this.onChange} name="year">{selectYears}</select>
                    </Col>
                </Row>
                <Row>
                    <Col>Owner name: </Col>
                    <Col><input onChange={this.onChange} type="text" name="capacity"/></Col>
                </Row>
                <Row>
                    <Col>CVC number: </Col>
                    <Col><input onChange={this.onChange} type="text" name="capacity"/></Col>
                </Row>
            </Container>
            <input className="btn btn-success" type="submit" value="Pay and back to main page"/>
        </Form>
    }

    removeRoomFromFindedRoms(room) {
        const newArray = this.state.findRooms.filter(r => r !== room);
        this.setState({findRooms: newArray});
    }

    removeRoomFromSelectedRoms(room) {
        const newArray = this.state.selectedRooms.filter(r => r !== room);
        this.setState({selectedRooms: newArray});
    }

    async createOrder() {
        let body = {};
        for (let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }

        body.isPaid = false;
        if (this.state.isBooked) {
            body.orderStatus = "BOOKED";
            body.payedType = "NOT_PAYED";
        }
        if (this.state.isCashPayment) {
            body.orderStatus = "IN_PROGRESS";
            body.payedType = "CASH";
        }
        if (this.state.isOnlinePayment) {
            body.orderStatus = "IN_PROGRESS";
            body.payedType = "ONLINE";
            body.isPaid = true;
        }

        body.totalPrice = this.state.totalPrice;
        body.rooms = this.state.selectedRooms;

        let resp = await fetch(URL.replace("_id_", this.props.me().id), {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let text = await resp.text();
        console.log(text);
        this.setState({findRooms: JSON.parse(text)});
        this.props.goBack();
    }

    async getPrice() {
        let body = {};
        for (let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }
        body.rooms = this.state.selectedRooms;

        let resp = await fetch(URL.replace("_id_", this.props.me().id) + "/price", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let text = await resp.text();
        let price = JSON.parse(text);
        this.setState({totalPrice: parseFloat(price)});
    }

    async snoozeRooms() {
        await fetch(URL.replace("_id_", this.props.me().id) + "/rooms/snooze", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(this.state.selectedRooms),
        });
    }
};