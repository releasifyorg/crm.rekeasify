import { useDispatch } from 'react-redux'
import { setAccessToken} from '../store/user.ts'
import {useProfile} from "./profile.ts";
import {useNavigator} from "./navigator.ts";
import axios from 'axios'

export const useGithub = async (code: string) => {
    const dispatch = useDispatch()

        const response = await axios
            .post(
                import.meta.env.VITE_API_URL + 'github/auth',
                {
                    code: code
                }
            )

        dispatch(setAccessToken(response.data))
        await useProfile()
        await useNavigator()

        if (!response.data) {
            throw new Error('Github auth failed')
        }


}