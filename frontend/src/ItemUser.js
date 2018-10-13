import React, {Component} from "react";
import {Button} from "reactstrap";

const URL_ORDERS = "http://localhost:8080/user/_id_/orders";
const URL_CONFIRMED = "http://localhost:8080/user/_id_/confirms";

export default class ItemUser extends Component {
    constructor(props) {
        super(props);

        this.toUserPage = this.toUserPage.bind(this);
        this.toUserRequests = this.toUserRequests.bind(this);
        this.toUserConfirm = this.toUserConfirm.bind(this);

        this.state = {
            ready: false,
            requests: "Loading...",
            confirmed: "Loading...",
        };
    }

    toUserPage() {
        this.props.setScreen("user_info", {user: this.props.user});
    }

    toUserRequests() {
        this.props.setScreen("list_of_orders", {user: this.props.user});
    }

    toUserConfirm() {
        this.props.setScreen("list_of_confirmed", {user: this.props.user});
    }

    async componentDidMount() {
        let resp = await fetch(URL_ORDERS.replace("_id_", this.props.user.id), {credentials: "include"});
        let text = await resp.text();
        let list = JSON.parse(text).filter(order => !order.idDone);

        let resp2 = await fetch(URL_CONFIRMED.replace("_id_", this.props.user.id));
        let text2 = await resp2.text();
        let list2 = JSON.parse(text2);

        this.setState({requests: list.length, confirmed: list2.length});
    }

    render() {
        let user = this.props.user;
        return (
            <tr>
                <td><Button className="btn-dark btn-block" onClick={this.toUserPage}>{user.login}</Button></td>
                <td><Button className="btn-block" onClick={this.toUserRequests}>{this.state.requests}</Button></td>
                <td><Button className="btn-block" onClick={this.toUserConfirm}>{this.state.confirmed}</Button></td>
            </tr>
        );
    }
};
