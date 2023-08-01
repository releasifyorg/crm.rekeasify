import { useSelector, useDispatch } from 'react-redux'
import { checkFirst } from '../store/user'
import {useNavigate} from 'react-router-dom'
import {UserStore} from '../types/User'

const Navigator: () => void = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { initialRoute } = useSelector((state: { user: UserStore }) => state.user)

    if (initialRoute) {
        dispatch(checkFirst())
        navigate(initialRoute)
    }

    dispatch(checkFirst())
    navigate('/')

}

export default Navigator