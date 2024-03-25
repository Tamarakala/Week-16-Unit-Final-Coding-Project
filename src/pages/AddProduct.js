import React, { useState ,useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: null // This will hold the file object
    });
    const [categories, setCategories] = useState([]);
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertMessage] = useState('');

    useEffect(() => {
        // Fetch categories from the API
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(setCategories)
            .catch(console.error);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] }); // Handle file selection
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            // Replace the content of the fetch body with the product state
            fetch('https://fakestoreapi.com/products', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json); // Log the response from the API
                    setAlertMessage('Product added successfully!');
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                    // Optionally reset the form here
                    setProduct({
                        title: '',
                        price: '',
                        description: '',
                        category: '',
                        image: 'https://i.pravatar.cc'
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    setAlertMessage('Failed to add product.');
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                });

            setValidated(true);
        }
    };

    return (
        <Container>
            <h1 className="mt-4 mb-3">Add New Product</h1>
            {showAlert && <Alert variant="success">{alertContent}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a price.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a description.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Product Category" name="category" required onChange={handleChange} value={product.category}>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please select a category.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please upload an image.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
