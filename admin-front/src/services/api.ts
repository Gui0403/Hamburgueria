import { useAuthStore } from "@/store/authStore";
import axios from "axios";


export const api = axios.create({
    baseURL:
        `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        "Accept": "application/json",
        'X-Requested-With': 'XMLHttpRequest'
    }
});

api.interceptors.request.use(
    (config) => {
        const token =
            useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);
