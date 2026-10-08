import axios from "axios"

export const getProductByid = (id) =>{
    return axios.get(`/api/v1/productos/${id}/`)
}