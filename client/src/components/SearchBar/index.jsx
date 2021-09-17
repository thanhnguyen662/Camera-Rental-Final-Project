import {
   SearchOutlined,
   UserOutlined,
   CameraOutlined,
} from '@ant-design/icons';
import { Col, Row, Select, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchApi from '../../api/searchApi';
import '../HeaderBar/HeaderBar.scss';

const { Option } = Select;

function SearchBar(props) {
   const timeout = useRef(null);

   const [searchResult, setSearchResult] = useState([]);
   const [searchType, setSearchType] = useState('gear');
   const history = useHistory();

   const handleOnSearchChange = (value) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         const formValues = {
            searchKeyword: value,
         };
         onSearchForm(formValues);
      }, 400);
   };

   const onSearchForm = async (formValues) => {
      if (formValues.searchKeyword === '') return;
      try {
         if (searchType === 'gear') {
            console.log(searchType);
            const response = await searchApi.gearSuggestion(formValues);
            setSearchResult([
               {
                  id: 'user input',
                  name: formValues.searchKeyword,
                  tag: 'all',
               },
               ...response,
            ]);
            console.log('Gear: ', response);
         }

         if (searchType === 'user') {
            const response = await searchApi.userSuggestion(formValues);
            const newResponse = response.reduce((array, item) => {
               array.push({
                  id: item.firebaseId,
                  name: item.username,
               });
               return array;
            }, []);
            setSearchResult(newResponse);
            console.log('User: ', response);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className='searchContainer'>
            <Select
               showArrow={false}
               defaultValue={searchType}
               style={{ marginRight: 10 }}
               onSelect={(value) => setSearchType(value)}
            >
               <Option value='gear'>
                  <CameraOutlined />
               </Option>
               <Option value='user'>
                  <UserOutlined />
               </Option>
            </Select>
            <Select
               onSearch={(value) => handleOnSearchChange(value)}
               showSearch={true}
               className='headerSearchBar'
               placeholder='Search'
               suffixIcon={<SearchOutlined className='headerSearchIcon' />}
               onSelect={(value, option) => {
                  if (searchType === 'gear')
                     return history.push(`/search/${searchType}/${value}`);
                  if (searchType === 'user')
                     return history.push(`/profile/${option.key}`);
               }}
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
