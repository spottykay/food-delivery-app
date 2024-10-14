import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";

// Example JSON data (this could come from an API or a data file)
const productsData = [
    {
        id: 1,
        title: "The Breakfast Club",
        image: "https://via.placeholder.com/150",
        address: "123 Connaught Place, New Delhi",
        cuisines: ["North Indian", "Fast Food"],
        costForTwo: 700,
        category: "Breakfast"
    },
    {
        id: 2,
        title: "Morning Glory",
        image: "https://via.placeholder.com/150",
        address: "456 South Delhi, New Delhi",
        cuisines: ["South Indian", "Street Food"],
        costForTwo: 400,
        category: "Breakfast"
    },
    {
        id: 3,
        title: "Sunrise Cafe",
        image: "https://via.placeholder.com/150",
        address: "789 Chandni Chowk, New Delhi",
        cuisines: ["Chinese", "North Indian"],
        costForTwo: 1200,
        category: "Lunch"
    },
    {
        id: 4,
        title: "The Morning Dew",
        image: "https://via.placeholder.com/150",
        address: "101 Saket, New Delhi",
        cuisines: ["Street Food", "Fast Food"],
        costForTwo: 500,
        category: "Dinner"
    }
];

function Filter() {
    const { category } = useParams();  // Get category from URL params
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedCost, setSelectedCost] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // Handle Cuisine Change
    const handleCuisineChange = (e) => {
        const value = e.target.value;
        setSelectedCuisines(
            selectedCuisines.includes(value)
                ? selectedCuisines.filter(cuisine => cuisine !== value)
                : [...selectedCuisines, value]
        );
    };

    // Filter products based on selected filters and category
    const filteredProducts = productsData
        .filter(product => 
            product.category.toLowerCase() === category.toLowerCase() &&
            (!selectedLocation || product.address.includes(selectedLocation)) &&
            (selectedCuisines.length === 0 || selectedCuisines.some(cuisine => product.cuisines.includes(cuisine))) &&
            (!selectedCost || (selectedCost === 'less500' && product.costForTwo < 500) ||
            (selectedCost === '500to1000' && product.costForTwo >= 500 && product.costForTwo <= 1000) ||
            (selectedCost === '1000to1500' && product.costForTwo > 1000 && product.costForTwo <= 1500) ||
            (selectedCost === '1500to2000' && product.costForTwo > 1500 && product.costForTwo <= 2000) ||
            (selectedCost === '2000plus' && product.costForTwo > 2000))
        )
        .sort((a, b) => {
            if (sortOrder === 'lowToHigh') return a.costForTwo - b.costForTwo;
            if (sortOrder === 'highToLow') return b.costForTwo - a.costForTwo;
            return 0;
        });

    return (
        <Container fluid>
            <Row>
                {/* Sidebar for Filters */}
                <Col md={3} className="bg-light p-3">
                    <h5>Filters</h5>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Location</Form.Label>
                        <Form.Control as="select" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
                            <option value="">All Locations</option>
                            <option value="Connaught Place">Connaught Place</option>
                            <option value="South Delhi">South Delhi</option>
                            <option value="Chandni Chowk">Chandni Chowk</option>
                            <option value="Saket">Saket</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cuisine</Form.Label>
                        {['North Indian', 'South Indian', 'Chinese', 'Fast Food', 'Street Food'].map(cuisine => (
                            <Form.Check
                                key={cuisine}
                                type="checkbox"
                                label={cuisine}
                                value={cuisine}
                                onChange={handleCuisineChange}
                            />
                        ))}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cost for Two</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Less than ₹500"
                            name="cost"
                            value="less500"
                            onChange={e => setSelectedCost(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="₹500 to ₹1000"
                            name="cost"
                            value="500to1000"
                            onChange={e => setSelectedCost(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="₹1000 to ₹1500"
                            name="cost"
                            value="1000to1500"
                            onChange={e => setSelectedCost(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="₹1500 to ₹2000"
                            name="cost"
                            value="1500to2000"
                            onChange={e => setSelectedCost(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="₹2000+"
                            name="cost"
                            value="2000plus"
                            onChange={e => setSelectedCost(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Sort</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Price low to high"
                            name="sort"
                            value="lowToHigh"
                            onChange={e => setSortOrder(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="Price high to low"
                            name="sort"
                            value="highToLow"
                            onChange={e => setSortOrder(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                {/* Main Content - Products */}
                <Col md={9} className="p-3">
                    <h4>{category} Places in New Delhi</h4>
                    <Row>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <Col md={4} key={product.id} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={product.image} alt={product.title} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>
                                                Address: {product.address}<br/>
                                                Cuisines: {product.cuisines.join(', ')}<br/>
                                                Cost for Two: ₹{product.costForTwo}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No results found for your filters.</p>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Filter;
