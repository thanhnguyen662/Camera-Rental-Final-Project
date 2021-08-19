import { Button, Space } from 'antd';
import React from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../HeaderBar/HeaderBar.scss';

function Cart(props) {
   const { count } = props;
   return (
      <>
         <Button className='cartButton'>
            <Link to='/product/cart'>
               <Space size={8}>
                  <BiShoppingBag className='cartButtonIcon' />
                  <div className='cartText'>{count}</div>
               </Space>
            </Link>
         </Button>
      </>
   );
}

export default Cart;
