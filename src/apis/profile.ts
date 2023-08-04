import axios from 'axios'

const getProfile = () =>
    axios.get(import.meta.env.VITE_API_URL + 'profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }).then(response => response.data)


export default getProfile