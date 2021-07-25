import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import pinApi from '../../../../api/pinApi';
import PopupContent from '../../components/PopupContent';
import MapMarker from '../../components/PopupContent/MapMarker';
import './MapsPage.scss';

MapsPage.propTypes = {};

function MapsPage(props) {
   const mapRef = useRef();

   const [pins, setPins] = useState([]);
   const [selectedMarker, setSelectedMarker] = useState([]);
   const [viewport, setViewport] = useState({
      width: '100vw',
      height: '80vh',
      latitude: 16.080361568951535,
      longitude: 108.21269906483103,
      zoom: 6,
   });

   useEffect(() => {
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
   }, []);

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
      options: { radius: 50, maxZoom: 20 },
   });

   return (
      <>
         <div className='mapbox'>
            <div className='buttonGroup'>
               <Space>
                  <Button
                     type='primary'
                     icon={<EyeOutlined />}
                     onClick={handleOnClickShowAllPopup}
                  />
                  <Button
                     type='primary'
                     danger
                     className='showAllPopupButton'
                     icon={<DeleteOutlined />}
                     onClick={() => setSelectedMarker([])}
                  />
               </Space>
            </div>
            <ReactMapGL
               {...viewport}
               maxZoom={20}
               mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
               mapStyle='mapbox://styles/thanhnguyen662/ckrga4f8z4jah17o97c5z7rrx'
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
                                 10 +
                                 (cluster.properties.point_count /
                                    points.length) *
                                    20
                              }px`,
                              height: `${
                                 10 +
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
                              offsetLeft={35}
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
         </div>
      </>
   );
}

export default MapsPage;
