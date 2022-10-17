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

    // // let map: google.maps.Map;
    // let infoWindow: google.maps.InfoWindow;
    //
    // useEffect( () => {
    //
    //     try{
    //         initMap("map");
    //         // infoWindow  = new google.maps.InfoWindow();
    //     }catch (e) {
    //         console.log(e);
    //     }
    // }, [])
    //
    //
    // return <div className='home'>
    //     <Nav/>
    //     <div className='homeBody'>
    //         <div id="map"/>
    //         <RouteInput/>
    //     </div>
    //
    // </div>

    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    React.useEffect(() => {
        if (ref.current && !map) {
            const thisMap = new window.google.maps.Map(ref.current, {});
            thisMap.setCenter({lat: 34.038247902993, lng: -84.583170566728});
            thisMap.setZoom(5);
            setMap(thisMap);
        }
    }, [ref, map]);

    return <div className="homeBody">
        <div id="map" ref={ref} />
    </div>
}

export default Home;
