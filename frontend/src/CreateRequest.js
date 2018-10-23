import React from "react";
import {Button} from "reactstrap";

export default class CreateRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rooms: null};
    }

    render() {
        let room = this.props.room;

        return (

                <tr>
                    <td>{room.capacity.adults}</td>
                    <td>{room.capacity.children}</td>
                    <td>{room.costNight}</td>
                    <td>{room.number}</td>
                    <td>{room.roomType.name}</td>
                    <td>{room.roomType.description}</td>
                    {this.props.me.role === "ROLE_ADMIN" && <td>
                        <Button className="btn-danger" onClick={() => this.deleteConfirm()}>Delete</Button>
                    </td>}
                </tr>
        );
    }

};
