import PropTypes from 'prop-types';
import React from 'react';
import { RiMapPin3Fill } from 'react-icons/ri';
import { Marker } from 'react-map-gl';

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
            <RiMapPin3Fill
               style={{ fontSize: viewport.zoom * 2 }}
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
