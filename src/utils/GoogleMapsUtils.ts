import {IRadioButtonsInfo} from "../components/RadioButtons";

export const gMaps = () => google.maps;
export type AddressType = google.maps.LatLng | string | google.maps.Place
export type TravelModeType = google.maps.TravelMode

export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export interface IRouteRequest {
    origin: AddressType,
    destination: AddressType,
    travelMode: TravelModeType
}

export const driving: IRadioButtonsInfo = {
    name: "Driving",
    value: "driving",
    id: "driving"
}
export const bicycling: IRadioButtonsInfo = {
    name: "Bicycling",
    value: "bicycling",
    id: "bicycling"
}
export const walking: IRadioButtonsInfo = {
    name: "Walking",
    value: "walking",
    id: "walking"
}
export const transit: IRadioButtonsInfo = {
    name: "Transit",
    value: "transit",
    id: "transit"
}

export const travelModes: IRadioButtonsInfo[] =  [driving, transit, bicycling, walking]

export const getTravelMode = (mode?: string) => {
  switch (mode) {
      case "transit":  return gMaps().TravelMode.TRANSIT
      case "bicycling":  return gMaps().TravelMode.BICYCLING
      case "walking":  return gMaps().TravelMode.WALKING
      default: return gMaps().TravelMode.DRIVING
  }
}
