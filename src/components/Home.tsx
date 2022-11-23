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

    // const [drivingRoutex, setDrivingRoute] = useState<google.maps.DirectionsResult | null>(null);
    // const [transitRoute, setTransitRoute] = useState<google.maps.DirectionsResult | null>(null);
    // const [lyftToTransitChecked, setLyftToTransitCheckedx] = useState<boolean>(false);
    const [requestedRoute, setRequestedRoute] = useState<IRouteRequest |  null>(null);
    const [lyftViewRoute, setLyftViewRoute] = useState<google.maps.DirectionsResult | null>(null);
    const [routeFound, setRouteFound] = useState<boolean>(false);
    const [showLyftView, setShowLyftView] = useState<boolean>(false);

    //TO BE PASSED INTO RADIO BUTTON COMPONENT AS PROPS IN AN ARRAY
    const [lyftToTransitRadioPacket, setLyftToTransitRadioPacket] = useState<IRadioButtonsInfo>(lyftToTransit);
    const [lyftRadioPacket, setLyftRadioPacket] = useState<IRadioButtonsInfo>(lyft);
    const [drivingRadioPacket, setDrivingRadioPacket] = useState<IRadioButtonsInfo>(driving);
    const [transitRadioPacket, setTransitRadioPacket] = useState<IRadioButtonsInfo>(transit);
    const [walkingRadioPacket, setWalkingRadioPacket] = useState<IRadioButtonsInfo>(walking);


    useEffect( () => {
        loadMap()
    }, [])

    useEffect( () => {
        console.log(showLyftView);
        if(showLyftView){
            console.log(lyftViewRoute);

            try {
                directionsService = new google.maps.DirectionsService();
                const map2 = new google.maps.Map(document.getElementById("map2") as HTMLElement, {
                    zoom: 5
                });

                directionsRenderer = new google.maps.DirectionsRenderer();
                let routeElement2  = document.getElementById('renderRoute2') as HTMLElement
                routeElement2.innerHTML = ""
                directionsRenderer.setDirections(lyftViewRoute!);
                directionsRenderer.setPanel(routeElement2);
                directionsRenderer.setMap(map2)
                setRouteFound(true)
            }catch (e) {
                console.log(e);
                console.log("lyft map view failed");
            }
        }else{}
    }, [showLyftView])

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

    const handleRouteRequest = (body:  IRouteRequest, lyftToTrans: boolean) => {
        // setLyftToTransitChecked(lyftToTrans)
        getRoute(body)

        if(routeFound){
            const  dirServDrive = new google.maps.DirectionsService();

            dirServDrive.route({...body, travelMode: getTravelMode()}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    const distance = metersToMiles(info?.distance.value);
                    const duration = secondsToTime(info?.duration.value);

                    // setDrivingRoute(result)
                    setDrivingRadioPacket({...drivingRadioPacket, duration, distance: distance+" mi", cost: "$"+(parseFloat(distance) * Cost.driveMile).toFixed(2)})
                    const lyftCost = (parseFloat(distance) * Cost.lyftMile) + Cost.lyftBase;
                    setLyftRadioPacket({...lyftRadioPacket, duration, distance: distance+" mi",  cost: "$"+(lyftCost > 10 ? lyftCost : 10).toFixed(2)})
                });
            dirServDrive.route({...body, travelMode: getTravelMode("transit")}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    const distance = metersToMiles(info?.distance.value);
                    const duration = secondsToTime(info?.duration.value);
                    // setTransitRoute(result)
                    setTransitRadioPacket({...transitRadioPacket, duration, distance: distance+" mi", cost: "$"+Cost.transit.toFixed(2)})

                dirServDrive.route({origin: info?.steps[0].start_location, destination: info?.steps[0].end_location, travelMode: getTravelMode()}, (result2, status2) => {
                    setLyftViewRoute(result2)
                    const  info2 = result2?.routes[0].legs[0]
                        const lyftToTransitDistance = metersToMiles(info2?.distance.value);
                        const totalLyftAndTransitDistance = metersToMiles((info?.distance.value - info?.steps[0].distance.value) + info2?.distance.value);
                        const lyftToTransitDuration = secondsToTime((info?.duration.value - info?.steps[0].duration.value) + info2?.duration.value);
                        const lyftToTransitCost = parseFloat(lyftToTransitDistance) * Cost.lyftMile;
                        const totalLyftTAndTransitCost = (lyftToTransitCost + Cost.lyftBase) + Cost.transit;
                        setLyftToTransitRadioPacket({...lyftToTransitRadioPacket, duration: lyftToTransitDuration,  distance: totalLyftAndTransitDistance+" mi", cost: "$"+totalLyftTAndTransitCost.toFixed(2)})
                    });
                });
            dirServDrive.route({...body, travelMode: getTravelMode("walking")}, (result, status) => {
                    const  info = result?.routes[0].legs[0]
                    const distance = metersToMiles(info?.distance.value)+" mi";
                    const duration = secondsToTime(info?.duration.value);
                    // setTransitRoute(result)
                    setWalkingRadioPacket({...walkingRadioPacket, duration, distance})
                });
        }
    }

    const getRoute = (request: IRouteRequest) => {
        try {
            directionsService = new google.maps.DirectionsService();
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
            {!showLyftView && <div id="map"/>}
            {showLyftView && <div id="map2"/>}
            <div  className="panel">
                <RouteInput
                    requestFn={handleRouteRequest}
                    setLyftView={setShowLyftView}
                    travelModes={[lyftToTransitRadioPacket,  lyftRadioPacket,  drivingRadioPacket, transitRadioPacket, walkingRadioPacket]}/>
                {!showLyftView && <div id="renderRoute" className={`${requestedRoute ?  "renderRoute" : ""}`}/>}
                {showLyftView && <div id="renderRoute2" className={`${requestedRoute ?  "renderRoute2" : ""}`}/>}
            </div>
        </div>
    </div>
}
export default Home;
