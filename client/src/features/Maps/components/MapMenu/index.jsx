import { Avatar, Col, Image, Row, Space, Typography, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { FcApproval, FcLike, FcVoicePresentation } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import './MapMenu.scss';

MapMenu.propTypes = {
   pins: PropTypes.array,
   handleOnClickMenuItem: PropTypes.func,
   selectedMarker: PropTypes.array,
};

MapMenu.defaultProps = {
   pins: [],
   handleOnClickMenuItem: null,
   selectedMarker: [],
};

const { Text } = Typography;

function MapMenu(props) {
   const { pins, handleOnClickMenuItem } = props;

   return (
      <>
         <Space size={10} direction='vertical'>
            {pins?.map((pin) => (
               <div
                  className='menuProductList'
                  key={pin.id}
                  onClick={() => {
                     handleOnClickMenuItem(pin);
                  }}
               >
                  <Row gutter={[22, 10]} justify='center' align='middle'>
                     <Col flex='auto'>
                        <Space>
                           <Link to={`/profile/${pin.product.User.firebaseId}`}>
                              <Avatar
                                 src={pin.product.User.photoURL}
                                 size={36}
                              />
                           </Link>
                           <div>
                              <Text className='menuListUsername'>
                                 <Link
                                    to={`/profile/${pin.product.User.firebaseId}`}
                                 >
                                    {pin.product.User.username}
                                 </Link>
                              </Text>
                              <Tooltip
                                 title={`${pin.ward}, ${pin.district}, ${pin.city}`}
                              >
                                 <Text className='menuListAddress'>{`${pin.address}`}</Text>
                              </Tooltip>
                           </div>
                        </Space>
                        <div>
                           <Row className='popupRateRow'>
                              <Col span={8}>
                                 <FcLike className='popupRateIcon' />{' '}
                                 <h5>{pin.product.User.rate}</h5>
                              </Col>
                              <Col span={8}>
                                 <FcApproval className='popupRateIcon' />{' '}
                                 <h5>{pin.product.qualityRate}</h5>
                              </Col>
                              <Col span={8}>
                                 <FcVoicePresentation className='popupRateIcon' />{' '}
                                 <h5>
                                    {pin.product.productComments?.length || 0}
                                 </h5>
                              </Col>
                           </Row>
                        </div>
                     </Col>
                     <Col>
                        <Image
                           src={pin.product.productPhotoURL[0]}
                           width={50}
                        />
                     </Col>
                  </Row>
               </div>
            ))}
         </Space>
      </>
   );
}

export default MapMenu;
