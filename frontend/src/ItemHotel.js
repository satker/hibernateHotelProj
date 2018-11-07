import React, {Component} from 'react';
import {Button} from "reactstrap";
import Gallery from "./Galery";

export default class ItemHotel extends Component {
    state = {
        rooms: null,
        isDetailsOpened: false
    };

    render() {
        let hotel = this.props.hotel;
        let hotelPhotos = hotel.photos;
        let imagesToShow = [];
        hotelPhotos.map(photo => photo.photoUrl)
            .forEach(photo => imagesToShow.push({src: photo}));
        return (
            <tbody>
            <tr>
                <td><img src={hotel.mainPhoto.photoUrl}/></td>
                <td>{hotel.hotelName}</td>
                <td>{hotel.countryName}, {hotel.cityName}</td>
                <td>{hotel.price}</td>
                <td>{hotel.stars}</td>
                <td><Button onClick={this.props.onClickChooseHotel}>Choose hotel</Button></td>
                <td>
                    {hotelPhotos.length !== 0 ? <Gallery
                            images={imagesToShow}
                            showThumbnails={true}
                        />
                        : null}</td>
            </tr>
            </tbody>
        );
    }
};