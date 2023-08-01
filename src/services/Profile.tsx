import { useSelector, useDispatch } from 'react-redux'
import { setUser, setAuth } from '../store/user'
import {UserStore} from '../types/User'
import axios from 'axios'
import Navigator from './Navigator'

import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react"

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // eslint-disable-next-line no-undef
    const url = import.meta.env.VITE_API_URL

    let { accessToken } = useSelector((state: { user: UserStore }) => state.user)

    if (!accessToken) {
        accessToken = localStorage.getItem('access_token') ?? ''
    }

    if (!accessToken) {
        navigate('/login')
    }

    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

    useEffect(() => {

        const call = async () => {
            try {
                const response = await axios.get(url + 'profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                dispatch(setUser(response.data))
                dispatch(setAuth())
                setIsSuccess(true)
            } catch (error) {
                navigate('/login')
            }
        }

        call()

    })

    console.log(isSuccess, 1)

    if (isSuccess === true) {
        // @ts-ignore
        return <Navigator/>
    }
}

export default Profile