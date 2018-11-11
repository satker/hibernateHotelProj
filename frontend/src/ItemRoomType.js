import React from "react";
import {Button} from "reactstrap";
import './CreateOrder.css';
import Gallery from "./Galery";

export default class ItemRoomType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckBox: false,
            isModal: false
        };
    }

    render() {
        let numberOfRooms = null;
        let roomType = this.props.roomType;
        let roomPhotos = roomType.photos;
        let imagesToShow = [];
        roomPhotos.map(photo => photo.photoUrl)
            .forEach(photo => imagesToShow.push({src: photo}));

        let currentNumberOfRooms = [];
        for (let i = 1; i <= roomType.numberAvailableRooms; i++) {
            currentNumberOfRooms.push(i);
        }

        if (currentNumberOfRooms) {
            numberOfRooms = currentNumberOfRooms.map(num => <option
                value={num}>{num}</option>);
        }

        return (
            <tr onClick={this.props.onClick}>
                {
                    this.props.isCheckBox && <td>
                        <input type="checkbox" onChange={this.props.onClickOnCheckBox}
                               checked={this.props.checked}/>
                    </td>
                }
                <td>
                    <span style={{color: "blue"}}>{roomType.capacity.adults}</span>
                    +
                    <span style={{color: "blue"}}>{roomType.capacity.children}</span>
                </td>
                <td><span class="roomType">{roomType.name}</span> <p>{roomType.description}</p></td>
                {!this.props.isSelected ?
                    <td>{roomType.numberAvailableRooms}</td>
                    : null
                }
                {this.props.isSelected ?
                    <td>
                        {numberOfRooms.length !== 1 ? <select onChange={this.props.addFixedNumberOfOrders}
                                                              name="numberOfRooms">{numberOfRooms}</select>
                            : 1}</td>
                    : null
                }
                <td>{roomType.costNight}</td>
                {
                    this.props.me.role === "ROLE_ADMIN" && <td>
                        <Button className="btn-danger" onClick={() => this.deleteConfirm()}>Delete</Button>
                    </td>
                }
                {
                    this.props.me.role === "ROLE_ADMIN" && <td>
                        <Button className="btn-danger" onClick={() => this.deleteConfirm()}>Delete</Button>
                    </td>
                }

                {
                    this.props.isModal ?
                        <td><Button className="btn-danger" color='bl' onClick={this.props.onClickSeeDetails}>See
                            details</Button>
                            {roomPhotos.length !== 0 ? <Gallery
                                    images={imagesToShow}
                                    showThumbnails={true}
                                />
                                : null}
                        </td>
                        : null
                }
            </tr>
        );
    }
};
