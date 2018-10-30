import React from "react";
import {Button} from "reactstrap";

export default class ItemRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: null,
            isCheckBox: false,
            isModal: false
        };
    }

    render() {
        let room = this.props.room;

        return (

            <tr onClick={this.props.onClick}>
                <td>{room.roomType.name}</td>
                <td>{room.roomType.capacity.adults}</td>
                <td>{room.roomType.capacity.children}</td>
                <td>{room.costNight}</td>
                {
                    this.props.me.role === "ROLE_ADMIN" && <td>
                        <Button className="btn-danger" onClick={() => this.deleteConfirm()}>Delete</Button>
                    </td>
                }

                {
                    this.props.isCheckBox && <td>
                        <input type="checkbox" onChange={this.props.onClickOnCheckBox}
                               defaultChecked={this.props.checked}/>
                    </td>
                }

                {
                    this.props.isModal ?
                        <Button className="btn-danger" onClick={this.props.onClickSeeDetails}>See details</Button>
                         : null
                }
            </tr>
        );
    }
};
