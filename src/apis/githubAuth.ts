import axios from 'axios'

const githubAuth = (code: string)  =>
    axios.post(
        import.meta.env.VITE_API_URL + 'github/auth',
        {
            code: code
        }).then(response => response.data)

export default githubAuth