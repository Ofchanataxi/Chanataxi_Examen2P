import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useOrders } from './hooks/useOrders';
import OrderFilters from './components/OrderFilters';
import OrderList from './components/OrderList';
import OrderFormModal from './components/OrderFormModal';

function App() {
    const { orders, loading, error, filters, handleFilterChange, addOrder } = useOrders();
    const [showModal, setShowModal] = useState(false);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Gestión de Compras (Clean Architecture)</h1>
            
            <OrderFilters 
                filters={filters} 
                onChange={handleFilterChange} 
                onOpenModal={() => setShowModal(true)} 
            />

            <OrderList orders={orders} loading={loading} error={error} />

            <OrderFormModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                onSubmit={addOrder} 
            />
        </Container>
    );
}

export default App;