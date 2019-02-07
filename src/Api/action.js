import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL

export const getPath = async ({ pick, drop }) => {
    const { data: { token } } = await axios.post(`${apiUrl}/route`, { pick, drop, });
    return axios.get(`${apiUrl}/route/${token}`);
}

