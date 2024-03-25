import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <ListGroup>
            {items.map(item => (
                <ListGroup.Item key={item.id}>
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ItemList;
