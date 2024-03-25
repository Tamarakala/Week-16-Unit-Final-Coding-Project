import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
// Import Toast components at the top of your EditProduct component file
import { Toast, ToastContainer } from 'react-bootstrap';

import BreadcrumbComponent from '../components/BreadcrumbComponent';




// Modify the handleSubmit function to show the toast on successful update
const EditProduct = () => {
    // Inside your EditProduct component, add the following states
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('')

    const { productId } = useParams();
    // const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
    });

    useEffect(() => {
        // Fetch the current product details
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setToastMessage('Product updated successfully!');
                setShowToast(true);
                // Navigate back or perform any other action
            });
    };

    return (
        <Container>
            <BreadcrumbComponent />

            <h1>Edit Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product image URL"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Product
                </Button>
            </Form>


            <ToastContainer className="p-3" position="top-end">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

        </Container>
    );
};

export default EditProduct;
