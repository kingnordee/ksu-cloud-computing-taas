import React, {useEffect, useState} from 'react';
import {
    Cost, driving,
    getRandomArbitrary,
    getTravelMode,
    IRouteRequest, lyft,
    lyftToTransit,
    metersToMiles, secondsToTime, transit, walking
} from "../utils/GoogleMapsUtils";
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

    const [lyftToTransitMode, setLyftToTransitMode] = useState<IRadioButtonsInfo>(lyftToTransit);
    const [lyftMode, setLyftMode] = useState<IRadioButtonsInfo>(lyft);
    const [drivingMode, setDrivingMode] = useState<IRadioButtonsInfo>(driving);
    const [transitMode, setTransitMode] = useState<IRadioButtonsInfo>(transit);
    const [walkingMode, setWalkingMode] = useState<IRadioButtonsInfo>(walking);
    // const [lyftToTransitChecked, setLyftToTransitChecked] = useState<boolean>(false);

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
            const  dirServDrive = new google.maps.DirectionsService();
            const  dirServTrans = new google.maps.DirectionsService();
            const  dirServLyftToTrans = new google.maps.DirectionsService();
            const  dirServWalk = new google.maps.DirectionsService();

            dirServDrive.route({...body, travelMode: getTravelMode()}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    const distance = metersToMiles(info?.distance.value);
                    const duration = secondsToTime(info?.duration.value);

                    setDrivingRoute(result)
                    setDrivingMode({...drivingMode, duration, distance: distance+" mi", cost: "$"+(parseFloat(distance) * Cost.driveMile).toFixed(2)})
                    const lyftCost = (parseFloat(distance) * Cost.lyftMile);
                    setLyftMode({...lyftMode, duration, distance: distance+" mi",  cost: "$"+(lyftCost > 10 ? lyftCost : 10).toFixed(2)})
                });
            dirServDrive.route({...body, travelMode: getTravelMode("transit")}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    const distance = metersToMiles(info?.distance.value);
                    const duration = secondsToTime(info?.duration.value);
                    setTransitRoute(result)
                    setTransitMode({...transitMode, duration, distance: distance+" mi", cost: "$"+Cost.transit.toFixed(2)})

                dirServDrive.route({origin: info?.steps[0].start_location, destination: info?.steps[0].end_location, travelMode: getTravelMode()}, (result2, status2) => {
                        const  info2 = result2?.routes[0].legs[0]
                        const lyftToTransitDistance = metersToMiles((info?.distance.value - info?.steps[0].distance.value) + info2?.distance.value);
                        const lyftToTransitDuration = secondsToTime((info?.duration.value - info?.steps[0].duration.value) + info2?.duration.value);
                        const lyftToTransitCost = parseFloat(lyftToTransitDistance) * Cost.lyftMile;
                        const totalLyftTAndTransitCost = lyftToTransitCost + Cost.transit;
                        setLyftToTransitMode({...lyftToTransitMode, duration: lyftToTransitDuration,  distance: lyftToTransitDistance+" mi", cost: "$"+totalLyftTAndTransitCost.toFixed(2)})
                    });
                });
            dirServDrive.route({...body, travelMode: getTravelMode("walking")}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    const distance = metersToMiles(info?.distance.value)+" mi";
                    const duration = secondsToTime(info?.duration.value);
                    setTransitRoute(result)
                    setWalkingMode({...walkingMode, duration, distance})
                });
        }
    }

    // const handleLyftToTansitRadio = (checked: boolean) => {
    //   setLyftToTransitChecked(checked)
    // }

    const logger = () => {
        console.log(drivingRoute?.routes[0].legs[0]);
        console.log(transitRoute?.routes[0].legs[0]);
        // console.log(lyftToTransitCost);
        // console.log(lyftToTransitDistance);
        // console.log(lyftToTransitDuration);
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
                <RouteInput requestFn={handleRouteRequest} travelModes={[lyftToTransitMode,  lyftMode,  drivingMode, transitMode, walkingMode]}/>
                {/*{lyftToTransitChecked && <div className="lyftPanel">*/}
                {/*    LyftToTrans*/}
                {/*</div>}*/}
                <div id="renderRoute" className={`${requestedRoute ?  "renderRoute" : ""}`}/>
            </div>
        </div>
    </div>
}
// walmart stone mountain ga walmart atlanta ga
export default Home;
