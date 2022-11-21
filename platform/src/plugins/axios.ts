import axios, { Canceler } from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_ADDRESS;

export default axios;

export {
    Canceler
}
