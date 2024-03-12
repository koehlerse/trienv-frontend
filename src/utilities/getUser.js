import { api } from "./api";

export async function getUser() {
    try {
        const response = await api.get('/user/me');
        const data = response.data;
        return data;
    } catch (err) {
        return null;
    }
}