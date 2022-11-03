import {combineReducers} from "redux";

interface IRouteInfo {
    origin: string,
    destination: string,
    travelMode: string
}

const initialRouteInfo: IRouteInfo = {origin:"", destination:"", travelMode:""};

export enum ActionType {
    SetAddress = "SetAddress",
    SetTravelMode = "SetTravelMode"
}

export const routeReducer = (
    state = initialRouteInfo,
    payload: IRouteInfo
) => {
    return payload
}

export const rootReducer = combineReducers({
    routeReducer
});
