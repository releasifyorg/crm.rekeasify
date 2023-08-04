import React, {useState} from 'react'
import {Input, useToast} from '@chakra-ui/react'
import GitHubAuth from '../components/GitHubAuth'
import {useDispatch} from "react-redux"
import login from "../apis/login.ts"
import {setAccessToken} from "../store/user.ts"
import Navigator from "../services/Navigator.tsx"

const Login: React.FC = () => {

    interface Form {
        username: string
        password: string
    }

    const toast = useToast()
    const dispatch = useDispatch()

    const [values, setValues] = useState<Form>({
        username: '',
        password: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }




    const handleSubmit = async () => {
        if (values.username && values.password) {

            login(values.username, values.password).then(
                token => {
                    dispatch(setAccessToken(token))
                    return <Navigator/>
                }
            ).catch(() => {
                toast({
                    title: 'Login failed',
                    description: "Please check your credentials",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })

        } else {
            toast({
                title: 'Validation failed',
                description: "Please enter a username and password",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <Input
                                        type="username"
                                        name="username"
                                        value={values.username}
                                        placeholder='devbob'
                                        autoComplete="current-username"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <Input
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <a
                                    onClick={handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Sign in
                                </a>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"/>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                <GitHubAuth/>
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login

