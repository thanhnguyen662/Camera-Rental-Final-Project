import { Button, Col, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './CategoryBar.scss';

CategoryBar.propTypes = {};

function CategoryBar(props) {
   const { categories } = props;
   const history = useHistory();

   const imagesStyle = [
      {
         img: 'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/214-2148367_canon-expand-eos-r-lineup-with-cheaper-compact-removebg.png?alt=media&token=4def4cc5-6333-49f3-b29e-2582dbf3bf22',
         css: 'imageCategory',
      },
      {
         img: 'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/%5Bremoval.ai%5D_tmp-60ea835f66110_2KW86Y.png?alt=media&token=e0c5d2f1-a96a-4c7e-a9d0-addbe3ad1627',
         css: 'imageCategory1',
      },
      {
         img: 'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/%5Bremoval.ai%5D_tmp-60ea86318d7a4_6XZ1NW.png?alt=media&token=d9b648c9-6055-423b-9142-e339233b81d7',
         css: 'imageCategory2',
      },
   ];

   return (
      <>
         <div className='category'>
            <Row gutter={[35, 35]} flex='none'>
               <Col span={8}>
                  <div className='categoryCard'>
                     <Row span={24}>
                        <Col span={12}>
                           <h1>{categories[0]?.name}</h1>
                           <h4>{categories[0]?.description}</h4>
                           <Button
                              className='buttonCard'
                              onClick={() =>
                                 history.push(
                                    `/category/${categories[0]?.name}`
                                 )
                              }
                           >
                              Shop Now
                           </Button>
                        </Col>
                        <Col span={12}>
                           <img
                              className={imagesStyle[0].css}
                              src={imagesStyle[0].img}
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
                           <h1>{categories[1]?.name}</h1>
                           <h4>{categories[1]?.description}</h4>
                           <Button
                              className='buttonCard'
                              onClick={() =>
                                 history.push(
                                    `/category/${categories[1]?.name}`
                                 )
                              }
                           >
                              Shop Now
                           </Button>
                        </Col>
                        <Col span={12}>
                           <img
                              className={imagesStyle[1].css}
                              src={imagesStyle[1].img}
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
                           <h1>{categories[2]?.name}</h1>
                           <h4>{categories[2]?.description}</h4>
                           <Button
                              className='buttonCard'
                              onClick={() =>
                                 history.push(
                                    `/category/${categories[2]?.name}`
                                 )
                              }
                           >
                              Shop Now
                           </Button>
                        </Col>
                        <Col span={12}>
                           <img
                              className={imagesStyle[2].css}
                              src={imagesStyle[2].img}
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

export default CategoryBar;
