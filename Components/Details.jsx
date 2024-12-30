import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import {Carousel} from 'react-bootstrap';
import '../Components/Styles/Details.css'
// import LightboxGallery from './LightboxGallery';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for styling
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';




export const Details = () => {
  return (
    <div>
        {/* <Container>
        <Row className="">
            <Col>
            <Carousel style={{
                height:''
            }}>
            <Carousel.Item>
            <img 
            className="d-block w-100 "
            style={{
                height:""
            }}
            src="https://picsum.photos/500/100" 
            alt="First slide" />
            
            </Carousel.Item>
            <Carousel.Item>
            <img 
            className="d-block w-100"
            style={{
                height:""
            }}
            src="https://picsum.photos/500/100" 
            alt="Second slide" />
            
            </Carousel.Item>
            <Carousel.Item>
            <img 
            className="d-block w-100"
            style={{
                height:""
            }}
            src="https://picsum.photos/500/100" 
            alt="Third slide" 
            
            />
            
            </Carousel.Item>

            </Carousel>
            </Col>
        </Row>
        </Container> */}
<Container>
    <Row><Col>
    
    <ResponsiveCarousel
    showThumbs={false}>
        <div>
            <img src="./src/assets/food-for-hero.jpg" alt="" />
            <p className='legend'>Slide 1</p>
        </div>
        <div>
            <img src="./src/assets/food-for-hero.jpg" alt="" />
            <p className='legend'>Slide 2</p>
        </div>
        <div>
            <img src="./src/assets/food-for-hero.jpg" alt="" />
            <p className='legend'>Slide 3</p>
        </div>
    </ResponsiveCarousel>
    
    
    </Col></Row>
</Container>

{/* <Container>
    <Row>
        <Col>
        <LightboxGallery/>
        </Col>
    </Row>
</Container> */}


<Container className='mt-3 mb-3'>
<Row className="d-flex flex-row justify-content-space-between align-items-center">
    <Col><h4>Food Address</h4></Col>
    <Col className='d-flex justify-content-end'><button style={{
        backgroundColor:'red',
         color:'white',
         padding:'10px',
         border:'none',
         }} >Place Online Order</button></Col>
</Row>


</Container>









<Container>
<Row>
    <Col>
    <Tabs>
        <TabList>
            <Tab style={{color:'#000'}} selectedTabStyle={{color:'red'}}>Overview</Tab>
            <Tab style={{color:'#000'}} selectedTabStyle={{color:'red'}}>Contact</Tab>

        </TabList>
       

    <TabPanel>
        <h1>About This Place</h1>

        <h3>Cuisine</h3>
        <p>Breakfast oklahoma</p>

        <h3>Average Cost</h3>
        <p>$2000</p>
    </TabPanel>
    <TabPanel>
        <h1>Phone number</h1>

        <h3>Pandit JJ Taraba Hub</h3>
        <p>Breakfast oklahoma</p>

    </TabPanel>
    </Tabs>
   

    </Col>
</Row>

</Container>


       


    </div>
  )
}


export default Details;