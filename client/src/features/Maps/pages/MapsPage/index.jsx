import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im';
import './MapsPage.scss';
import { Row, Col } from 'antd';

MapsPage.propTypes = {};

function MapsPage(props) {
   const [showPopup, togglePopup] = useState(false);
   const [viewport, setViewport] = useState({
      width: '100vw',
      height: '80vh',
      latitude: 16.080361568951535,
      longitude: 108.21269906483103,
      zoom: 12,
   });

   return (
      <>
         <div className='mapbox'>
            <ReactMapGL
               {...viewport}
               mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
               mapStyle='mapbox://styles/thanhnguyen662/ckrga4f8z4jah17o97c5z7rrx'
               onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
               <Marker
                  latitude={16.080361568951535}
                  longitude={108.21269906483103}
               >
                  <ImLocation2
                     style={{ fontSize: viewport.zoom * 2 }}
                     className='locationIcon'
                  />
               </Marker>
               <Popup
                  latitude={16.080361568951535}
                  longitude={108.21269906483103}
                  closeButton={true}
                  closeOnClick={false}
                  offsetLeft={32}
                  offsetTop={20}
                  onClose={() => togglePopup(false)}
                  anchor='left'
               >
                  <div className='popupContent'>
                     <Row>
                        <Col span={4}>
                           <h5>29382094</h5>
                        </Col>
                        <Col span={4} offset={12}>
                           <h5>29382094</h5>
                        </Col>
                     </Row>
                  </div>
               </Popup>
            </ReactMapGL>
         </div>
      </>
   );
}

export default MapsPage;
