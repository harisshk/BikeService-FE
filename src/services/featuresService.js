import axios from "axios";
import { featureServiceUrl } from '../constants/url'

// export const getUserBikes = async (userId) => {
//     try {
//         const response = await axios.get(`${bikeServiceUrl}/owner/${userId}`)
//         if (response.data.success) {
//             return {
//                 ...response?.data
//             }
//         }
//     } catch (error) {
//         console.log("err", error)
//         return { success: false, message: error?.response?.data?.message };
//     }
// };

export const getAllFeatures = async (payload) => {
    try {
        const response = await axios.get(`${featureServiceUrl}/all`)
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
