import React from "react";
import Switcher from 'react-switcher';
import './CreateOrder.css'
import {
    Button,
    Col,
    Container,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
    Tooltip
} from "reactstrap";
import ItemRoomType from "./ItemRoomType";

const URL = "http://localhost:8080/user/_id_/hotels/_hotelid_/orders";

export default class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.tooltypeOpenAdults = this.tooltypeOpenAdults.bind(this);
        this.tooltypeOpenChildren = this.tooltypeOpenChildren.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            adults: null,
            children: null,
            numbersOfRooms: null,
            arrivalDate: null,
            departureDate: null,
            findRoomTypes: null,
            selectedRoomTypes: [],
            paymentStep: false,
            isOnlinePayment: false,
            isBooked: false,
            isLocal: null,
            months: null,
            years: null,
            totalPrice: null,
            checked: false,
            modal: false,
            currentRoomType: null,
            listOfParameters: [],
            todayDate: null,
            tooltipOpenAdults: false,
            tooltipOpenChildren: false,
            roomTypeAndNumberOfRooms: []
        };
    }

    async componentDidMount() {
        let today = CreateOrder.getDateByDateState(null, 0);
        this.setState({todayDate: today});
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

        let resp = await fetch(URL.replace("_id_", this.props.me().id).replace("_hotelid_", this.props.hotel().id) + "/roomTypes", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let text = await resp.text();
        let foundRoomTypes = JSON.parse(text);
        let parsedSelectedRoomTypes = this.state.selectedRoomTypes.map(room => room.id);
        this.setState({findRoomTypes: foundRoomTypes.filter(room => !parsedSelectedRoomTypes.includes(room.id))});
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

                {!this.state.paymentStep && this.state.selectedRoomTypes != null && this.state.selectedRoomTypes.length !== 0 ?
                    this.selectedRoomsTable()
                    : null
                }

                {this.state.paymentStep && this.state.selectedRoomTypes != null && this.state.selectedRoomTypes.length !== 0 ?
                    this.roomsForPayedTable()
                    : null
                }

                {!this.state.paymentStep && this.state.findRoomTypes != null && this.state.findRoomTypes.length !== 0 ?
                    this.foundRoomsTable()
                    : null
                }

                {this.state.currentRoomType !== null ?
                    this.modalWindowToSeeDetails()
                    : null}
            </div>
        );
    }

    modalWindowToSeeDetails() {
        return <Modal isOpen={this.state.modal}>
            <ModalHeader>
                {this.state.currentRoomType.name} room</ModalHeader>
            <ModalBody>

                <p>
                    <label>Room Size: {this.state.currentRoomType.roomSize} m²</label>
                </p>
                <p>
                    <label>Description: {this.state.currentRoomType.description}</label>
                </p>
                <hr/>
                <p>
                    <label>Room Facilities:</label><br/>
                    {this.state.currentRoomType.parameters.map(p => {
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
                    <Col><input min={this.state.todayDate} max={this.getMaxArrivalDate()} onChange={this.onChange}
                                type="date" name="arrivalDate"/></Col>
                </Row>
                <Row>
                    <Col>Departure date</Col>
                    <Col><input onChange={this.onChange} min={this.getMinDepartureDate()} type="date"
                                name="departureDate"/></Col>
                </Row>
            </Container>
            <input className="btn btn-success" type="submit" value="Find available rooms"/>
        </Form>
    }

    static getDateByDateState(date, dayDiff) {
        let dateInstance = null;
        if (date === null) {
            dateInstance = new Date();
        } else {
            dateInstance = new Date(date);
        }
        let dd = dateInstance.getDate() + dayDiff;
        let mm = dateInstance.getMonth() + 1; //January is 0!
        let yyyy = dateInstance.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    getMaxArrivalDate() {
        if (this.state.departureDate !== null) {
            return CreateOrder.getDateByDateState(this.state.departureDate, -1);
        }
    }

    getMinDepartureDate() {
        if (this.state.arrivalDate === null) {
            return CreateOrder.getDateByDateState(this.state.todayDate, 1);
        } else {
            return CreateOrder.getDateByDateState(this.state.arrivalDate, 1);
        }
    }

    roomsForPayedTable() {
        return <Container>
            <Table hover>
                {this.tableNameRowsForFoundAndSelectedRooms(false)}

                <tbody>{this.state.selectedRoomTypes.map(roomType =>
                    <ItemRoomType
                        me={this.props.me()}
                        roomType={roomType}
                        setScreen={this.props.setScreen}
                        refresh={() => this.loadOrders()}
                        isModal={true}
                        isSelected={false}

                        onClickSeeDetails={() => {
                            this.setState({currentRoomType: roomType});
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

    tableNameRowsForFoundAndSelectedRooms(isChooseBox) {
        return <thead>
        <tr>
            {isChooseBox ? <th>Chosen</th> : null}
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
            <th>Number of available rooms</th>
            <th>Night cost</th>
            <th>Details</th>
        </tr>
        </thead>
    }

    selectedRoomsTable() {
        const selectedTypes = this.state.selectedRoomTypes;
        selectedTypes.filter(type => {
            return this.state.roomTypeAndNumberOfRooms[type.name] === undefined;
        })
            .forEach(type => this.state.roomTypeAndNumberOfRooms[type.name.replace('""', '')] = "1");
        return <Container>
            <Table hover>
                {this.tableNameRowsForFoundAndSelectedRooms(true)}
                <tbody>{selectedTypes.map(roomType =>
                    <ItemRoomType
                        me={this.props.me()}
                        roomType={roomType}
                        setScreen={this.props.setScreen}
                        refresh={() => this.loadOrders()}
                        isCheckBox={true}
                        isSelected={true}
                        isModal={true}
                        checked={true}

                        onClickSeeDetails={() => {
                            this.setState({currentRoomType: roomType});
                            this.handleShow();
                        }}

                        addFixedNumberOfOrders={(number) => {
                            this.state.roomTypeAndNumberOfRooms[roomType.name] = number.target.value;
                        }}

                        onClickOnCheckBox={() => {
                            this.state.roomTypeAndNumberOfRooms[roomType.name] = undefined;
                            const isChosed = this.state.findRoomTypes.includes(roomType);
                            if (!isChosed) {
                                this.setState({
                                    findRoomTypes: [...this.state.findRoomTypes, roomType]
                                });
                                this.removeRoomFromSelectedRoms(roomType);
                            }
                        }}

                    />)}
                </tbody>
            </Table>
            <p>
                {
                    this.state.selectedRoomTypes.length !== 0 && !this.state.paymentStep && this.state.arrivalDate !== null && this.state.departureDate !== null ?
                        <Button
                            onClick={() => {
                                this.state.selectedRoomTypes
                                    .forEach(type => type.numberAvailableRooms = parseInt(this.state.roomTypeAndNumberOfRooms[type.name]));
                                this.getPrice();
                                this.setState({paymentStep: true});
                                this.snoozeRooms();
                            }
                            }>Choose payment method
                        </Button>
                        : null
                }
            </p>
        </Container>
    }

    foundRoomsTable() {
        return <Container>
            <Table hover>
                {this.tableNameRowsForFoundAndSelectedRooms(true)}
                <tbody>
                {this.state.findRoomTypes.map(roomType =>
                    <ItemRoomType
                        me={this.props.me()}
                        roomType={roomType}
                        setScreen={this.props.setScreen}
                        refresh={() => this.loadOrders()}
                        isCheckBox={true}
                        isSelected={false}
                        isModal={true}
                        checked={false}
                        onClickSeeDetails={() => {
                            this.setState({currentRoomType: roomType});
                            this.handleShow();
                        }}

                        onClickOnCheckBox={() => {
                            const isChosed = this.state.selectedRoomTypes.includes(roomType);
                            if (!isChosed) {
                                this.setState({
                                    selectedRoomTypes: [...this.state.selectedRoomTypes, roomType]
                                });
                                this.removeRoomFromFindedRoms(roomType);
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
        const newArray = this.state.findRoomTypes.filter(r => r !== room);
        this.setState({findRoomTypes: newArray});
    }

    removeRoomFromSelectedRoms(room) {
        const newArray = this.state.selectedRoomTypes.filter(r => r !== room);
        this.setState({selectedRoomTypes: newArray});
    }

    async createOrder() {
        let body = {};
        for (let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }

        if (this.state.isBooked) {
            body.orderStatus = "BOOKED";
            body.payedType = "BOOKED";
            body.isPaid = false;
        }
        if (this.state.isOnlinePayment) {
            body.orderStatus = "IN_PROGRESS";
            body.payedType = "ONLINE";
            body.isPaid = true;
        }

        body.totalPrice = this.state.totalPrice;
        //body.roomTypes = this.state.selectedRoomTypes;

        let resp = await fetch(URL.replace("_id_", this.props.me().id).replace("_hotelid_", this.props.hotel().id), {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),

        });
        let text = await resp.text();
        this.setState({findRoomTypes: JSON.parse(text)});
        this.props.goBack();
    }

    async getPrice() {
        let body = {};
        for (let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }
        body.roomTypes = this.state.selectedRoomTypes;

        let resp = await fetch(URL.replace("_id_", this.props.me().id).replace("_hotelid_", this.props.hotel().id) + "/price", {
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
        await fetch(URL.replace("_id_", this.props.me().id).replace("_hotelid_", this.props.hotel().id) + "/rooms/snooze", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(this.state.selectedRoomTypes),
        });
    }
};
