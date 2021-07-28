import PropTypes from 'prop-types';
import React from 'react';
import { Marker } from 'react-map-gl';
import { Avatar } from 'antd';

MapMarker.propTypes = {
   cluster: PropTypes.object,
   handleOnClickMarker: PropTypes.func,
   viewport: PropTypes.object,
};

MapMarker.defaultProps = {
   cluster: {},
   handleOnClickMarker: null,
   viewport: {},
};

function MapMarker(props) {
   const { cluster, handleOnClickMarker, viewport } = props;

   return (
      <>
         <Marker
            longitude={cluster?.geometry.coordinates[0]}
            latitude={cluster?.geometry.coordinates[1]}
         >
            <Avatar
               gap={1}
               src={cluster.properties.pin.product.User.photoURL}
               style={{
                  width: viewport.zoom * 2.5,
                  height: viewport.zoom * 2.5,
               }}
               className='locationIcon'
               onClick={() => {
                  handleOnClickMarker(cluster.properties.pinId);
               }}
            />
         </Marker>
      </>
   );
}

export default MapMarker;
