import React from "react";
import {Col, Container, Form, Row} from "reactstrap";

const URL = "http://localhost:8080/user/_id_/orders";

export default class CreateRequest extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            roomTypes: null,
            adults: null,
            children: null,
            numbersOfRooms: null
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
        this.setState({adults: numbersForAdultsAndNumberOfRooms, adult: numbersForAdultsAndNumberOfRooms[0] });
        this.setState({children: numbersForAdultsAndNumberOfRooms, child: numbersForAdultsAndNumberOfRooms[0] });
        this.setState({numbersOfRooms: numbersForChildren, numberOfRooms: numbersForChildren[0] });
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    async onSubmit(evt) {
        evt.preventDefault();

        /*let body = {
            "capacity": "5",
            "arrivalDate": "2018-02-03",
            "departureDate": "2018-02-17",
            "idDone": false,
            "roomType": "ord",
            "user": this.props.me(),
        };*/
        let body = {};
        for(let key of ["arrivalDate", "departureDate"]) {
            body[key] = this.state[key];
        }
        body.roomType = this.state.roomTypes.find(room => room.name === this.state.roomType);
        body.adults = this.state.adult;
        body.children = this.state.child;
        body.numbersOfRooms = this.state.numberOfRooms;

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
        this.props.goBack();
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
            selectNumbersOfRooms = this.state.numbersOfRooms.map(numberOfRooms => <option value={numberOfRooms}>{numberOfRooms}</option>);
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
            </Form>
        );
    }
};
