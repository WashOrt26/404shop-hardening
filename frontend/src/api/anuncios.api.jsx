import axios from "axios"

const API_URL = "/api/v1/anuncios/"

export const getAnuncios = async () =>{
    const response = await axios.get(API_URL);
    return response.data;
};