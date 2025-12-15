import { useState, useEffect, useCallback } from 'react';
import { getOrders, createOrder } from '../services/orderService';

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        q: '', status: '', currency: '', minTotal: '', maxTotal: '', from: '', to: ''
    });

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOrders(filters);
            setOrders(data);
        } catch (err) {
            setError(err.response?.data || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const addOrder = async (newOrder) => {
        try {
            await createOrder(newOrder);
            await fetchOrders();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data || err.message };
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return { orders, loading, error, filters, handleFilterChange, addOrder };
};