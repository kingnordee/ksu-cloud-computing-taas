import {IRadioButtonsInfo} from "../components/RadioButtons" //"../components/RadioButtons";

export const gMaps = () => google.maps;
export type AddressType = google.maps.LatLng | string | google.maps.Place
export type TravelModeType = google.maps.TravelMode

export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
// SHA256:SXzkWHoxn60lCHxvfzaHHehX0CVKGFqzwE0XQK4snis ec2-user@ip-172-30-4-196.ec2.internal

// ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9JxRrg1aUbyOvdjeWmG2NobA7biYIOaYKkHjXauLRyWZhmf2hydEnJCJSeutU/DOpxW7nR7sO19YleHNAAz1CR+DVHXgyIM3g56ytHIR7Hdz0CDNLK9nOxwrpkLC8pC5vhrRKc7TjhqTJUPrQs4isWyag5YBzhNXVOfeJZ3APpdVn5Oq5C7HyWsGSh1yefAjJHI0u3matUAjRbYdJZp7VFPK3A3QlDNMhewBszjlPNBstWDfPHvS6l1Sd0fslAlV7W6RLH+aAVlLV9aQR7ctdTMWCtZ3eAFYLfnFzhPnIL7LQ2E2t6WmxQ7WPkSz6D7yQe2QrcDzAMz9U93ZfWIYr ec2-user@ip-172-30-4-196.ec2.internal

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
