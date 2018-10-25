import React from "react";
import {Button, Col, Container, Form, Row, Table} from "reactstrap";

import CreateRequest from "./CreateRequest";

const URL = "http://localhost:8080/user/_id_/orders";

export default class ListOfAvailableRooms extends React.Component {
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
            totalPrice: null
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

    tableContent() {
        if (!this.state.list) {
            return <tr>
                <td>Loading...</td>
            </tr>
        }
        return this.state.list.map(conf => <CreateRequest refresh={() => this.load()} me={this.props.me()}
                                                          user={this.props.user()} room={conf}/>)
    }

    render() {
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

        return (
            <Form className="wide-form" onSubmit={this.onSubmit}>
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
                {this.state.findRooms != null ?
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
                        <tbody>{this.state.selectedRooms.map(room =>
                            <CreateRequest
                                me={this.props.me()}
                                user={this.props.user()}
                                room={room}
                                setScreen={this.props.setScreen}
                                refresh={() => this.loadOrders()}
                                rooms={this.state.selectedRooms}

                            />)}
                        </tbody>
                        {this.state.selectedRooms.length !== 0 && !this.state.paymentStep && this.state.arrivalDate !== null && this.state.departureDate !== null ?
                            <Button
                                onClick={() => {
                                    this.getPrice();
                                    this.setState({paymentStep: true})
                                }
                                }>Choose payment method
                            </Button>
                            : null
                        }
                        {!this.state.paymentStep ?
                            <tbody>{this.state.findRooms.map(room =>
                                <CreateRequest
                                    me={this.props.me()}
                                    user={this.props.user()}
                                    room={room}
                                    setScreen={this.props.setScreen}
                                    refresh={() => this.loadOrders()}
                                    rooms={this.state.rooms}
                                    onClick={() => {
                                        const isChosed = this.state.selectedRooms.includes(room);
                                        if (!isChosed) {
                                            this.setState({
                                                selectedRooms: [...this.state.selectedRooms, room]
                                            })
                                        }
                                    }
                                    }
                                />)}
                            </tbody>
                            : null
                        }
                    </Table>
                    : null
                }
                {this.state.paymentStep ?
                    <tbody>
                    <h2>Total price: {this.state.totalPrice}</h2>
                    </tbody>
                    : null
                }
                {this.state.paymentStep && !(this.state.isOnlinePayment || this.state.isCashPayment) ?
                    <td>
                        <Button onClick={() => this.setState({isOnlinePayment: true})}>Online payment</Button>
                    </td>
                    : null
                }
                {this.state.paymentStep && !(this.state.isOnlinePayment || this.state.isCashPayment) ?
                    <td>
                        <Button onClick={() => this.setState({isCashPayment: true})}>Cash payment</Button>
                    </td>
                    : null
                }

                {this.state.paymentStep && !(this.state.isOnlinePayment || this.state.isCashPayment) ?
                    <td>
                        <Button onClick={() => this.setState({isBooked: true})}>Book rooms</Button>
                    </td>
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
            </Form>
        );
    }

    creditCardForm (){
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

    async createOrder(evt) {
        let body = {};
        for (let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }

        body.isPaid = false;
        if (this.state.isBooked){
            body.orderStatus = "BOOKED";
            body.payedType = "NOT_PAYED";
        }
        if (this.state.isCashPayment){
            body.orderStatus = "IN_PROGRESS";
            body.payedType = "CASH";
        }
        if (this.state.isOnlinePayment){
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

    async getPrice(evt) {
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
};
