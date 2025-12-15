import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const OrderFormModal = ({ show, onHide, onSubmit }) => {
    const initialState = {
        orderNumber: '', supplierName: '', status: 'DRAFT',
        totalAmount: '', currency: 'USD', expectedDeliveryDate: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const result = await onSubmit(formData);
        if (result.success) {
            setFormData(initialState);
            setErrorMsg(null);
            onHide();
        } else {
            setErrorMsg(result.error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton><Modal.Title>Nueva Orden</Modal.Title></Modal.Header>
            <Modal.Body>
                {errorMsg && <Alert variant="danger">{typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg}</Alert>}
                <Form>
                    <Row>
                        <Col><Form.Control name="orderNumber" placeholder="N° Orden" onChange={handleChange} /></Col>
                        <Col><Form.Control name="supplierName" placeholder="Proveedor" onChange={handleChange} /></Col>
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