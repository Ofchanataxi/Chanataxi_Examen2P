import { Form, Row, Col, Button } from 'react-bootstrap';

const OrderFilters = ({ filters, onChange, onOpenModal }) => {
    return (
        <div className="p-3 mb-4 bg-light rounded shadow-sm">
            {/* Primera Fila: Búsqueda, Estado, Moneda y Botón de Crear */}
            <Row className="g-3 mb-3">
                <Col md={4}>
                    <Form.Control 
                        type="text" placeholder="Buscar por orden o proveedor..." name="q" 
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
                <Col md={2}>
                    <Form.Select name="currency" value={filters.currency} onChange={onChange}>
                        <option value="">Moneda...</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </Form.Select>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" onClick={onOpenModal}>+ Nueva Orden</Button>
                </Col>
            </Row>

            {/* Segunda Fila: Filtros Avanzados (Rango de Precios y Fechas) */}
            <Row className="g-3">
                <Col md={2}>
                    <Form.Control 
                        type="number" placeholder="Min $" name="minTotal" 
                        value={filters.minTotal} onChange={onChange} 
                    />
                </Col>
                <Col md={2}>
                    <Form.Control 
                        type="number" placeholder="Max $" name="maxTotal" 
                        value={filters.maxTotal} onChange={onChange} 
                    />
                </Col>
                <Col md={3} className="d-flex align-items-center">
                    <span className="me-2 text-muted">Desde:</span>
                    <Form.Control 
                        type="datetime-local" name="from" 
                        value={filters.from} onChange={onChange} 
                    />
                </Col>
                <Col md={3} className="d-flex align-items-center">
                    <span className="me-2 text-muted">Hasta:</span>
                    <Form.Control 
                        type="datetime-local" name="to" 
                        value={filters.to} onChange={onChange} 
                    />
                </Col>
            </Row>
        </div>
    );
};

export default OrderFilters;