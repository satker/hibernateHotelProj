import React, {Component} from 'react';
import './Form.css'

class FormOrder extends Component {
    render() {
        return (
            <form class="order" method="post" action="">
                <label for="room-size">Number of places in the room</label>
                <input type="text" id="room-size" name="room-size"/>
                <label for="room-class">Service class</label>
                <select id="room-class" name="room-class">
                    <option>Standard</option>
                    <option>Business</option>
                </select>
                <label for="duration">Time</label>
                <input type="text" id="duration" name="duration"/>
                <input type="submit" value="Order"/>
            </form>
        );
    }
}

export default FormOrder