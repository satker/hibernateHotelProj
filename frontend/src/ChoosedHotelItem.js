import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import HotelGeo from "./HotelGeo";

export default class ChoosedHotelItem extends Component {
    constructor(props) {
        super(props);
        this.getGeoModal = this.getGeoModal.bind(this);
    }

    componentDidMount() {
        this.props.setTitleScreen({titleName: this.props.hotel().hotelName});
    }

    getGeoModal() {
        let hotel = this.props.hotel();
        return (<HotelGeo
            latitude={hotel.latitude}
            longitude={hotel.longitude}
        />);
    }

    render() {
        let me = this.props.me();
        let hotel = this.props.hotel();
        return (
            <div>
                <Container>

                    <br/>
                    <b>Address:</b> {hotel.countryName}, {hotel.cityName}, {hotel.address}{' '} - {' '}
                    <Button onClick={() => this.getGeoModal()}>Show
                        map</Button>
                    <br/>
                    <br/>
                    <div className="content" dangerouslySetInnerHTML={{__html: hotel.description}}/>
                    <br/>
                    <b>Check availability</b>
                    <br/>
                    <Button onClick={() => this.props.setScreen("create_order", {user: me, hotel: hotel})}>Create
                        request</Button>
                    <br/>
                </Container>
            </div>
        );
    }
};