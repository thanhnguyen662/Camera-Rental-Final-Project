import { Divider, Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { RiMapPin3Fill } from 'react-icons/ri';

import './ProductAddressForm.scss';

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
      zoom: 5,
   });
   const [coordinates, setCoordinates] = useState(null);

   const handleDblClickOnMap = (e) => {
      const [longitude, latitude] = e.lngLat;
      setCoordinates({
         lat: latitude,
         long: longitude,
      });
   };

   return (
      <>
         {currentStep === 3 && (
            <>
               <div className='createAddress'>
                  <div className='header'>
                     <Title level={3}>Address of Product</Title>
                     <Text>Pin your address</Text>
                     <Divider className='divider' />
                  </div>
                  <Button onClick={() => handleSubmitCoordinates(coordinates)}>
                     OK
                  </Button>
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
               </div>
            </>
         )}
      </>
   );
}

export default ProductAddressForm;
