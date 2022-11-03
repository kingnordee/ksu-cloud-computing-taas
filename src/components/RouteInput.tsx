import React, {FC, useEffect, useState} from 'react';
import {getTravelMode, IRouteRequest, travelModes} from "../utils/GoogleMapsUtils";
import RadioButtons from "./RadioButtons";

export interface IRouteInput {
    requestFn: (body: IRouteRequest) => void
}

const RouteInput: FC<IRouteInput> = ({requestFn}) => {
    const [ routeInput, setRouteInput ] =
        useState({ origin:"", destination:"", travelMode:getTravelMode()})

    const [searchRouteState, setSearchRouteState] = useState(false);

    useEffect(() => {
        (routeInput.origin != "" && routeInput.destination != "") && handleSearchRoute();
    }, [searchRouteState])

    const handleSearchRoute = (e?:  any) => {
        e && e.preventDefault()
        const request: IRouteRequest = {
            origin: routeInput.origin,
            destination: routeInput.destination,
            travelMode: routeInput.travelMode
        }
        console.log(request);
        requestFn(request)
    }

    const handleRadioBtns = (value: string) => {
        console.log(value);
        switch (value) {
            case "driving": {setRouteInput({...routeInput, travelMode:getTravelMode()}); break;}
            case "transit": {setRouteInput({...routeInput, travelMode:getTravelMode("transit")}); break;}
            case "bicycling": {setRouteInput({...routeInput, travelMode:getTravelMode("bicycling")}); break;}
            case "walking": {setRouteInput({...routeInput, travelMode:getTravelMode("walking")}); break;}
        }
        (routeInput.origin != "" && routeInput.destination != "") && setSearchRouteState(!searchRouteState)
    }

    return <div className="routeFormWrapper">
        <h2>Route Plan</h2>
            <form onSubmit={handleSearchRoute}>
                <div className="inputs">
                    <div className="origin">
                        <label htmlFor="origin">Origin</label>
                        <input type="text" id="origin"
                               required
                               value={routeInput.origin}
                               onChange={(e => setRouteInput({...routeInput, origin: e.target.value}))}
                        />
                    </div>
                    <div className="destination">
                        <label htmlFor="password">Destination</label>
                        <input type="text" id="destination"
                               required
                               value={routeInput.destination}
                               onChange={(e => setRouteInput({...routeInput, destination: e.target.value}))}
                        />
                    </div>
                </div>
                <RadioButtons info={travelModes} handler={handleRadioBtns}/>
                <button type="submit">Search Route</button>
            </form>
    </div>
};

export default RouteInput;
