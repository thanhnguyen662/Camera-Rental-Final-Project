import './PopupContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Avatar, Button } from 'antd';
import { FcLike, FcApproval, FcVoicePresentation } from 'react-icons/fc';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from 'react-router-dom';

PopupContent.propTypes = {
   viewport: PropTypes.object,
   pin: PropTypes.object,
};

PopupContent.defaultProps = {
   viewport: {},
   pin: {},
};

function PopupContent(props) {
   const { pin } = props;

   return (
      <>
         <div className='popupContent'>
            <Row className='popupInfoRow'>
               <Col span={6}>
                  <Avatar
                     className='popupAvatar'
                     src={pin.product.User.photoURL}
                  />
               </Col>
               <Col span={17}>
                  <h5>{pin.product.User.username}</h5>
                  <h6>0.3 km &bull;</h6> <u>{pin.product.User.address}</u>
               </Col>
            </Row>
            <Row className='popupRateRow'>
               <Col span={8}>
                  <FcLike className='popupRateIcon' /> <h5>100</h5>
               </Col>
               <Col span={8}>
                  <FcApproval className='popupRateIcon' /> <h5>4.5</h5>
               </Col>
               <Col span={8}>
                  <FcVoicePresentation className='popupRateIcon' /> <h5>69</h5>
               </Col>
            </Row>
            <Row className='popupProduct'>
               <Col span={11} className='popupProductImage'>
                  <img src={pin.product.productPhotoURL[0]} alt='photos' />
               </Col>
               <Col span={13} className='popupProductDescription'>
                  <h2>{pin.product.name}</h2>
                  <h3>${pin.product.price}</h3>
               </Col>
            </Row>
            <Row className='popupButtonRow'>
               <Button>
                  <Link to={`/product/${pin.product.slug}`}>More Details</Link>
               </Button>
            </Row>
         </div>
      </>
   );
}

export default PopupContent;
