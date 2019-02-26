import { useEffect, useState } from 'react';
import { getDirections } from './helpers/getDirections';

const defaultDetails = { directions: null, distance: '', duration: '' };

export const useDirections = (paths) => {
    const [details, setDetails] = useState(defaultDetails);
    useEffect(() => {
        console.log('called');
        if (paths.length === 0) {
            setDetails(defaultDetails);
            return
        }
        console.log('----', getDirections)
        getDirections(paths)
            .then((result) => {
                setDetails(result);
            })
            .catch((error) => {
                console.log(error);
                setDetails(defaultDetails)
            });
    }, [paths]);
    return details;
};
