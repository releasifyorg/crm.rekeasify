import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Profile from '../services/Profile.tsx'
import {Spinner} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../store/user'
import {useSearchParams, useNavigate} from 'react-router-dom'

function GithubRedirect () {
    const [params] = useSearchParams()
    const code: string | null = params.get("code")

    return (
        <>
            <div className={"h-screen w-screen flex justify-center items-center"}>
                <Spinner/>
                <Redirect code={code} />
            </div>
        </>
    )

}


const Redirect: React.FC<{code: string | null}> = ({ code }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)


        const call = async () => {
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + 'github/auth', { code: code })
                dispatch(setAccessToken(response.data))
                setIsSuccess(true)
            } catch (error) {
                setIsSuccess(false)
            }
        }

        call()


    if (isSuccess === false) {
        navigate('/login')
    }

    if (isSuccess === true) {
        return <Profile/>
    }
}

export default GithubRedirect
