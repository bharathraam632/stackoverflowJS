import {useState} from "react";
import {useAuthContext} from "./useAuthContext";
import {registerUser} from "../services/userService";

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (user) => {
        setIsLoading(true)
        setError(null)

        const res = await registerUser(user);
        if (res.status === 201) {
            //save the user to local storage
            const json = await res.data.user
            localStorage.setItem('user', JSON.stringify(json))
            //update authContext
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false);
        } else {
            setError(res.error)
            setIsLoading(false)
        }

    }

    return {signup, isLoading, error}
}