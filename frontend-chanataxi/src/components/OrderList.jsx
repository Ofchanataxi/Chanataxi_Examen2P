import { Table, Badge, Spinner, Alert } from 'react-bootstrap';

const OrderList = ({ orders, loading, error }) => {
    const getBadgeBg = (status) => {
        const map = { APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'danger', SUBMITTED: 'info' };
        return map[status] || 'secondary';
    };

    if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
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
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.supplierName}</td>
                        <td><Badge bg={getBadgeBg(order.status)}>{order.status}</Badge></td>
                        <td>{order.totalAmount} {order.currency}</td>
                        <td>{order.expectedDeliveryDate}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
export default OrderList;