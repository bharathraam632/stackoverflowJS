import {api, REACT_APP_API_URL} from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

const registerUser = async (user) => {
    return await api.post(`${USER_API_URL}/signUser`, user).then(res => {
            if (res.status === 201 || res.status === 200) {
                return res
            } else {
                return {status: res.response.status, error: res.response.data.error}
            }
        }
    ).catch(error => {
        return {status: 500, error: error.response.data}
    })
};

const loginUser = async (user) => {
    return await api.post(`${USER_API_URL}/loginUser`, user).then(res => {
            if (res.status === 201 || res.status === 200) {
                return res
            } else {
                return {status: res.response.status, error: res.response.data.error}
            }
        }
    ).catch(error => {
        return {status: 500, error: error.response.data}
    })
};

const findUserByUsername = async (userName) => {
    return await api.post(`${USER_API_URL}/getUserProfile`, {userName: userName}).then(res => {
            if (res.status === 200) {
                return res
            } else {
                return {status: res.response.status, error: res.response.data.error}
            }
        }
    ).catch(error => {
        return {status: 500, error: error.response.data}
    })
}

export {registerUser, loginUser, findUserByUsername};