import { useState, useEffect, useCallback } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService';

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

    // NUEVOS MÉTODOS PARA EL HOOK
    const editOrder = async (id, updatedData) => {
        try {
            await updateOrder(id, updatedData);
            await fetchOrders();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data || err.message };
        }
    };

    const removeOrder = async (id) => {
        if(!window.confirm("¿Estás seguro de eliminar esta orden?")) return;
        try {
            await deleteOrder(id);
            await fetchOrders();
        } catch (err) {
            alert(err.response?.data || "Error al eliminar");
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return { orders, loading, error, filters, handleFilterChange, addOrder, editOrder, removeOrder };
};