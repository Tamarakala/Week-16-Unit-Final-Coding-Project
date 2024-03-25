import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import ProductCatalog from './pages/ProductCatalog'; // Make sure to import ProductCatalog
import EditProduct from './pages/EditProduct'; // Make sure to import ProductCatalog
import About from './pages/About';
import AddProduct from './pages/AddProduct';
import ItemDetail from './components/ItemDetail'; // Ensure you've imported ItemDetail
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<ProductCatalog />} />
                    <Route path="/about" element={<About />} />
                    {/* Adding the route for ItemDetail with parameter */}
                    <Route path="/products/:itemId" element={<ItemDetail />} />
                    <Route path="/edit-product/:productId" element={<EditProduct />} />
                    <Route path="/add-product" element={<AddProduct />} />

                    {/* Define other routes here */}
                </Routes>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
