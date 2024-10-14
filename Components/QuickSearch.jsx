import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function QuickSearch({image, title, description, category}){

const navigate = useNavigate();

const handleButtonClick =()=>{
    navigate(`/filter/${category}`);
};


    return(
<div>

<Card>
    <Card.Img 
    src={image}
    style={{
        height:"200px",
        objectFit:"cover",
    }}
    
    />
    <Card.Body>
    <Card.Title>
{title}
    </Card.Title>
   <Card.Text>
{description} 
   </Card.Text>
    <Button onClick={handleButtonClick} variant="success">Read More</Button>
    </Card.Body>
</Card>











</div>
    )
}



export default QuickSearch;