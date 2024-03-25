import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import BreadcrumbComponent from './BreadcrumbComponent';

const ItemDetail = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${itemId}`)
            .then(res => res.json())
            .then(setItem)
            .catch(console.error);
    }, [itemId]);

    if (!item) return <div>Loading...</div>;

    return (
        <Container>
            <BreadcrumbComponent />

            <h1 className="my-4">{item.title}</h1>
            <Row>
                <Col md={6}>
                    <Image src={item.image} alt={item.title} fluid />
                </Col>
                <Col md={6}>
                    <h3>Price: ${item.price}</h3>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ItemDetail;
