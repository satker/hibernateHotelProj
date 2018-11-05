import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import LogoutButton from "./LogoutButton";

export default class ChoosedHotelItem extends Component {
    componentDidMount() {
        this.props.setTitleScreen({titleName: this.props.hotel().hotelName});
    }

    render() {
        let me = this.props.me();
        let hotel = this.props.hotel();
        return (
            <Container>
                <LogoutButton setScreen={this.props.setScreen}/>
                <br/>
                <br/>
                <b><h3>To start book rooms, please push this button:</h3></b>
                <Button onClick={() => this.props.setScreen("create_order", {user: me, hotel: hotel})}>Create
                    request</Button>
                <br/>
            </Container>
        );
    }
};