import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { RiMapPin3Fill } from 'react-icons/ri';
import './ProfileAddressMap.scss';

ProfileAddressMap.propTypes = {};

function ProfileAddressMap(props) {
   const userAddress = useSelector((state) => state.users.address);
   const [coordinate, setCoordinate] = useState([]);
   const [viewport, setViewport] = useState({
      width: '100%',
      height: '100%',
      latitude: 16.080361568951535,
      longitude: 108.21269906483103,
      zoom: 9,
   });

   useEffect(() => {
      if (!userAddress) return;
      const mapBoxApi = process.env.REACT_APP_MAP_BOX_API_KEY;
      const encodeURI = encodeURIComponent(userAddress);
      const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI}.json?types=locality&access_token=${mapBoxApi}`;
      const getCoordinateByAddress = async () => {
         try {
            const response = await axios.get(mapBoxUrl);
            setCoordinate(response.data.features[0].center);
         } catch (error) {
            console.log(error);
         }
      };
      getCoordinateByAddress();
   }, [userAddress]);

   useEffect(() => {
      if (coordinate.length === 0) return;
      setViewport({
         ...viewport,
         latitude: coordinate[1],
         longitude: coordinate[0],
         zoom: 13,
         transitionInterpolator: new FlyToInterpolator({
            speed: 2,
         }),
         transitionDuration: 'auto',
      });
      // eslint-disable-next-line
   }, [coordinate]);

   return (
      <>
         <div className='userMap'>
            <ReactMapGL
               {...viewport}
               mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
               mapStyle='mapbox://styles/thanhnguyen662/ckrga4f8z4jah17o97c5z7rrx'
               onViewportChange={setViewport}
               doubleClickZoom={false}
            >
               {coordinate?.length > 0 && (
                  <Marker
                     offsetTop={-30}
                     longitude={coordinate[0]}
                     latitude={coordinate[1]}
                     className='icon'
                  >
                     <RiMapPin3Fill
                        style={{
                           fontSize: viewport.zoom * 2,
                           color: '#FF4D4F',
                        }}
                     />
                  </Marker>
               )}
            </ReactMapGL>
         </div>
      </>
   );
}

export default ProfileAddressMap;
