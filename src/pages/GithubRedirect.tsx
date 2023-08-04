import React from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import githubAuth from "../apis/githubAuth.ts"
import Profile from '../services/Profile.tsx'
import {Spinner} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../store/user'
import {useSearchParams, useNavigate, Navigate} from 'react-router-dom'

function GithubRedirect () {
    const [params] = useSearchParams()
    const code: string | null = params.get("code")

    if (!code) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className={"h-screen w-screen flex justify-center items-center"}>
                <Spinner/>
                <Redirect code={code} />
            </div>
        </>
    )

}


const Redirect: React.FC<{code: string}> = ({ code }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => githubAuth(code)
    })

    dispatch(setAccessToken(data))

    if (error) {
        console.log(error)
        navigate('/login')
    }

    if (!isLoading && !error) {
        return <Profile/>
    }
}

export default GithubRedirect
