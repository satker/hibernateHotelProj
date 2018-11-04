import React from "react";
import {Button} from "reactstrap";
import './CreateOrder.css';

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
                {
                    this.props.isCheckBox && <td>
                        <input type="checkbox" onChange={this.props.onClickOnCheckBox}
                               checked={this.props.checked}/>
                    </td>
                }
                <td>
                    <span style={{color: "blue"}}>{room.roomType.capacity.adults}</span>
                    +
                    <span style={{color: "blue"}}>{room.roomType.capacity.children}</span>
                </td>
                <td><span class="roomType">{room.roomType.name}</span> <p>{room.roomType.description}</p></td>
                {this.props.roomNumber ? <td>{room.number}</td> : null}
                <td>{room.costNight}</td>
                {
                    this.props.me.role === "ROLE_ADMIN" && <td>
                        <Button className="btn-danger" onClick={() => this.deleteConfirm()}>Delete</Button>
                    </td>
                }

                {
                    this.props.isModal ?
                        <td><Button className="btn-danger" color='bl' onClick={this.props.onClickSeeDetails}>See
                            details</Button></td>
                        : null
                }
            </tr>
        );
    }
};
