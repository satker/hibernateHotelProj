import React, {Component} from "react";
import Geolocation from "react-geolocation"

export default class HotelGeo extends Component {
    constructor() {
        super();
    }

    render() {
        let latitude = this.props.latitude;
        let longitude = this.props.longitude;
        console.log(latitude, longitude);
        return <Geolocation
            render={({
                         fetchingPosition,
                         position: {coords: {latitude, longitude} = {}} = {},
                         error,
                         getCurrentPosition
                     }) =>
                <div>
                    <button onClick={getCurrentPosition}>Get Position</button>
                    {error &&
                    <div>
                        {error.message}
                    </div>}
                    <pre>
                        latitude: {this.props.latitude}
                        longitude: {this.props.longitude}
      </pre>
                </div>}
        />
    }
}