import { Carousel } from 'antd';
import React from 'react';
import './CarouselBar.scss';

const contentStyle = {
   height: '500px',
   color: '#271380',
   lineHeight: '400px',
   textAlign: 'center',
   background: 'linear-gradient(135deg, #230F77, #4230B5)',
   borderRadius: '10px',
};

function CarouseBar(props) {
   return (
      <div className='carouselBar'>
         <Carousel style={{ paddingTop: '130px ' }}>
            <div>
               <h3 style={contentStyle}> </h3>
            </div>
         </Carousel>
      </div>
   );
}

export default CarouseBar;
