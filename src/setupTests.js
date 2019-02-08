import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.google = {
    maps: {
        Map: class {
            setCenter() { }
            setZoom() { }
        },
        places: { SearchBox: class { } },
        event: { addListener: jest.fn(), removeListener: jest.fn() },
        DirectionsService: class {
            route() { }
        },
        TravelMode: class { },
        DirectionsStatus: {},
        LatLng: class { }
    }
};