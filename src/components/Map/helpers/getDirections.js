/* global google */

const getCoordinates = (path) => new google.maps.LatLng(Number(path[0]), Number(path[1]));
const transformToLatLng = (path) => ({ location: getCoordinates(path) });
const transformDirection = (result) => {
    const computed = result.routes[0].legs.reduce((total, current) => {
        total.distance += current.distance.value;
        total.duration += current.duration.value;
        return total
    }, { distance: 0, duration: 0 });
    return ({
        directions: result,
        distance: computed.distance,
        duration: computed.duration,
    });
}

export const getDirections = (paths = []) => {
    const { DirectionsService, TravelMode, DirectionsStatus } = google.maps;
    const directionsService = new DirectionsService();
    const transformedPaths = paths.map(transformToLatLng);
    const waypoints = transformedPaths.slice(1, -1);
    return new Promise((resolve, reject) => {
        directionsService.route({
            origin: transformedPaths[0],
            destination: transformedPaths[1],
            waypoints,
            travelMode: TravelMode.DRIVING,
        }, (result, status) => {
            if (status === DirectionsStatus.OK) {
                const transformedResult = transformDirection(result)
                resolve(transformedResult);
            } else {
                reject(`error fetching directions ${result}`);
            }
        });
    });
}
