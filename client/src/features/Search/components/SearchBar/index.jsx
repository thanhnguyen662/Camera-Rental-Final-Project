import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);

function SearchBar(props) {
   return (
      <Search
         style={{ marginTop: '14px', width: 700 }}
         placeholder='Input your search'
         allowClear
         enterButton='Search'
         size='large'
         onSearch={onSearch}
      />
   );
}

export default SearchBar;
