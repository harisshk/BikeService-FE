import axios from "axios";
import { userServiceUrl } from '../constants/url'

export const getDashboardCustomer = async (userId) => {
    try {
        const response = await axios.get(`${userServiceUrl}/customer/dashboard/${userId}`)
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

