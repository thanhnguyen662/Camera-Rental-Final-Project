import React from 'react';
import CarouselBar from '../../../../components/CarouselBar';
import '../../../../components/HeaderBar/HeaderBar.scss';
import Category from '../../../Category';
import Product from '../../../Product';
import Promotion from '../../../Promotion';

HomePage.propTypes = {};
function HomePage(props) {
   return (
      <>
         <CarouselBar />
         <Category />
         <Product />
         <Promotion />
      </>
   );
}

export default HomePage;
