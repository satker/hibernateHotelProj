import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import Gallery from "./Galery";

export default class ChoosedHotelItem extends Component {
    componentDidMount() {
        this.props.setTitleScreen({titleName: this.props.hotel().hotelName});
    }

    render() {
        let me = this.props.me();
        let photos = this.props.hotel().photos.map(photo => photo.photoUrl);
        const LIGHTBOX_IMAGE_SET = {srcSet: photos};
        console.log(LIGHTBOX_IMAGE_SET);
        let hotel = this.props.hotel();
        const hotelPhotos = [{src: 'https://s-ec.bstatic.com/images/hotel/max1024x768/440/44051317.jpg'},
            {src: 'https://t-ec.bstatic.com/images/hotel/max1024x768/440/44051160.jpg'},
            {src: 'https://t-ec.bstatic.com/images/hotel/max1024x768/440/44051554.jpg'}];
        return (
            <div>
                <Gallery
                    images={hotelPhotos}
                    //heading={'werewewr'}
                    showThumbnails={true}
                    //subheading={'eeeeee'}
                />
                <Container>
                    <br/>
                    <b>Address:</b> {hotel.countryName}, {hotel.cityName}, {hotel.address}{' '} - {' '}<a href='#'>Show
                    map</a>
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