import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';
import './ManageShopOverview.scss';

ManageShopOverview.propTypes = {
   allMyProductInOrder: PropTypes.array,
};

ManageShopOverview.defaultProps = {
   allMyProductInOrder: [],
};

const { Grid } = Card;
const { Title } = Typography;

function ManageShopOverview(props) {
   const { allMyProductInOrder } = props;

   // eslint-disable-next-line
   const [girds, setGirds] = useState([
      'PENDING',
      'ACCEPT',
      'DELIVERY',
      'SUCCESS',
      'FAILURE',
   ]);

   return (
      <>
         <div className='overviewTableGird'>
            <Card>
               {girds.map((item) => (
                  <Grid className='tableGrid' key={item}>
                     <Title level={5}>{item}</Title>
                  </Grid>
               ))}
            </Card>
         </div>
      </>
   );
}

export default ManageShopOverview;
