import { SearchOutlined } from '@ant-design/icons';
import { Col, Row, Select, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import searchApi from '../../api/searchApi';
import '../HeaderBar/HeaderBar.scss';

const { Option } = Select;

function SearchBar(props) {
   const timeout = useRef(null);

   const [searchResult, setSearchResult] = useState([]);
   const [redirect, setRedirect] = useState('');

   const handleOnSearchChange = (value) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         const formValues = {
            productName: value,
         };
         onSearchForm(formValues);
      }, 400);
   };

   const onSearchForm = async (formValues) => {
      if (formValues.productName === '') return;
      try {
         const response = await searchApi.suggestion(formValues);
         setSearchResult([
            {
               id: 'user input',
               name: formValues.productName,
               tag: 'all',
            },
            ...response,
         ]);
         console.log('Search: ', response);
      } catch (error) {
         console.log(error);
      }
   };

   const redirectToSearchPage = (value) => {
      setRedirect(value);
   };

   return (
      <>
         {redirect && <Redirect to={`/search/${redirect}`} />}
         <div className='searchContainer'>
            <Select
               onSearch={(value) => handleOnSearchChange(value)}
               showSearch={true}
               className='headerSearchBar'
               placeholder='Search'
               suffixIcon={<SearchOutlined className='headerSearchIcon' />}
               onSelect={(value) => redirectToSearchPage(value)}
            >
               {searchResult?.map((result) => (
                  <Option
                     key={result.id}
                     value={result.name}
                     title={result.name}
                  >
                     {result.tag ? (
                        <Row>
                           <Col flex='auto'>{result.name}</Col>
                           <Col>
                              <Tag color='blue'>All</Tag>
                           </Col>
                        </Row>
                     ) : (
                        result.name
                     )}
                  </Option>
               ))}
            </Select>
         </div>
      </>
   );
}

export default SearchBar;
