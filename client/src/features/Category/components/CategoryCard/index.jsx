import { Button, Col, Row } from 'antd';
import React from 'react';
import './CategoryCard.scss';
// import PropTypes from 'prop-types';
CategoryCard.propTypes = {};

function CategoryCard(props) {
   return (
      <>
         <div className='category'>
            <Row gutter={[35, 35]}>
               <Col span={8}>
                  <div className='categoryCard'>
                     <Row span={24}>
                        <Col span={12}>
                           <h1>DSLR</h1>
                           <h4>
                              Proident sunt amet tempor incididunt non ea culpa
                              anim fugiat consectetur.
                           </h4>
                           <Button className='buttonCard'>Shop Now</Button>
                        </Col>
                        <Col span={12}>
                           <img
                              className='imageCategory'
                              src='https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/214-2148367_canon-expand-eos-r-lineup-with-cheaper-compact-removebg.png?alt=media&token=4def4cc5-6333-49f3-b29e-2582dbf3bf22'
                              alt='photos'
                           />
                        </Col>
                     </Row>
                  </div>
               </Col>
               <Col span={8}>
                  <div className='categoryCard'>
                     <Row span={24}>
                        <Col span={12}>
                           <h1>Lens</h1>
                           <h4>
                              Reprehenderit ex et ad mollit. Laboris veniam
                              magna amet mollit dolore.
                           </h4>
                           <Button className='buttonCard'>Shop Now</Button>
                        </Col>
                        <Col span={12}>
                           <img
                              className='imageCategory1'
                              src='https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/%5Bremoval.ai%5D_tmp-60ea835f66110_2KW86Y.png?alt=media&token=e0c5d2f1-a96a-4c7e-a9d0-addbe3ad1627'
                              alt='photos'
                           />
                        </Col>
                     </Row>
                  </div>
               </Col>
               <Col span={8}>
                  <div className='categoryCard'>
                     <Row span={24}>
                        <Col span={12}>
                           <h1>Accessories</h1>
                           <h4>
                              Aliquip amet commodo non culpa eu officia deserunt
                              aute culpa quis.
                           </h4>
                           <Button className='buttonCard'>Shop Now</Button>
                        </Col>
                        <Col span={12}>
                           <img
                              className='imageCategory2'
                              src='https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/%5Bremoval.ai%5D_tmp-60ea86318d7a4_6XZ1NW.png?alt=media&token=d9b648c9-6055-423b-9142-e339233b81d7'
                              alt='photos'
                           />
                        </Col>
                     </Row>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default CategoryCard;
