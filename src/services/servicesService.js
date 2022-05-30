import axios from "axios";
import { servicesServiceUrl } from '../constants/url'


export const getUserServices = async (userId) => {
    try {
        const response = await axios.get(`${servicesServiceUrl}/owner/${userId}/${localStorage.getItem('id')}`)
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
        const response = await axios.get(`${servicesServiceUrl}/all/${localStorage.getItem('id')}`)
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
        const response = await axios.post(`${servicesServiceUrl}/create/${localStorage.getItem('id')}`, payload)
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
    console.log("UPDATE", payload, id)
    try {
        const response = await axios.put(`${servicesServiceUrl}/edit/${id}/${localStorage.getItem('id')}`, payload)
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
