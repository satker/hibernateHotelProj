import React, {Component} from "react";
import Map, {GoogleApiWrapper, Marker} from 'google-maps-react';

const AnyReactComponent = ({text}) => <div>{text}</div>;

export class HotelGeo extends Component {
    static defaultProps = {
        zoom: 30
    };

    render() {
        const hotelName = this.props.hotelName;
        const latitude = this.props.latitude;
        const longitude = this.props.longitude;
        const center = {
            lat: latitude,
            lng: longitude
        };

        return (
            // Important! Always set the container height explicitly
            <div style={{height: '50vh', width: '100%'}}>

                {/* <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyBSjnMkN8ckymUWZO5v0q-cZW9WppoFsyM"}}
                    defaultCenter={center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={latitude}
                        lng={longitude}
                        text={hotelName}
                    />
                </GoogleMapReact>*/}
                <Map google={this.props.google}
                     bootstrapURLKeys={{key: "AIzaSyBSjnMkN8ckymUWZO5v0q-cZW9WppoFsyM"}}
                     style={{width: '90%', height: '90%', position: 'relative'}}
                     className={'map'}
                     initialCenter={center}
                     zoom={17}>
                    <Marker
                        title={hotelName + ' on maps.'}
                        name={hotelName}
                        position={center}/>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBSjnMkN8ckymUWZO5v0q-cZW9WppoFsyM"
})(HotelGeo)

