import React from "react";
import {Button} from "reactstrap";

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="App-navbar">
                <Button onClick={this.props.goBack}>Back</Button>
            </div>
        );
    }
};
