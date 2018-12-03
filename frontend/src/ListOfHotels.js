import React, {Component} from "react";
import {Button, Col, Container, Form, Row, Table} from "reactstrap";
import LogoutButton from "./LogoutButton";
import ItemHotel from "./ItemHotel";

const URL_HOTELS = "http://localhost:8080//user/_id_/hotels";
export default class HotelItem extends Component {
    constructor(props) {
        super(props);
        this.loadHotels = this.loadHotels.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            hotels: [],
            cities: null,
            countries: null,
            stars: null,
            maxCost: 0,
            minCost: 0
        };
    }

    componentDidMount() {
        this.props.setTitleScreen({titleName: 'Main page'});
        this.loadHotels();
        let stars = ['--Not selected--', 1, 2, 3, 4, 5];
        this.setState({stars: stars, star: stars[0]});
        this.loadCities();
        this.loadCountries();
    }

    async loadCities() {
        let user = this.props.me();
        let resp = await fetch(URL_HOTELS.replace("_id_", user.id) + "/cities");
        let data = await resp.text();
        let cities = JSON.parse(data);
        cities.splice(0, 0, '--Not selected--');
        this.setState({cities: cities, city: cities[0]});
    }

    async loadCountries() {
        let user = this.props.me();
        let resp = await fetch(URL_HOTELS.replace("_id_", user.id) + "/countries");
        let data = await resp.text();
        let countries = JSON.parse(data);
        countries.splice(0, 0, '--Not selected--');
        this.setState({countries: countries, country: countries[0]});
    }

    async loadHotels() {
        let user = this.props.me();
        let resp = await fetch(URL_HOTELS.replace("_id_", user.id));
        let data = await resp.text();
        this.setState({hotels: JSON.parse(data)});
    }

    onClickChooseHotel(hotel) {
        let me = this.props.me();
        this.props.setScreen("choose_hotel_item", {me: me, hotel: hotel});
    }

    seeHotels() {
        if (this.state.hotels.length !== 0) {
            return <Table hover>
                <thead>
                <tr>
                    <th>Hotel photo</th>
                    <th>Hotel name</th>
                    <th>Hotel location</th>
                    <th>Average night cost</th>
                    <th>Stars</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>

                {this.state.hotels.map(hotel =>
                    <ItemHotel
                        me={this.props.me()}
                        user={this.props.user()}
                        hotel={hotel}
                        setScreen={this.props.setScreen}
                        refresh={() => this.loadHotels()}
                        hotels={this.state.hotels}
                        onClickChooseHotel={() => {
                            this.onClickChooseHotel(hotel);
                        }}
                    />)}
            </Table>
        }
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    async onSubmit() {
        let user = this.props.me();
        let body = {};
        body.minCostNight = this.state.minCost === null ? 0 : parseInt(this.state.minCost);
        body.maxCostNight = this.state.maxCost === null ? 0 : parseInt(this.state.maxCost);
        body.country = this.state.country;
        body.city = this.state.city;
        body.stars = this.state.star === '--Not selected--' ? 0 : this.state.star;

        let resp = await fetch(URL_HOTELS.replace("_id_", user.id) + "/params", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let text = await resp.text();
        this.setState({hotels: JSON.parse(text)});
    }

    formToFindHotels() {
        let selectCity = null;
        let selectCountry = null;
        let selectStars = null;
        //let selectNumbersOfRooms = null;

        if (this.state.cities) {
            selectCity = this.state.cities.map(city => <option value={city}>{city}</option>);
        }

        if (this.state.countries) {
            selectCountry = this.state.countries.map(country => <option value={country}>{country}</option>);
        }

        if (this.state.stars) {
            selectStars = this.state.stars.map(star => <option value={star}>{star}</option>);
        }

        return <Form className="wide-form">
            <h2>Make an order:</h2>
            <Container>
                <p>
                    <Row>
                        <Col>Country:</Col>
                        <Col>
                            <select onChange={this.onChange} name="country">{selectCountry}</select>
                        </Col>
                    </Row>
                </p>
                <p>
                    <Row>
                        <Col>City:</Col>
                        <Col>
                            <select onChange={this.onChange} name="city">{selectCity}</select>
                        </Col>
                    </Row>
                </p>
                <p>
                    <Row>
                        <Col>Stars:</Col>
                        <Col>
                            <select onChange={this.onChange} name="star">{selectStars}</select>
                        </Col>
                    </Row>
                </p>
                <Row>
                    <Col>Min cost night:</Col>
                    <Col><input onChange={this.onChange} type="text" name="minCost"/></Col>
                </Row>
                <Row>
                    <Col>Max cost night:</Col>
                    <Col><input onChange={this.onChange} type="text" name="maxCost"/></Col>
                </Row>
            </Container>
            <input className="btn btn-success" type="submit" value="Find hotels"/>
            <Button onClick={this.onSubmit}/>
        </Form>
    }

    render() {
        let me = this.props.me();
        return (
            <Container>
                <b><h3>Welcome, {me.firstName}</h3></b>
                <LogoutButton setScreen={this.props.setScreen}/>
                <br/>
                <Table>
                    <tbody>
                    <tr>
                        <td>
                            <Button onClick={() => this.props.setScreen("list_of_orders", {user: me})}>View
                                Orders</Button>
                        </td>
                        <td>
                            <Button onClick={() => this.props.setScreen("personal_area", {user: me})}>Personal
                                area</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <br/>
                {this.state.hotels.length !== 0 || this.state.hotels !== null ? this.formToFindHotels() : null}
                <br/>
                {this.state.hotels.length !== 0 || this.state.hotels !== null ? this.seeHotels() : null}
            </Container>
        );
    }
};