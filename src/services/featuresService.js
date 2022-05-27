import axios from "axios";
import { featureServiceUrl } from '../constants/url'

export const createFeature = async (payload) => {
    try {
        const response = await axios.post(`${featureServiceUrl}/create`, payload)
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

export const editFeature = async (id, payload) => {
    try {
        const response = await axios.put(`${featureServiceUrl}/edit/${id}`, payload)
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
        const response = await axios.get(`${featureServiceUrl}/${id}`)
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