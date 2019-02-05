import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL

export const getPath = ({ pick, drop }) =>
    axios
        .post(`${apiUrl}/route`,
            {
                pick,
                drop,
            })
        .then(({ data: { token } }) => axios.get(`${apiUrl}/route/${token}`))
