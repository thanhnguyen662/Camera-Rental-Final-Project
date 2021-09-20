import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import productApi from '../../../../api/productApi';
import PropTypes from 'prop-types';
import './ProfileSearchResult.scss';
import { Col, Empty, Row } from 'antd';
import ProfileProductUser from '../ProfileProductUser';

ProfileSearchResult.propTypes = {
   userId: PropTypes.string,
};

ProfileSearchResult.defaultProps = {
   userId: '',
};

function ProfileSearchResult(props) {
   const { userId } = props;
   const { keyword } = useParams();

   const [searchResult, setSearchResult] = useState([]);

   useEffect(() => {
      if (!keyword || !userId || keyword === null) return;
      const searchInShop = async () => {
         try {
            const response = await productApi.searchMyProduct({
               keyword: keyword,
               userId: userId,
            });
            setSearchResult(response);
         } catch (error) {
            console.log(error);
         }
      };
      searchInShop();
   }, [keyword, userId]);

   return (
      <>
         {searchResult.length > 0 ? (
            <h1 style={{ margin: '30px 0 10px', fontSize: 21 }}>
               Search result of {keyword}
            </h1>
         ) : (
            <Empty />
         )}
         <div>
            <div className='profileContent'>
               <Row gutter={[17, 17]}>
                  {searchResult?.map((product) => (
                     <div key={product.id}>
                        <Col flex='none'>
                           <ProfileProductUser product={product} />
                        </Col>
                     </div>
                  ))}
               </Row>
            </div>
         </div>
      </>
   );
}

export default ProfileSearchResult;
