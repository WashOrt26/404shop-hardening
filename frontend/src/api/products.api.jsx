import axios from "axios";

export const productsapi = () => {
    return axios.get("/api/v1/productos/");
};

