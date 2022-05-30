import axios from "axios";
import { featureServiceUrl } from '../constants/url'
export const createFeature = async (payload) => {
    try {
        const response = await axios.post(`${featureServiceUrl}/create/${localStorage.getItem('id')}`, payload)
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

export const getAllFeatures = async (payload) => {
    try {
        const response = await axios.get(`${featureServiceUrl}/all/${localStorage.getItem('id')}`)
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

export const editFeature = async (id, payload) => {
    try {
        const response = await axios.put(`${featureServiceUrl}/edit/${id}/${localStorage.getItem('id')}`, payload)
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

export const getFeatureById = async (id) => {
    try {
        const response = await axios.get(`${featureServiceUrl}/${id}/${localStorage.getItem('id')}`)
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