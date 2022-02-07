import axios from "axios";

export const api = axios.create({
    baseURL: 'https://tec-news.vercel.app/api'
})