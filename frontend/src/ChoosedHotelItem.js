import React, {Component} from "react";
import {Button, Container, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import HotelGeo from "./HotelGeo";

export default class ChoosedHotelItem extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
            modal: false,
        }
    }

    componentDidMount() {
        this.props.setTitleScreen({titleName: this.props.hotel().hotelName});
    }

    handleClose() {
        this.setState({modal: false});
    }

    handleShow() {
        this.setState({modal: true});
    }

    modalWindowMap() {
        let hotel = this.props.hotel();
        return <Modal isOpen={this.state.modal}>
            <ModalHeader>
                {hotel.hotelName} on map</ModalHeader>
            <ModalBody>
                <HotelGeo
                    hotelName={hotel.hotelName}
                    latitude={hotel.latitude}
                    longitude={hotel.longitude}
                />
            </ModalBody>
            < ModalFooter>
                <Button color="danger" onClick={this.handleClose}>Close</Button>
            </ModalFooter>
        </Modal>
    }


    render() {
        let me = this.props.me();
        let hotel = this.props.hotel();
        return (
            <div>
                <Container>

                    <br/>
                    <b>Address:</b> {hotel.countryName}, {hotel.cityName}, {hotel.address}{' '} - {' '}
                    <Button onClick={() => this.handleShow()
                    }>Show
                        map</Button>
                    <br/>
                    {hotel !== null ? this.modalWindowMap() : null}
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