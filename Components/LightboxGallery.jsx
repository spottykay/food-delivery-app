import React, { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css'
import './Styles/LightboxGallery.css'

const LightboxGallery = ()=>{
const [showGallery, setShowGallery] = useState(false)


const images =[
    {url :"https://picsum.photos/500/150", title:"Image One"},
    {url :"./src/assets/edureka-logo.jpg", title:"Image Two"},
    {url :"./src/assets/food-for-hero.jpg", title:"Image Three"},
    {url :"https://picsum.photos/500/150", title:"Image Four"},
 
];

return(
    <div>
       <div className='bg d-flx flex-direction-column align-content-flex-end justify-content-end align-items-end'>
       <button onClick={() => setShowGallery(true)} style={{
            position:"absolute", bottom:"5px", right:"5px"

        }} className='btn btn-light'>Click Here to Show Gallery</button>

{showGallery && <Lightbox images={images} onClose={() => setShowGallery(false)}/>}
       </div>
       
    </div>
)
}


export default LightboxGallery;