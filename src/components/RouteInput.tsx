import React, {FC, useEffect, useState} from 'react';
import {driving, getTravelMode, IRouteRequest, lyft, lyftToTransit, transit, walking} from "../utils/GoogleMapsUtils";
import RadioButtons, {IRadioButtonsInfo} from "./RadioButtons";

export interface IRouteInput {
    requestFn: (body: IRouteRequest) => void,
    // handleLyftToTransitRadio: (body: boolean) => void
    travelModes: IRadioButtonsInfo[]
}

const RouteInput: FC<IRouteInput> = ({requestFn, travelModes}) => {
    const [ routeInput, setRouteInput ] =
        useState({ origin:"walmart stone mountain ga", destination:"walmart atlanta ga", travelMode:getTravelMode()})

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
        requestFn(request)
    }

    const handleRadioBtns = (value: string) => {
        // value === "lyft-to-transit" ? handleLyftToTransitRadio(true) : handleLyftToTransitRadio(false)
        switch (value) {
            case driving.value: {setRouteInput({...routeInput, travelMode:getTravelMode()}); break;}
            case lyft.value: {setRouteInput({...routeInput, travelMode:getTravelMode()}); break;}
            case lyftToTransit.value: {setRouteInput({...routeInput, travelMode:getTravelMode("transit")}); break;}
            case transit.value: {setRouteInput({...routeInput, travelMode:getTravelMode("transit")}); break;}
            case walking.value: {setRouteInput({...routeInput, travelMode:getTravelMode("walking")}); break;}
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
                {/*<button className="maps">view map1</button>*/}
                <button type="submit">Search Route</button>
            </form>
    </div>
};

export default RouteInput;
