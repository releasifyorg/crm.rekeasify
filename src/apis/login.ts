import axios from 'axios'

const getProfile = (username: string, password: string) =>
    axios.post(import.meta.env.VITE_API_URL + 'login', {
        username,
        password
    }).then(response => response.data)

export default getProfile