import { Button, Divider, Typography, Row, Col, Modal, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RiMapPin3Fill } from 'react-icons/ri';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import './ProductAddressForm.scss';
import { CheckOutlined } from '@ant-design/icons';
ProductAddressForm.propTypes = {
   currentStep: PropTypes.number,
};

ProductAddressForm.defaultProps = {
   currentStep: 0,
};

const { Title, Text } = Typography;

function ProductAddressForm(props) {
   const { currentStep, handleSubmitCoordinates } = props;

   const [viewport, setViewport] = useState({
      width: '1130px',
      height: '600px',
      latitude: 16.080361568951535,
      longitude: 108.21269906483103,
      zoom: 4,
   });
   const [coordinates, setCoordinates] = useState(null);
   const [initLocation, setInitLocation] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [address, setAddress] = useState('');

   const handleDblClickOnMap = (e) => {
      const [longitude, latitude] = e.lngLat;
      setCoordinates({
         lat: latitude,
         long: longitude,
      });
   };

   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         setInitLocation([position.coords.latitude, position.coords.longitude]);
      });
   }, []);

   useEffect(() => {
      if (!initLocation) return;
      setViewport({
         ...viewport,
         latitude: initLocation[0],
         longitude: initLocation[1],
         zoom: 12,
         transitionInterpolator: new FlyToInterpolator({
            speed: 2,
         }),
         transitionDuration: 'auto',
      });
      // eslint-disable-next-line
   }, [initLocation]);

   const disableButton = !coordinates && {
      disabled: true,
   };

   return (
      <>
         {currentStep === 3 && (
            <>
               <div className='createAddress'>
                  <div className='header'>
                     <Row span={24}>
                        <Col span={16}>
                           <Title level={3}>Address of Product</Title>
                           <Text>
                              Pin your address, then press submit to confirm
                           </Text>
                        </Col>
                        <Col span={2} offset={5} className='buttonModal'>
                           <Button
                              icon={<CheckOutlined />}
                              onClick={() => {
                                 setIsModalVisible(true);
                              }}
                              {...disableButton}
                              type='primary'
                           >
                              Submit
                           </Button>
                        </Col>
                     </Row>
                     <Divider className='divider' />
                  </div>
                  <div className='mapbox'>
                     <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={
                           process.env.REACT_APP_MAP_BOX_API_KEY
                        }
                        mapStyle='mapbox://styles/thanhnguyen662/ckrga4f8z4jah17o97c5z7rrx'
                        onViewportChange={setViewport}
                        doubleClickZoom={false}
                        onDblClick={handleDblClickOnMap}
                     >
                        {coordinates && (
                           <Marker
                              offsetTop={-30}
                              longitude={coordinates.long}
                              latitude={coordinates.lat}
                              className='icon'
                           >
                              <RiMapPin3Fill
                                 style={{ fontSize: viewport.zoom * 2 }}
                              />
                           </Marker>
                        )}
                     </ReactMapGL>
                  </div>
                  <Modal
                     title='Please confirm your address 🏘'
                     visible={isModalVisible}
                     onOk={() => {
                        handleSubmitCoordinates({
                           ...coordinates,
                           productAddress: address,
                        });
                     }}
                     onCancel={() => setIsModalVisible(false)}
                  >
                     <Row className='inputModal'>
                        <label className='inputLabel'>Address:</label>
                        <Input
                           className='inputAddress'
                           onChange={(e) => setAddress(e.target.value)}
                        />
                        <em>
                           We need the address where you rent the product. This
                           is necessary so that other users can easily find you
                        </em>
                     </Row>
                  </Modal>
               </div>
            </>
         )}
      </>
   );
}

export default ProductAddressForm;
