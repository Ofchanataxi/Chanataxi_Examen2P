import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useOrders } from './hooks/useOrders';
import OrderFilters from './components/OrderFilters';
import OrderList from './components/OrderList';
import OrderFormModal from './components/OrderFormModal';

function App() {
    const { orders, loading, error, filters, handleFilterChange, addOrder, editOrder, removeOrder } = useOrders();
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    const handleOpenModal = (order = null) => {
        setEditingOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setEditingOrder(null);
        setShowModal(false);
    };

    const handleSaveOrder = async (orderData) => {
        if (editingOrder) {
            return await editOrder(editingOrder.id, orderData);
        } else {
            return await addOrder(orderData);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Gestión de Compras (CRUD Completo)</h1>
            
            <OrderFilters 
                filters={filters} 
                onChange={handleFilterChange} 
                onOpenModal={() => handleOpenModal()} 
            />

            <OrderList 
                orders={orders} 
                loading={loading} 
                error={error} 
                onEdit={handleOpenModal} 
                onDelete={removeOrder}
            />

            <OrderFormModal 
                show={showModal} 
                onHide={handleCloseModal} 
                onSubmit={handleSaveOrder} 
                orderToEdit={editingOrder}
            />
        </Container>
    );
}

export default App;