import axios from "axios"

const baseInstance = axios.create({
    baseURL: "https://upskilling-egypt.com:3006/api/v1/"
})

export default baseInstance;