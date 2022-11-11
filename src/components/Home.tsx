import React, {useEffect, useState} from 'react';
import {getRandomArbitrary, IRouteRequest} from "../utils/GoogleMapsUtils";
import RouteInput from "./RouteInput";
import Nav from "./Nav";
import latLng from "../utils/latLng.json";
// import DirectionsGeocodedWaypoint = google.maps.DirectionsGeocodedWaypoint;
// import DirectionsRoute = google.maps.DirectionsRoute;

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
            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();
        }catch (e) {
            console.log(e);
        }
    }

    const handleRouteRequest = (body:  IRouteRequest) => {
        getRoute(body)
    }

    const getRoute = (request: IRouteRequest) => {
        try {
            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
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
