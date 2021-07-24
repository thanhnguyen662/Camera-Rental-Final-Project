import React, { useEffect, useRef, useState } from 'react';
import { RiMapPin3Fill } from 'react-icons/ri';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import pinApi from '../../../../api/pinApi';
import PopupContent from '../../components/PopupContent';
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
      zoom: 15.5,
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
   };

   const handleOnRemoveMarker = (id) => {
      const index = selectedMarker.indexOf(id);
      selectedMarker.splice(index, 1);
      setViewport({
         width: '100vw',
         height: '80vh',
         latitude: viewport.latitude,
         longitude: viewport.longitude,
         zoom: viewport.zoom,
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

   const { clusters } = useSupercluster({
      points,
      bounds,
      zoom: viewport.zoom,
      options: { radius: 75, maxZoom: 20 },
   });

   return (
      <>
         <div className='mapbox'>
            <ReactMapGL
               {...viewport}
               maxZoom={20}
               mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
               onViewportChange={(newViewport) => {
                  setViewport({ ...newViewport });
               }}
               ref={mapRef}
            >
               {clusters.map((cluster) => {
                  const [longitude, latitude] = cluster.geometry.coordinates;
                  const isCluster = cluster.properties.cluster;
                  const pointCount = cluster.properties.point_count;

                  if (isCluster) {
                     return (
                        <Marker
                           key={`cluster-${cluster.id}`}
                           latitude={latitude}
                           longitude={longitude}
                        >
                           <div
                              className='cluster-marker'
                              style={{
                                 width: `${
                                    10 + (pointCount / points.length) * 20
                                 }px`,
                                 height: `${
                                    10 + (pointCount / points.length) * 20
                                 }px`,
                              }}
                           >
                              {pointCount}
                           </div>
                        </Marker>
                     );
                  }

                  return (
                     <>
                        <div key={`crime-${cluster.properties?.pinId}`}>
                           <Marker latitude={latitude} longitude={longitude}>
                              <RiMapPin3Fill
                                 style={{ fontSize: viewport.zoom * 2 }}
                                 className='locationIcon'
                                 onClick={() =>
                                    handleOnClickMarker(
                                       cluster.properties.pinId
                                    )
                                 }
                              />
                           </Marker>
                           {selectedMarker?.find(
                              (m) => m === cluster.properties.pinId
                           ) && (
                              <Popup
                                 latitude={latitude}
                                 longitude={longitude}
                                 closeButton={true}
                                 closeOnClick={false}
                                 offsetLeft={35}
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
                     </>
                  );
               })}
            </ReactMapGL>
         </div>
      </>
   );
}

export default MapsPage;

// <ReactMapGL
//          {...viewport}
//          mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
//          mapStyle='mapbox://styles/thanhnguyen662/ckrga4f8z4jah17o97c5z7rrx'
//          onViewportChange={setViewport}
//          ref={mapRef}
//       >
//          {pins.map((pin) => (
//             <div key={pin.id}>
//                <Marker
//                   latitude={parseFloat(pin.lat)}
//                   longitude={parseFloat(pin.long)}
//                >
//                   <RiMapPin3Fill
//                      style={{ fontSize: viewport.zoom * 2 }}
//                      className='locationIcon'
//                      onClick={() => handleOnClickMarker(pin.id)}
//                   />
//                </Marker>
//                {selectedMarker?.find((m) => m === pin.id) && (
//                   <Popup
//                      latitude={parseFloat(pin.lat)}
//                      longitude={parseFloat(pin.long)}
//                      closeButton={true}
//                      closeOnClick={false}
//                      offsetLeft={35}
//                      offsetTop={15}
//                      anchor='left'
//                      onClose={() => handleOnRemoveMarker(pin.id)}
//                   >
//                      <PopupContent pin={pin} />
//                   </Popup>
//                )}
//             </div>
//          ))}
//       </ReactMapGL>
