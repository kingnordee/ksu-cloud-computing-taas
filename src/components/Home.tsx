import React, {useEffect, useState} from 'react';
import {initMap} from "../utils/GoogleMapsUtils";
import RouteInput from "./RouteInput";
import Nav from "./Nav";
import ltln from "../utils/latLng.json"
import {Wrapper, WrapperProps, Status} from "@googlemaps/react-wrapper";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

function Home() {

    let map: google.maps.Map;
    let infoWindow: google.maps.InfoWindow;

    useEffect( () => {

        try{
            initMap("map");
            // infoWindow  = new google.maps.InfoWindow();
        }catch (e) {
            console.log(e);
        }
    }, [])


    return <div className='home'>
        <Nav/>
        <div className='homeBody'>
            <div id="map"/>
            <RouteInput/>
        </div>

    </div>

}

export default Home;
