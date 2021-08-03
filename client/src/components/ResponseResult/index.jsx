import React from 'react';
import { Result } from 'antd';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

ResponseResult.propTypes = {};

ResponseResult.defaultProps = {};

function ResponseResult(props) {
   const location = useLocation();

   console.log(location);

   return (
      <>
         <Result
            status={location?.state.responseResult.message}
            title='Create Order Successful'
            subTitle={`Order number: ${location?.state.responseResult.id}, it will take 1 minutes, please wait...`}
         />
      </>
   );
}

export default ResponseResult;
