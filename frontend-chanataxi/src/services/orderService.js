import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/purchase-orders";

export const getOrders = async (filters = {}) => {
    const params = {};
    Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== '') {
            params[key] = filters[key];
        }
    });
    const response = await axios.get(API_URL, { params });
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};