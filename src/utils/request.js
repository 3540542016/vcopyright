import Axios from "axios";

const request = Axios.create({
    baseURL: 'http://localhost:8080', 
    timeout: 5000,
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default request;
