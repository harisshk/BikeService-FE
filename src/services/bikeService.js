import axios from "axios";
import { bikeServiceUrl } from '../constants/url'


export const getUserBikes = async (userId) => {
    try {
        const response = await axios.get(`${bikeServiceUrl}/owner/${userId}`)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};

export const createBike = async (payload) => {
    try {
        const response = await axios.post(`${bikeServiceUrl}/create`, payload)
        console.log(response)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};
