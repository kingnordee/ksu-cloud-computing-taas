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
    travelMode: TravelModeType,
    transitOptions: {
        modes?: google.maps.TransitMode[];
    }
}

export const getTravelMode = (mode?: string) => {
  switch (mode) {
      case "transit":  return gMaps().TravelMode.TRANSIT
      case "lyft-to-transit":  return gMaps().TravelMode.TRANSIT
      case "walking":  return gMaps().TravelMode.WALKING
      default: return gMaps().TravelMode.DRIVING
  }
}

export const lyftToTransit: IRadioButtonsInfo = {
    name: "Lyft-to-Transit",
    value: "lyft-to-transit",
    id: "lyft-to-transit",
    distance: "",
    duration: "",
    cost: ""
}
export const lyft: IRadioButtonsInfo = {
    name: "Lyft",
    value: "lyft",
    id: "lyft",
    distance: "",
    duration: "",
    cost: "N/A"
}
export const driving: IRadioButtonsInfo = {
    name: "Driving",
    value: "driving",
    id: "driving",
    distance: "",
    duration: "",
    cost: ""
}
export const transit: IRadioButtonsInfo = {
    name: "Transit",
    value: "transit",
    id: "transit",
    distance: "",
    duration: "",
    cost: ""
}
export const walking: IRadioButtonsInfo = {
    name: "Walking",
    value: "walking",
    id: "walking",
    distance: "",
    duration: "",
    cost: "$0.00"
}

export enum Cost {
    lyftBase = 10,
    lyftMile  = 2.00,
    driveMile = 0.63,
    transit = 2.50
}

export const metersToMiles = (meters: number) => {
    return (Number(meters)*0.000621371192).toFixed(1);
}
export const milesToMeters = (miles: number) => {
    return (Number(miles)*1609.344).toFixed(1);
}

export const secondsToTime = (seconds: number) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    // const s = Math.floor(seconds % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? "hr " : "hrs ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? "min " : "mins ") : "";
    // const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay //+ sDisplay;
}
