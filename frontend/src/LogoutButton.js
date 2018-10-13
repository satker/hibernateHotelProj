import React from "react";
import {Button} from "reactstrap";

const URL = "http://localhost:8080/app-logout";

export default class LogoutButton extends React.Component {
    async logout() {
        await fetch(URL, {method: "post", credentials: "include"});
        this.props.setScreen("login", null, true);
    }

    render() {
        return <Button onClick={()=>this.logout()}>Logout</Button>;
    }
};
