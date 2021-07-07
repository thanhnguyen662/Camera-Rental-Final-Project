import React from 'react';
import ContentLayout from '../../../../layouts/Content';
import ProductCartTable from '../../components/ProductCartTable';

function ProductCardPage(props) {
   return (
      <>
         <div style={{ margin: '25px 144px' }}>
            <ContentLayout>
               <ProductCartTable />
            </ContentLayout>
         </div>
      </>
   );
}

export default ProductCardPage;
