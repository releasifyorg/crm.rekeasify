import axios from 'axios'

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru,en;q=0.5'
    },
})
