import latLng  from './latLng.json'

let map: google.maps.Map;
export const initMap = (elementId: string) => {
    // const ref = useRef(null);
    try{
        const randomState = latLng.states[getRandomArbitrary(0, latLng.states.length)];
        const currentLocation = randomState.point[getRandomArbitrary(0, randomState.point.length)]
        map = new google.maps.Map(document.getElementById(elementId) as HTMLElement, {
            center: currentLocation,
            // center: { lat: GeolocationPosition.prototype.coords.latitude, lng: GeolocationPosition.prototype.coords.longitude },
            zoom: 6
        });

        const marker = new google.maps.Marker({
            position: currentLocation,
            map: map,
        });
    }catch (e) {
        console.log(e);
    }
}

export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
