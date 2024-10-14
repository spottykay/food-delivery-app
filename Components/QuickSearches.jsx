import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QuickSearch from './QuickSearch';

function QuickSearches() {
    const [quickSearchData, setQuickSearchData] = useState([]); // State for the fetched data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5010/api/mealtypes'); // Your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuickSearchData(data); // Set the fetched data to state
            } catch (error) {
                setError(error.message); // Handle errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Runs only once when the component mounts

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Container className="mt-5 mb-5">
                <Row>
                    <Col>
                        <h1>Quick Searches</h1>
                    </Col>
                </Row>
                <Row>
                    {quickSearchData.slice(0, 3).map((foodtime, index) => (
                        <Col key={index}>
                            <QuickSearch
                                title={foodtime.title}
                                description={foodtime.description}
                                category={foodtime.category}
                                image={foodtime.image}
                            />
                        </Col>
                    ))}
                </Row>

                {/* this is the second row of the quick search list */}
                <Row className="mt-3">
                    {quickSearchData.slice(3, 6).map((foodtime, index) => (
                        <Col key={index}>
                            <QuickSearch
                                title={foodtime.title}
                                description={foodtime.description}
                                category={foodtime.category}
                                image={foodtime.image}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default QuickSearches;
