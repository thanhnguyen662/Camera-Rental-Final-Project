import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Space, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import { useLocation } from 'react-router-dom';
import useSupercluster from 'use-supercluster';
import pinApi from '../../../../api/pinApi';
import AddressOption from '../../../../components/AddressOption';
import openNotificationWithIcon from '../../../../components/Notification';
import MapMarker from '../../components/MapMarker';
import PopupContent from '../../components/PopupContent';
import './MapsPage.scss';

MapsPage.propTypes = {};

function MapsPage(props) {
   const mapRef = useRef();
   const location = useLocation();

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [dataCollect, setDataCollect] = useState([]);
   const [pins, setPins] = useState([]);
   const [selectedMarker, setSelectedMarker] = useState([]);
   const [initLocation, setInitLocation] = useState(null);
   const [viewport, setViewport] = useState({
      width: '100vw',
      height: '100vh',
      latitude: 16.080361568951535,
      longitude: 108.21269906483103,
      zoom: 8,
   });

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => {
      if (location.state?.productDetail) return;
      const getPins = async () => {
         try {
            const response = await pinApi.getAllPins();
            console.log('Pins: ', response);
            setPins(response);
         } catch (error) {
            return console.log(error);
         }
      };
      getPins();
   }, [location]);

   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         setInitLocation([position.coords.latitude, position.coords.longitude]);
      });
   }, []);

   useEffect(() => {
      if (!location) return;

      const [district, district1, district2] = dataCollect;
      const getPinByOrder = async () => {
         if (!location.state) return;

         try {
            const response = await pinApi.getPin({
               district,
               district1,
               district2,
               productName: location.state.productDetail.name,
            });
            console.log('Get Pin from location', response);
            district &&
               openNotificationWithIcon(
                  'success',
                  'Location detected',
                  `We will show all product near you`
               );
            setPins(response);
         } catch (error) {
            return console.log(error);
         }
      };
      getPinByOrder();
   }, [location, dataCollect]);

   useEffect(() => {
      if (!initLocation) return;
      const apiTokenMapbox = process.env.REACT_APP_MAP_BOX_API_KEY;
      const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

      const latitude = initLocation[0];
      const longitude = initLocation[1];

      const latitudeUp = latitude + 0.015;
      const longitudeUp = longitude;

      const latitudeDown = latitude - 0.015;
      const longitudeDown = longitude;

      const latitudeLeft = latitude;
      const longitudeLeft = longitude + 0.015;

      const latitudeRight = latitude;
      const longitudeRight = longitude - 0.015;

      const urlBatch = [
         `${mapboxUrl}/${longitude},${latitude}.json?types=place&access_token=${apiTokenMapbox}&limit=1`, //center
         `${mapboxUrl}/${longitudeUp},${latitudeUp}.json?types=place&access_token=${apiTokenMapbox}&limit=1`, //up
         `${mapboxUrl}/${longitudeDown},${latitudeDown}.json?types=place&access_token=${apiTokenMapbox}&limit=1`, //down
         `${mapboxUrl}/${longitudeLeft},${latitudeLeft}.json?types=place&access_token=${apiTokenMapbox}&limit=1`, //left
         `${mapboxUrl}/${longitudeRight},${latitudeRight}.json?types=place&access_token=${apiTokenMapbox}&limit=1`, //right
      ];

      const getAddress = async () => {
         let data = [];

         urlBatch.map(async (url) => {
            const mapboxResponse = await axios.get(url);
            const rawData = mapboxResponse.data.features[0]?.text;
            data.push(rawData);
            if (data?.length === 5) {
               console.log('raw data location from mapbox Api: ', data);

               //only get Unique Data
               const uniqueSet = new Set(data);
               const backToArray = [...uniqueSet];

               setDataCollect(backToArray);
               console.log('get all district near me: ', backToArray);
            }
         });
      };
      getAddress();
   }, [initLocation]);

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

   const handleOnClickMarker = (id) => {
      if (!selectedMarker.some((m) => m === id)) {
         setSelectedMarker([...selectedMarker, id]);
      }
      handleOnRemoveMarker(id);
   };

   const handleOnRemoveMarker = (id) => {
      const index = selectedMarker.indexOf(id);
      selectedMarker.splice(index, 1);
      setViewport({ ...viewport });
   };

   const handleOnClickCluster = (id, longitude, latitude) => {
      const expansionZoom = Math.min(
         supercluster.getClusterExpansionZoom(id),
         20
      );
      setViewport({
         ...viewport,
         latitude: latitude,
         longitude: longitude,
         zoom: expansionZoom,
         transitionInterpolator: new FlyToInterpolator({
            speed: 2,
         }),
         transitionDuration: 'auto',
      });
   };

   const handleOnClickShowAllPopup = () => {
      // eslint-disable-next-line
      pins.map((pin) => {
         if (!selectedMarker.some((m) => m === pin.id)) {
            selectedMarker.push(pin.id);
            setViewport({ ...viewport });
         }
      });
   };

   const handleOnSearch = async (formValues) => {
      const formData = {
         address: formValues.address,
         city: formValues.city?.split('/')[1] || undefined,
         ward: formValues.ward?.split('/')[1] || undefined,
         district: formValues.district?.split('/')[1] || undefined,
         productName: formValues.productName,
      };

      try {
         const response = await pinApi.getSearch(formData);
         console.log('search result: ', response);
         setPins(response);
         setIsModalVisible(false);
         setViewport({
            ...viewport,
            latitude: initLocation[0],
            longitude: initLocation[1],
            zoom: 10,
            transitionInterpolator: new FlyToInterpolator({
               speed: 2,
            }),
            transitionDuration: 'auto',
         });
      } catch (error) {
         console.log(error);
      }
   };

   const points = pins.map((pin) => ({
      type: 'Feature',
      properties: { cluster: false, pinId: pin.id, pin: pin },
      geometry: {
         type: 'Point',
         coordinates: [parseFloat(pin.long), parseFloat(pin.lat)],
      },
   }));

   const bounds = mapRef.current
      ? mapRef.current.getMap().getBounds().toArray().flat()
      : null;

   const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom: viewport.zoom,
      options: { radius: 100, maxZoom: 22 },
   });

   return (
      <>
         <div className='mapbox'>
            <div className='buttonSearchGroup'>
               <Row span={24} align='middle'>
                  <Col span={1} offset={1}>
                     <Tooltip title='search'>
                        <Button
                           className='searchButton'
                           type='primary'
                           shape='circle'
                           icon={<SearchOutlined />}
                           onClick={() => setIsModalVisible(true)}
                        />
                     </Tooltip>
                  </Col>
                  <Col flex='auto' className='searchStatusRow'>
                     <div className='searchStatusNotification'>
                        We will show{' '}
                        {location.state?.productDetail.name || `all product`} on
                        map
                     </div>
                  </Col>
                  <Col span={4} offset={11}>
                     <Space>
                        <Button
                           size='large'
                           type='primary'
                           icon={<EyeOutlined />}
                           onClick={handleOnClickShowAllPopup}
                        />
                        <Button
                           size='large'
                           type='primary'
                           danger
                           className='showAllPopupButton'
                           icon={<DeleteOutlined />}
                           onClick={() => setSelectedMarker([])}
                        />
                     </Space>
                  </Col>
               </Row>
            </div>
            <ReactMapGL
               {...viewport}
               maxZoom={20}
               mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
               mapStyle='mapbox://styles/thanhnguyen662/ckroakcxxcyqb17o5pje90mzu'
               onViewportChange={setViewport}
               ref={mapRef}
            >
               {clusters.map((cluster) =>
                  cluster.properties.cluster ? (
                     <Marker
                        key={`cluster-${cluster.id}`}
                        className='clusterMarker'
                        longitude={cluster?.geometry.coordinates[0]}
                        latitude={cluster?.geometry.coordinates[1]}
                        onClick={() =>
                           handleOnClickCluster(
                              cluster.id,
                              cluster?.geometry.coordinates[0],
                              cluster?.geometry.coordinates[1]
                           )
                        }
                     >
                        <div
                           className='cluster-marker'
                           style={{
                              width: `${
                                 15 +
                                 (cluster.properties.point_count /
                                    points.length) *
                                    20
                              }px`,
                              height: `${
                                 15 +
                                 (cluster.properties.point_count /
                                    points.length) *
                                    20
                              }px`,
                           }}
                        >
                           {cluster.properties.point_count}
                        </div>
                     </Marker>
                  ) : (
                     <div key={cluster.properties?.pinId}>
                        <MapMarker
                           cluster={cluster}
                           handleOnClickMarker={handleOnClickMarker}
                           viewport={viewport}
                        />
                        {selectedMarker?.find(
                           (m) => m === cluster.properties.pinId
                        ) && (
                           <Popup
                              longitude={cluster?.geometry.coordinates[0]}
                              latitude={cluster?.geometry.coordinates[1]}
                              closeButton={true}
                              closeOnClick={false}
                              offsetLeft={45}
                              offsetTop={15}
                              anchor='left'
                              onClose={() =>
                                 handleOnRemoveMarker(cluster.properties.pinId)
                              }
                           >
                              <PopupContent pin={cluster.properties.pin} />
                           </Popup>
                        )}
                     </div>
                  )
               )}
            </ReactMapGL>

            <div>
               <Modal
                  title='Please input your search 🏘'
                  visible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  footer={null}
               >
                  <Row className='inputModal'>
                     <AddressOption
                        className='optionStyle'
                        onFinish={handleOnSearch}
                     />
                     <em>
                        We need the address where you rent the product. This is
                        necessary to find product near you. If you want to find
                        product in large area, just leave it empty.
                     </em>
                  </Row>
               </Modal>
            </div>
         </div>
      </>
   );
}

export default MapsPage;
