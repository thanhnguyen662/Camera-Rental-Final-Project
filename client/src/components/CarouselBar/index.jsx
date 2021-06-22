import { Carousel } from 'antd';
import React from 'react';

const contentStyle = {
   height: '400px',
   color: '#fff',
   lineHeight: '400px',
   textAlign: 'center',
   background: '#364d79',
};

function CarouseBar(props) {
   return (
      <>
         <Carousel autoplay style={{ margin: '25px 160px' }}>
            <div>
               <h3 style={contentStyle}>1</h3>
            </div>
            <div>
               <h3 style={contentStyle}>2</h3>
            </div>
            <div>
               <h3 style={contentStyle}>3</h3>
            </div>
            <div>
               <h3 style={contentStyle}>4</h3>
            </div>
            <div>
               <h3 style={contentStyle}>4</h3>
            </div>
         </Carousel>
      </>
   );
}

export default CarouseBar;
