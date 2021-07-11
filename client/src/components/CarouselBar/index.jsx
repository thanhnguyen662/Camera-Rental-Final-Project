import { Carousel } from 'antd';
import React from 'react';
import './CarouselBar.scss';

const contentStyle = {
   height: '500px',
   color: '#fff',
   lineHeight: '400px',
   textAlign: 'center',
   background: '#364d79',
   // borderRadius: '16px',
};

function CarouseBar(props) {
   return (
      <div className='carouselBar'>
         <Carousel
         // className='carouselBar'
         // autoplay
         // style={{ margin: '25px 110px', borderRadius: '16px' }}
         >
            <div>
               <h3 style={contentStyle}>1</h3>
            </div>
         </Carousel>
      </div>
   );
}

export default CarouseBar;
