import { Table, Badge, Spinner, Alert, Button } from 'react-bootstrap';

const OrderList = ({ orders, loading, error, onEdit, onDelete }) => {
    const getBadgeBg = (status) => {
        const map = { APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'secondary', SUBMITTED: 'info', DRAFT: 'warning' };
        return map[status] || 'light';
    };

    if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{typeof error === 'object' ? JSON.stringify(error) : error}</Alert>;
    if (orders.length === 0) return <Alert variant="info">No se encontraron órdenes.</Alert>;

    return (
        <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
                <tr>
                    <th>N° Orden</th>
                    <th>Proveedor</th>
                    <th>Estado</th>
                    <th>Monto</th>
                    <th>Entrega</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.supplierName}</td>
                        <td><Badge bg={getBadgeBg(order.status)} text={order.status === 'DRAFT' ? 'dark' : 'white'}>{order.status}</Badge></td>
                        <td>{order.totalAmount} {order.currency}</td>
                        <td>{order.expectedDeliveryDate}</td>
                        <td>
                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onEdit(order)}>
                                ✏️
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => onDelete(order.id)}>
                                🗑️
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
export default OrderList;