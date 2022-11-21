import React, {useEffect, useState} from 'react';
import {getRandomArbitrary, getTravelMode, IRouteRequest} from "../utils/GoogleMapsUtils";
import RouteInput from "./RouteInput";
import latLng from "../utils/latLng.json";
import {IRadioButtonsInfo} from "./RadioButtons";

function Home() {
    let map: google.maps.Map;
    let directionsService: google.maps.DirectionsService;
    let directionsRenderer: google.maps.DirectionsRenderer;

    const [requestedRoute, setRequestedRoute] = useState<IRouteRequest |  null>(null);
    const [drivingRoute, setDrivingRoute] = useState<google.maps.DirectionsResult | null>(null);
    const [transitRoute, setTransitRoute] = useState<google.maps.DirectionsResult | null>(null);
    const [routeFound, setRouteFound] = useState<boolean>(false);

    const [transitMode, setTransitMode] = useState<IRadioButtonsInfo>({
        name: "Transit",
        value: "transit",
        id: "transit",
        distance: "",
        duration: "",
        cost: ""
    });
    const [lyftTransitMode, setLyftTransitMode] = useState<IRadioButtonsInfo>({
        name: "Lyft-to-Transit",
        value: "lyft-to-transit",
        id: "lyft-to-transit",
        distance: "",
        duration: "",
        cost: ""
    });
    const [drivingMode, setDrivingMode] = useState<IRadioButtonsInfo>({
        name: "Driving",
        value: "driving",
        id: "driving",
        distance: "",
        duration: "",
        cost: "N/A"
    });

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
            // directionsService = new google.maps.DirectionsService();
            // directionsRenderer = new google.maps.DirectionsRenderer();
        }catch (e) {
            console.log(e);
        }
    }

    const handleRouteRequest = (body:  IRouteRequest) => {
        getRoute(body)

        if(routeFound){
            console.log(routeFound);
            const  dirServ = new google.maps.DirectionsService();

                dirServ.route({...body, travelMode: getTravelMode()}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    setDrivingRoute(result)
                    setDrivingMode({...drivingMode, duration: info?.duration.text, distance:  info?.distance.text})
                })

                dirServ.route({...body, travelMode: getTravelMode("transit")}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    setTransitRoute(result)
                    setTransitMode({...transitMode, duration: info?.duration.text, distance:  info?.distance.text})
                })
        }
    }

    const logger = () => {
        console.log(drivingRoute?.routes[0].legs[0]);
        console.log(transitRoute?.routes[0].legs[0]);
    }

    const getRoute = (request: IRouteRequest) => {
        try {
            directionsService = new google.maps.DirectionsService();
            // directionsRenderer = new google.maps.DirectionsRenderer();
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                zoom: 5
            });
            directionsRenderer = new google.maps.DirectionsRenderer();
            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                    let routeElement  = document.getElementById('renderRoute') as HTMLElement
                    routeElement.innerHTML = ""
                    directionsRenderer.setDirections(result);
                    directionsRenderer.setPanel(routeElement);
                    directionsRenderer.setMap(map)
                    setRouteFound(true)
                }else{
                    setRequestedRoute(null);
                    console.log("status: " + status);
                    setRouteFound(false)
                }
            });
        }catch (e) {
            console.log(e);
            console.log("Request: " + JSON.stringify(request));
            setRouteFound(false)
        }
    }

    return <div className='home'>
        <div className='homeBody'>
            <div id="map"/>
            <div  className="panel">
                <button onClick={logger}>Log</button>
                <RouteInput  requestFn={handleRouteRequest} travelModes={[drivingMode, transitMode, lyftTransitMode]}/>
                <div id="renderRoute" className={`${requestedRoute ?  "renderRoute" : ""}`}/>
            </div>
        </div>
    </div>
}
// walmart stone mountain ga walmart atlanta ga
export default Home;
