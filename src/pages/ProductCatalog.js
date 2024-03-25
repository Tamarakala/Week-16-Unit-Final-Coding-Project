import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(setProducts)
            .catch(console.error);
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = (id) => {
        setShowModal(true);
        setProductToDelete(id);
    };

    const confirmDelete = () => {
        fetch(`https://fakestoreapi.com/products/${productToDelete}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProducts(products.filter(product => product.id !== productToDelete));
                setShowModal(false);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <Container>

            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h1>Product Catalog</h1>
                <Button variant="success" onClick={() => navigate('/add-product')}>Add New Product</Button>
            </div>


            <Table striped bordered hover responsive className="mt-4">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>
                            <Button  variant="outline-primary" size="sm"   onClick={() => navigate(`/products/${product.id}`)} className="m-1">View</Button>
                            <Button variant="outline-warning" size="sm" onClick={() => handleEdit(product.id)} className="m-1">Edit</Button>
                            <Button variant="outline-danger"  size="sm"  onClick={() => handleDelete(product.id)} className="m-1">Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductCatalog;
