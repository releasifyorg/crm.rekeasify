import React from "react";
import {useToast} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import login from "../apis/login.ts";
import {setAccessToken} from "../store/user.ts";
import Navigator from "./Navigator.tsx";
import Login from "../pages/Login.tsx";


const HandleLogin: React.FC<{username: string, password: string}> = ({ username, password }) => {
    console.log(1223)
    const toast = useToast()
    const dispatch = useDispatch()
    console.log(username, password)
    const { isLoading, error, data } = useQuery({
        queryFn: () => login(username, password)
    })

    if (error) {
        console.log(error)
        toast({
            title: 'Login failed',
            description: "Please check your credentials",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        return <Login/>
    }

    if (!isLoading && !error) {
        dispatch(setAccessToken(data))
        return <Navigator/>
    }
}

export default HandleLogin
