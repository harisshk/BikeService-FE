import axios from "axios";
import { authServiceUrl } from '../constants/url'

axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    try {
        const loginResponse = await axios.post(
            `${authServiceUrl}/login`,
            {
                email: email,
                password: password,
            }
        );
        const { jwtToken, name, role, _id, avatar, } = loginResponse?.data?.user
        if (!loginResponse.data.error) {
            // localStorage.setItem("token", loginResponse.data.user.jwtToken);
            // localStorage.setItem("role", loginResponse.data.user.role)
            // localStorage.setItem("id", loginResponse.data.user._id)
            return {
                success: true,
                token: jwtToken,
                name: name,
                role: role,
                id: _id,
                avatar: avatar, 
                email: loginResponse?.data?.user?.email
            };
        } else {
            return { success: false, message: loginResponse?.data?.message };
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};

export const register = async (registerData) => {
    try {
        const registerResponse = await axios.post(
            `${authServiceUrl}/register`,
            registerData
        );
        if (!registerResponse.data.error) {
            return {
                error: false,
                duplicate: false,
            };
        }
    } catch (error) {
        console.log(error)
        if (error.response) {
            if (error.response.status === 409) {
                return {
                    error: false,
                    duplicate: true,
                };
            } else {
                return {
                    error: true,
                };
            }
        } else {
            return {
                error: true,
            };
        }
    }
};