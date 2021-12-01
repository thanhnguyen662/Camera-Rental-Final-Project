import { Layout, Modal, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import { useLocation } from 'react-router-dom';
import useSupercluster from 'use-supercluster';
import pinApi from '../../../../api/pinApi';
import AddressOption from '../../../../components/AddressOption';
import openNotificationWithIcon from '../../../../components/Notification';
import MapButton from '../../components/MapButton';
import MapMarker from '../../components/MapMarker';
import MapMenu from '../../components/MapMenu';
import PopupContent from '../../components/PopupContent';
import './MapsPage.scss';

const { Content } = Layout;

function MapsPage(props) {
   const mapRef = useRef();
   const location = useLocation();

   const [searchStatusNotification, setSearchStatusNotification] = useState({});
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
            // console.log('Pins: ', response);
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
      const [district, district1, district2] = dataCollect;

      if (!location || dataCollect.length === 0) return;
      const getPinByOrder = async () => {
         if (!location.state) return;
         // console.log({
         //    district,
         //    district1,
         //    district2,
         //    productName: location.state.productDetail.name,
         // });
         let response = [];
         try {
            if (location.state.type === 'searchNearMe') {
               response = await pinApi.getPin({
                  district,
                  district1,
                  district2,
                  productName: location.state.productDetail.name,
               });

               district &&
                  openNotificationWithIcon(
                     'success',
                     'Location detected',
                     `We will show all product near you`
                  );
            }
            if (location.state.type === 'searchOne') {
               response = await pinApi.getPinInProduct({
                  productId: location.state.productDetail.id,
               });
            }
            // console.log('Get Pin from location', response);
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
               // console.log('raw data location from mapbox Api: ', data);

               //only get Unique Data
               const uniqueSet = new Set(data);
               const backToArray = [...uniqueSet];

               openNotificationWithIcon(
                  'success',
                  'We find you near',
                  `${backToArray.toString().replace(/,/g, ', ')}`
               );

               setDataCollect(backToArray);
               // console.log('get all district near me: ', messageLocate);
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
         zoom: 8,
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
         city: formValues.city?.split('/')[1] || '',
         ward: formValues.ward?.split('/')[1] || '',
         district: formValues.district?.split('/')[1] || '',
         productName: formValues.productName,
      };
      setSearchStatusNotification(formData);
      try {
         const response = await pinApi.getSearch(formData);
         // console.log('search result: ', response);
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

   const handleOnClickMenuItem = (pin) => {
      setViewport({
         ...viewport,
         latitude: parseFloat(pin.lat),
         longitude: parseFloat(pin.long),
         zoom: 16,
         transitionInterpolator: new FlyToInterpolator({
            speed: 2,
         }),
         transitionDuration: 'auto',
      });
      setSelectedMarker((prev) => {
         prev.length = 0;
         prev.push(pin.id);

         return prev;
      });
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
            <Content style={{ margin: '0px 0px' }}>
               <div style={{ width: 285 }} className='sidebarMap'>
                  <div className='buttonSearchGroup'>
                     <MapButton
                        searchStatusNotification={searchStatusNotification}
                        location={location}
                        setIsModalVisible={setIsModalVisible}
                        handleOnClickShowAllPopup={handleOnClickShowAllPopup}
                        setSelectedMarker={setSelectedMarker}
                     />
                  </div>
                  <div className='menuList'>
                     <MapMenu
                        pins={pins}
                        handleOnClickMenuItem={handleOnClickMenuItem}
                        selectedMarker={selectedMarker}
                     />
                  </div>
               </div>
               <ReactMapGL
                  {...viewport}
                  maxZoom={20}
                  mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
                  mapStyle='mapbox://styles/thanhnguyen662/ckroakcxxcyqb17o5pje90mzu'
                  onViewportChange={setViewport}
                  ref={mapRef}
                  className='reactMapGL'
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
                                    handleOnRemoveMarker(
                                       cluster.properties.pinId
                                    )
                                 }
                              >
                                 <PopupContent pin={cluster.properties.pin} />
                              </Popup>
                           )}
                        </div>
                     )
                  )}
               </ReactMapGL>
            </Content>
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
