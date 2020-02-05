import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import { mapStyle } from './mapStyle';

const DEFAULT_MAP_LOCATION = { lat: -6.175110, lng: 106.865036 };
const DEFAULT_MAP_ZOOM = 12;

class Map extends Component {

    static defaultProps = {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3.exp&libraries=geometry,drawing,places",
    }


    CMap = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={DEFAULT_MAP_ZOOM}
            defaultCenter={DEFAULT_MAP_LOCATION}
            options={{
                style: mapStyle,
                disableDefaultUI: false
            }}

        >
            {props.children}
        </GoogleMap>
    ));

    onMarkerClustererClick = () => (markerClusterer) => {
        //        const clickedMarkers = markerClusterer.getMarkers();
    }

    render() {
        const data = this.props.data;
        console.log(data.length);
        return (
            <Fragment>
                <this.CMap
                    googleMapURL={this.props.googleMapURL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className='mainMap' />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={DEFAULT_MAP_LOCATION}
                >
                    <MarkerClusterer
                        onClick={this.onMarkerClustererClick}
                        gridSize={60}
                        averageCenter
                        enableRetinaIcons
                        styles={[
                            {
                                url: "/PNG/marker/m1.png",
                                height: 53,
                                width: 53,
                                fontFamily: "Lato",
                                textColor: "#000",
                            },
                            {
                                url: "/PNG/marker/m2.png",
                                height: 56,
                                width: 56,
                                fontFamily: "Lato",
                                textColor: "#000",
                            },
                            {
                                url: "/PNG/marker/m3.png",
                                height: 66,
                                width: 66,
                                fontFamily: "Lato",
                                textColor: "#000",
                            },
                            {
                                url: "/PNG/marker/m4.png",
                                height: 78,
                                width: 78,
                                fontFamily: "Lato",
                                textColor: "#000",
                            },
                            {
                                url: "/PNG/marker/m5.png",
                                height: 90,
                                width: 90,
                                fontFamily: "Lato",
                                textColor: "#000",
                            }
                        ]}
                    >
                        {
                            data !== undefined &&
                            data.map((e, index) => (
                                <Marker key={index}
                                    position={{ lat: e.lat, lng: e.lng }}
                                />
                            ))
                        }
                    </MarkerClusterer>
                </this.CMap>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    data: state.dataReducer.data
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
