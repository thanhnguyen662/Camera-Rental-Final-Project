import { Carousel, Image } from 'antd';
import React from 'react';
import './CarouselBar.scss';

// const contentStyle = {
//    height: '500px',
//    color: '#271380',
//    lineHeight: '400px',
//    textAlign: 'center',
//    background: 'linear-gradient(135deg, #230F77, #4230B5)',
//    borderRadius: '10px',
// };

function CarouseBar(props) {
   return (
      <div className='carouselBar'>
         <Carousel style={{ paddingTop: '130px ' }}>
            <div>
               <Image
                  src='https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/banner1_auto_x2.png?alt=media&token=dc018d64-a19a-4642-9980-eb1f0051997e'
                  preview={false}
                  style={{ borderRadius: '15px' }}
               />
            </div>
         </Carousel>
      </div>
   );
}

export default CarouseBar;
