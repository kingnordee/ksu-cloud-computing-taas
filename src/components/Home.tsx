import React, {useEffect, useState} from 'react';
import {getRandomArbitrary, IRouteRequest} from "../utils/GoogleMapsUtils";
import RouteInput from "./RouteInput";
import Nav from "./Nav";
import latLng from "../utils/latLng.json";

function Home() {
    let map: google.maps.Map;
    let directionsService: google.maps.DirectionsService;
    let directionsRenderer: google.maps.DirectionsRenderer;

    const [requestedRoute, setRequestedRoute] = useState<IRouteRequest |  null>(null);

    useEffect( () => {
        loadMap()
    }, [])

    const loadMap = () => {
        try{
            const randomState = latLng.states[getRandomArbitrary(0, latLng.states.length)];
            const currentLocation = randomState.point[getRandomArbitrary(0, randomState.point.length)]
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: currentLocation,
                zoom: 5
            });

            const marker = new google.maps.Marker({
                position: currentLocation,
                map: map,
            });

        }catch (e) {
            console.log(e);
        }
    }

    const handleRouteRequest = (body:  IRouteRequest) => {
        // setRequestedRoute(body)
        getRoute(body)
    }

    const getRoute = (request: IRouteRequest) => {
        try {
            directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                    directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsRenderer.setDirections(result);
                    directionsRenderer.setPanel(document.getElementById('renderRoute') as HTMLElement);
                    directionsRenderer.setMap(map)
                }else{
                    setRequestedRoute(null);
                    console.log("status: " + status);
                }
            });
        }catch (e) {
            console.log("Exception: " + e);
            console.log("Request: " + JSON.stringify(request));
        }

    }

    return <div className='home'>
        <Nav/>
        <div className='homeBody'>
            <div id="map"/>
            <div  className="panel">
                <RouteInput  requestFn={handleRouteRequest}/>
                <div id="renderRoute" className={`${requestedRoute ?  "renderRoute" : ""}`}/>
            </div>
        </div>
    </div>
}

export default Home;
