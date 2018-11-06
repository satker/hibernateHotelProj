import React, {Component} from "react";
import {Button, Container, Table} from "reactstrap";
import LogoutButton from "./LogoutButton";
import ItemHotel from "./ItemHotel";

const URL_HOTELS = "http://localhost:8080//user/_id_/hotels";
export default class HotelItem extends Component {
    constructor(props) {
        super(props);
        this.loadHotels = this.loadHotels.bind(this);

        this.state = {
            hotels: [],
        };
    }

    componentDidMount() {
        this.props.setTitleScreen({titleName: 'Main page'});
        this.loadHotels();
    }

    async loadHotels() {
        let user = this.props.me();
        console.log(user.id);
        let resp = await fetch(URL_HOTELS.replace("_id_", user.id));
        let data = await resp.text();
        console.log(data);
        this.setState({hotels: JSON.parse(data)});
    }

    onClickChooseHotel(hotel) {
        let me = this.props.me();
        console.log(hotel.hotelName);
        this.props.setScreen("choose_hotel_item", {me: me, hotel: hotel});
    }

    seeHotels() {
        if (this.state.hotels.length !== 0) {
            return <Table hover>
                <thead>
                <tr>
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
                                Requests</Button>
                        </td>
                        <td>
                            <Button onClick={() => this.props.setScreen("personal_area", {user: me})}>Personal
                                area</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <br/>
                {this.state.hotels.length !== 0 ? this.seeHotels() : null}
            </Container>
        );
    }
};