import React from "react";
import Switcher from 'react-switcher';
import {Button, Col, Container, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";

import ItemRoom from "./ItemRoom";

const URL = "http://localhost:8080/user/_id_/orders";

export default class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            adults: null,
            children: null,
            numbersOfRooms: null,
            arrivalDate: null,
            departureDate: null,
            findRooms: null,
            selectedRooms: [],
            paymentStep: false,
            isOnlinePayment: false,
            isBooked: false,
            isLocal: null,
            months: null,
            years: null,
            totalPrice: null,
            checked: false,
            modal: false,
            currentRoom: null,
            listOfParameters: [],
        };
    }

    async componentDidMount() {
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
        let foundRooms = JSON.parse(text);
        let parsedSelectedRooms = this.state.selectedRooms.map(room => room.id);
        this.setState({findRooms: foundRooms.filter(room => !parsedSelectedRooms.includes(room.id))});
    }

    handleShow() {
        this.setState({modal: true});
    }

    handleClose() {
        this.setState({modal: false});
    }

    render() {
        return (
            <div>
                {!this.state.paymentStep ?
                    this.formToFindRooms() : null
                }

                {!this.state.paymentStep && this.state.selectedRooms != null && this.state.selectedRooms.length !== 0 ?
                    this.selectedRoomsTable()
                    : null
                }

                {this.state.paymentStep && this.state.selectedRooms != null && this.state.selectedRooms.length !== 0 ?
                    this.roomsForPayedTable()
                    : null
                }

                {!this.state.paymentStep && this.state.findRooms != null && this.state.findRooms.length !== 0 ?
                    this.foundRoomsTable()
                    : null
                }

                {this.state.currentRoom !== null ?
                    <Modal isOpen={this.state.modal}>
                        <ModalHeader>
                            {this.state.currentRoom.roomType.name} room</ModalHeader>
                        <ModalBody>

                            <p>
                                <label>Room Size: {this.state.currentRoom.roomSize} m²</label>
                            </p>
                            <p>
                                <label>Description: {this.state.currentRoom.roomType.description}</label>
                            </p>
                            <hr/>
                            <p>
                                <label>Room Facilities:</label><br/>
                                {this.state.currentRoom.parameters.map(p => {
                                    return (<p>• {p}</p>
                                    )
                                })
                                }
                            </p>
                        </ModalBody>
                        < ModalFooter>
                            <Button color="danger" onClick={this.handleClose}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    : null}
            </div>
        );
    }

    formToFindRooms() {
        let selectChildren = null;
        let selectAdult = null;
        let selectNumbersOfRooms = null;

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
            <h2>Make an order:</h2>
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
            </Container>
            <input className="btn btn-success" type="submit" value="Find available rooms"/>
        </Form>
    }

    roomsForPayedTable() {
        return <Container>
            <Table hover>
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
                        isModal={true}

                        onClickSeeDetails={() => {
                            this.setState({currentRoom: room});
                            this.handleShow();
                        }}
                    />)}
                </tbody>
            </Table>
            <h2>Total price: {this.state.totalPrice}</h2>

            <p>
                {this.state.isLocal === null ?
                    <div>
                        {this.setState({isBooked: true})}
                        {this.setState({isOnlinePayment: false})}
                        {this.setState({isLocal: false})}
                    </div>
                    : null}
                Payed type:
                {this.state.isLocal !== null ?
                    <Switcher
                        on={this.state.isLocal}
                        onClick={() => {
                            this.setState({isLocal: !this.state.isLocal});
                            if (this.state.isLocal) {
                                this.setState({isBooked: true});
                                this.setState({isOnlinePayment: false});
                            } else {
                                this.setState({isBooked: false});
                                this.setState({isOnlinePayment: true});
                            }
                        }}
                    >
                        Choose {this.state.isBooked ? 'book rooms' : 'online payment'}
                    </Switcher>
                    : null}
            </p>
            <p>
                {this.state.isBooked ?
                    <Button onClick={this.createOrder}>Book rooms and back to main page</Button>
                    : null}

                {this.state.isOnlinePayment ?
                    this.creditCardForm()
                    : null}
            </p>
        </Container>
    }

    selectedRoomsTable() {
        return <Container>
            <Table hover>
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
                            this.handleShow();
                        }}

                        onClickOnCheckBox={() => {
                            this.setState({checked: false});
                            const isChosed = this.state.findRooms.includes(room);
                            if (!isChosed) {
                                this.setState({
                                    findRooms: [...this.state.findRooms, room]
                                });
                                this.removeRoomFromSelectedRoms(room);
                            }
                        }}

                    />)}
                </tbody>
                {
                    this.state.selectedRooms.length !== 0 && !this.state.paymentStep && this.state.arrivalDate !== null && this.state.departureDate !== null ?
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
            </Table>
        </Container>
    }

    foundRoomsTable() {
        return <Container>
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
                            this.handleShow();
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
        </Container>
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

        return <Form>
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
            <Button onClick={this.createOrder}>Pay and back to main page</Button>
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

        if (this.state.isBooked) {
            body.orderStatus = "IN_PROGRESS";
            body.payedType = "ONLINE";
            body.isPaid = true;
        }
        if (this.state.isOnlinePayment) {
            body.orderStatus = "BOOKED";
            body.payedType = "BOOKED";
            body.isPaid = false;
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
