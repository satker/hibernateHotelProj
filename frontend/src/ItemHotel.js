import React, {Component} from 'react';
import {Button} from "reactstrap";

export default class ItemHotel extends Component {
    state = {
        rooms: null,
        isDetailsOpened: false
    };

    render() {
        let hotel = this.props.hotel;
        return (
            <tbody>
            <tr>
                <td>{hotel.hotelName}</td>
                <td>{hotel.countryName}, {hotel.cityName}</td>
                <td>{hotel.price}</td>
                <td>{hotel.stars}</td>
                <td><Button onClick={this.props.onClickChooseHotel}>Choose hotel</Button></td>
            </tr>
            </tbody>
        );
    }
};