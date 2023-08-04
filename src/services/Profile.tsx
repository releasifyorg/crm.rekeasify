import { useDispatch } from 'react-redux'
import Navigator from './Navigator'

import {useNavigate} from 'react-router-dom'
import {useQuery} from "@tanstack/react-query";
import getProfile from "../apis/profile.ts";
import {setUser} from "../store/user.ts";
import React from "react";

const Profile: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { isLoading, isError, data } = useQuery({
        queryFn: () => getProfile()
    })

    if (isError) {
        navigate('/login')
    }

    dispatch(setUser(data))


    if (!isLoading && !isError) {
        return <Navigator/>
    }
}

export default Profile