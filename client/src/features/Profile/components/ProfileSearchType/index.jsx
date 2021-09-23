import { Col, Empty, Pagination, Row, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import productApi from '../../../../api/productApi';
import ProfileProductUser from '../ProfileProductUser';
import { BsArrowLeft } from 'react-icons/bs';
import './ProfileSearchType.scss';

ProfileSearchType.propTypes = {
   userId: PropTypes.string,
};

ProfileSearchType.defaultProps = {
   userId: '',
};

function ProfileSearchType(props) {
   const { userId } = props;
   const { searchType } = useParams();
   const history = useHistory();

   const [page, setPage] = useState(1);
   const [searchByType, setSearchByType] = useState([]);
   const [countProduct, setCountProductInShop] = useState(null);
   const [countCategory, setByCountCategory] = useState(null);

   useEffect(() => {
      setPage(1);
   }, [searchType]);

   useEffect(() => {
      if (!userId) return;
      const countProductInShop = async () => {
         const response = await productApi.countMyProduct({
            userId: userId,
         });
         setCountProductInShop(response._count);
      };
      countProductInShop();
   }, [userId, searchType]);

   useEffect(() => {
      if (countProduct === null || !userId) return;
      const getProductByType = async () => {
         if (searchType === 'new') {
            const response = await productApi.otherProductInShop({
               userId: userId,
               page: page,
               take: 10,
            });
            setSearchByType(response);
         }
         if (searchType === 'top') {
            const response = await productApi.topRentingInShop({
               userId: userId,
               page: page,
               take: 10,
            });
            setSearchByType(response);
         }
         if (searchType === 'all') {
            const response = await productApi.allProductInShop({
               userId: userId,
               page: page,
               take: 10,
            });
            setSearchByType(response);
         }
         if (
            searchType === 'dslr' ||
            searchType === 'lens' ||
            searchType === 'accessories'
         ) {
            const response = await productApi.getProductInShopByCategory({
               userId: userId,
               page: page,
               take: 10,
               categoryName: searchType,
            });
            setSearchByType(response.result);
            setByCountCategory(response.count);
         }
      };
      getProductByType();
   }, [searchType, page, userId, countProduct]);

   return (
      <>
         <div className='profileSearchType'>
            {searchType === 'all' ||
            searchType === 'new' ||
            searchType === 'top' ? (
               <div className='titleOfTab'>
                  <Space>
                     <BsArrowLeft
                        className='icon'
                        onClick={() => history.goBack()}
                     />
                     <Typography.Text className='title'>
                        {searchType}
                     </Typography.Text>
                  </Space>
               </div>
            ) : null}
            <div>
               <Row gutter={[17, 17]}>
                  {searchByType?.map((product) => (
                     <div key={product.id}>
                        <Col flex='none'>
                           <ProfileProductUser product={product} />
                        </Col>
                     </div>
                  ))}
               </Row>
            </div>
            <div className='pagination'>
               {countProduct !== null &&
                  (searchByType.length > 0 ? (
                     <Pagination
                        total={
                           searchType === 'dslr' ||
                           searchType === 'lens' ||
                           searchType === 'accessories'
                              ? countCategory
                              : countProduct
                        }
                        pageSize={10}
                        current={page}
                        onChange={setPage}
                     />
                  ) : (
                     <Empty />
                  ))}
            </div>
         </div>
      </>
   );
}

export default ProfileSearchType;
