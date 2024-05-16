import {useState} from "react";
import {useAuthContext} from "./useAuthContext";
import {loginUser} from "../services/userService";

export const useLogIn = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (user) => {
        setIsLoading(true)
        setError(null)

        const res = await loginUser(user);
        if (res.status === 200) {
            //save the user to local storage
            const json = await res.data.user
            localStorage.setItem('user', JSON.stringify(json))
            //update authContext
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false);
        } else {
            setError(res.error)
            setIsLoading(false);
        }

    }

    return {login, isLoading, error}
}