import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL

export default async ({ pick, drop }) => {
    const { data: { token } } = await axios.post(`${apiUrl}/route`, { pick, drop, });
    return axios.get(`${apiUrl}/route/${token}`);
}

