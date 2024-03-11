import axios from "axios";

import jsCookie from "js-cookie";

export const api = axios.create({
    baseURL: 'https://trienv-api.trauty.dev'
});

async function refreshToken() {
    try {
        const body = new URLSearchParams();
        body.append("refresh_token", jsCookie.get("trienv_refresh_token"));

        const res = await api.post("/auth/refresh", body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return res.data["access_token"];

    } catch (err) {
        console.log(err);
    }
}

api.interceptors.request.use(
    async config => {
        const accessToken = jsCookie.get("trienv_access_token");
        config.headers = {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        return config;
    },
    err => {
        Promise.reject(err);
    }
);

api.interceptors.response.use((res) => {
        return res;    
    }, async function (err) {
        const originalReq = err.config;
        if (err.response.status === 401 && !originalReq._retry) {
            originalReq._retry = true;
            const accessToken = await refreshToken();
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            return api(originalReq);
        }
        return Promise.reject(err);
    }

);