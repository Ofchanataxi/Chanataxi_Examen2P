import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const OrderFormModal = ({ show, onHide, onSubmit }) => {
    // Estado inicial con todos los campos requeridos
    const initialState = {
        orderNumber: '', 
        supplierName: '', 
        status: 'DRAFT',
        totalAmount: '', 
        currency: 'USD', 
        expectedDeliveryDate: ''
    };
    
    const [formData, setFormData] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const result = await onSubmit(formData);
        if (result.success) {
            setFormData(initialState); // Limpiar formulario al guardar
            setErrorMsg(null);
            onHide();
        } else {
            // Mostrar errores del backend
            setErrorMsg(result.error); 
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Orden</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Mostrar alerta si hay errores */}
                {errorMsg && (
                    <Alert variant="danger">
                        {typeof errorMsg === 'object' 
                            ? Object.values(errorMsg).map((msg, idx) => <div key={idx}>• {msg}</div>)
                            : errorMsg}
                    </Alert>
                )}
                
                <Form>
                    {/* Fila 1: Número de Orden y Proveedor */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>N° Orden</Form.Label>
                            <Form.Control 
                                name="orderNumber" 
                                value={formData.orderNumber}
                                placeholder="Ej: PO-001" 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col>
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Control 
                                name="supplierName" 
                                value={formData.supplierName}
                                placeholder="Ej: ACME Corp" 
                                onChange={handleChange} 
                            />
                        </Col>
                    </Row>

                    {/* Fila 2: Estado y Moneda */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Estado</Form.Label>
                            <Form.Select name="status" value={formData.status} onChange={handleChange}>
                                <option value="DRAFT">DRAFT</option>
                                <option value="SUBMITTED">SUBMITTED</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Moneda</Form.Label>
                            <Form.Select name="currency" value={formData.currency} onChange={handleChange}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    {/* Fila 3: Monto Total y Fecha de Entrega (LOS QUE FALTABAN) */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Monto Total</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.01" 
                                name="totalAmount" 
                                value={formData.totalAmount}
                                placeholder="0.00" 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col>
                            <Form.Label>Fecha Entrega</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="expectedDeliveryDate" 
                                value={formData.expectedDeliveryDate}
                                onChange={handleChange} 
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderFormModal;