import axios from "axios";
import { servicesServiceUrl } from '../constants/url'

export const getUserServices = async (userId) => {
    try {
        const response = await axios.get(`${servicesServiceUrl}/owner/${userId}`)
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

export const getAllServices = async () => {
    try {
        const response = await axios.get(`${servicesServiceUrl}/all`)
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

export const bookService = async (payload) => {
    try {
        const response = await axios.post(`${servicesServiceUrl}/create`, payload)
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

export const updateService = async (payload, id) => {
    try {
        const response = await axios.put(`${servicesServiceUrl}/edit/${id}`, payload)
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
