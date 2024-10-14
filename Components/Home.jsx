import React from "react";
import './Styles/Home.css'
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import QuickSearches from "./QuickSearches";


function Home(){
    return(
<div>


<Container fluid className="hero ps-2 pe-2 pt-3 pb-3 bg-image">
  <div className="overlay"></div>

  <Container className="content">
  

        <Row className="hero-content bg-image mt-5 d-flex justify-content-center flex-column align-items-center ">
        <Col className="text-center " style={{maxWidth:'600px'}}>
        
        <img src='../src/assets/edureka-logo.jpg' className="rounded-circle img-fluid edurekaImg"/><br/>
      <span className="fs-1 fw-bolder" style={{color:'white'}}>Discover the Best Foods and Drinks in Delhi NCR</span>
       
       <Form>
        <Form.Control type="text" placeholder="enter location"/>
       </Form>
        </Col>
    </Row>

  </Container>


</Container>{/*Hero container Parent end*/}


<Container className="ps-0 pe-0 rounded bg-image" style={{backgroundImage:'url(../src/assets/gas-cylinder.jpg)',
backgroundSize:'cover',
backgroundRepeat:'no-repeat',
backgroundPosition:'center',
width:'100%',
height:'300px',
marginTop:'50px',
position:'relative',
overflow:'hidden'
}}>



<div className="overlay2"></div>
   
  <Container className="content d-flex justify-content-start align-items-center h-100">
        <Row className="">
        <Col>
        <h1 className="fs-1 fw-bolder">India Needs Oxygen</h1>
        <div className="fs-4">Donate to Help Us Provide Oxygen Solutions to Hospitals <i className="fa-solid fa-circle-arrow-right"></i></div> 
        </Col>
       
        </Row>
   
</Container>
</Container>

<QuickSearches/>


</div>

    )
}

export default Home;