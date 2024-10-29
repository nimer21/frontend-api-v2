import axios from 'axios';

export default axios.create({
    baseURL: 'https://pixelsback.localproductsnetwork.com',
    withCredentials: true,
});