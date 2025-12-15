import { Form, Row, Col, Button } from 'react-bootstrap';

const OrderFilters = ({ filters, onChange, onOpenModal }) => {
    return (
        <div className="p-3 mb-4 bg-light rounded shadow-sm">
            <Row className="g-3">
                <Col md={3}>
                    <Form.Control 
                        type="text" placeholder="Buscar..." name="q" 
                        value={filters.q} onChange={onChange} 
                    />
                </Col>
                <Col md={2}>
                    <Form.Select name="status" value={filters.status} onChange={onChange}>
                        <option value="">Estado...</option>
                        <option value="DRAFT">Draft</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="CANCELLED">Cancelled</option>
                    </Form.Select>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" onClick={onOpenModal}>+ Nueva Orden</Button>
                </Col>
            </Row>
        </div>
    );
};
export default OrderFilters;