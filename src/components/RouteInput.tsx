import React, {FC, useEffect, useState} from 'react';
import {driving, getTravelMode, IRouteRequest, lyft, lyftToTransit, transit, walking} from "../utils/GoogleMapsUtils";
import RadioButtons, {IRadioButtonsInfo} from "./RadioButtons";

export interface IRouteInput {
    requestFn: (body: IRouteRequest, lyftToTrans: boolean) => void,
    setLyftView: (lyftView: boolean) => void,
    travelModes: IRadioButtonsInfo[]
}

const RouteInput: FC<IRouteInput> = ({requestFn, travelModes, setLyftView}) => {
    const [ routeInput, setRouteInput ] =
        useState({ origin:"walmart stone mountain ga", destination:"walmart atlanta ga", travelMode:getTravelMode()})

    const [searchRouteState, setSearchRouteState] = useState(false);
    const [lyftToTrans, setLyftToTrans] = useState(false);
    const [lyftTransToggle, setLyftTransToggle] = useState(false);

    useEffect(() => {
        (routeInput.origin != "" && routeInput.destination != "") && handleSearchRoute();
    }, [searchRouteState])

    const handleSearchRoute = (e?:  any) => {
        e && e.preventDefault()
        const request: IRouteRequest = {
            origin: routeInput.origin,
            destination: routeInput.destination,
            travelMode: routeInput.travelMode,
            transitOptions: {
                modes: [google.maps.TransitMode.RAIL]
            }
        }
        requestFn(request, lyftToTrans)
    }

    const handleRadioBtns = (value: string) => {
        setLyftToTrans(value === "lyft-to-transit")
        if(!(value === "lyft-to-transit")){
            setLyftView(false)
        }
        // const newState = !lyftTransToggle
        // setLyftTransToggle(newState)
        // setLyftView(newState)
        switch (value) {
            case driving.value: {setRouteInput({...routeInput, travelMode:getTravelMode()}); break;}
            case lyft.value: {setRouteInput({...routeInput, travelMode:getTravelMode()}); break;}
            case lyftToTransit.value: {setRouteInput({...routeInput, travelMode:getTravelMode("transit")}); break;}
            case transit.value: {setRouteInput({...routeInput, travelMode:getTravelMode("transit")}); break;}
            case walking.value: {setRouteInput({...routeInput, travelMode:getTravelMode("walking")}); break;}
        }
        (routeInput.origin != "" && routeInput.destination != "") && setSearchRouteState(!searchRouteState)
    }

    const handleLyftViewToggle = () => {
        const newState = !lyftTransToggle
        setLyftTransToggle(newState)
        setLyftView(newState)
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
                <div className="btns">
                    {lyftToTrans && <button onClick={handleLyftViewToggle}>{lyftTransToggle ? "View Transit Map" : "View Lyft Map"}</button>}
                    <div/>
                    <button type="submit">Search Route</button>
                </div>

            </form>
    </div>
};

export default RouteInput;
