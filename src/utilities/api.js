import axios from "axios";

export const api = axios.create({
    baseURL: 'https://trienv-api.trauty.dev',
    withCredentials: true
});
