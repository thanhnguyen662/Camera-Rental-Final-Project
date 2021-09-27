import {
   CloseCircleOutlined,
   MenuOutlined,
   StopOutlined,
} from '@ant-design/icons';
import {
   Button,
   Checkbox,
   Col,
   InputNumber,
   Radio,
   Row,
   Select,
   Space,
   Typography,
} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './CategorySidebar.scss';

CategorySidebar.propTypes = {
   handleSelectedBrand: PropTypes.func,
   handleSelectedRate: PropTypes.func,
   handleSubmitMinMax: PropTypes.func,
   handleSelectedProvince: PropTypes.func,
};

CategorySidebar.defaultProps = {
   handleSelectedBrand: null,
   handleSelectedRate: null,
   handleSubmitMinMax: null,
   handleSelectedProvince: null,
};

const { Text } = Typography;
const { Option } = Select;

function CategorySidebar(props) {
   const {
      handleSelectedBrand,
      handleSelectedRate,
      handleSubmitMinMax,
      handleSelectedProvince,
   } = props;

   const [provinces, setProvinces] = useState([]);
   const [isShowAlert, setIsShowAlert] = useState(false);
   const [minMax, setMinMax] = useState({
      min: null,
      max: null,
   });

   const brandOptions = ['Canon', 'Nikon', 'Sony', 'Fujifilm'];
   const rateOptions = ['All', '5', '4', '3', '2', '1'];

   useEffect(() => {
      const getProvinces = async () => {
         try {
            const response = await axios.get(
               'https://sheltered-anchorage-60344.herokuapp.com/province'
            );
            setProvinces(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getProvinces();
   }, []);

   const onChangeBrand = (selected) => {
      handleSelectedBrand(selected.toString().replaceAll(',', ' | '));
   };

   const onChangeRate = (selected) => {
      handleSelectedRate(selected.target.value);
   };

   const onChangeMinMax = (name, value) => {
      isShowAlert && setIsShowAlert(false);
      setMinMax({ ...minMax, [name]: value });
   };

   const onSubmitMinMax = () => {
      if (typeof minMax.min === 'number' && typeof minMax.max === 'number') {
         if (minMax.min > minMax.max) return setIsShowAlert(true);
      }
      handleSubmitMinMax(minMax);
   };

   const cleanMinMaxInput = () => {
      isShowAlert && setIsShowAlert(false);
      setMinMax({
         min: null,
         max: null,
      });
      handleSubmitMinMax({
         min: null,
         max: null,
      });
   };

   const onSelectProvince = (province) => {
      handleSelectedProvince(province);
   };

   return (
      <>
         <div className='CategorySidebar'>
            <div>
               <Space align='center'>
                  <MenuOutlined className='icon' />
                  <Text strong className='title'>
                     Categories
                  </Text>
               </Space>
            </div>
            <div className='checkBox'>
               <Text className='subTitle'>BRAND</Text>
               <Checkbox.Group
                  options={brandOptions}
                  className='checkBoxGroup'
                  onChange={(selected) => onChangeBrand(selected)}
               />
            </div>
            <div className='radioBox'>
               <Text className='subTitle'>RATE</Text>
               <Radio.Group
                  defaultValue={'All'}
                  options={rateOptions}
                  className='radioBoxGroup'
                  onChange={(selected) => onChangeRate(selected)}
               />
            </div>
            <div className='inputBox'>
               <Row>
                  <Col flex='auto'>
                     <Text className='subTitle'>PRICE</Text>
                  </Col>
                  <Col>
                     <CloseCircleOutlined
                        className='clearInputIcon'
                        onClick={cleanMinMaxInput}
                     />
                  </Col>
               </Row>
               <div>
                  <Space space={10}>
                     <InputNumber
                        value={minMax.min}
                        onChange={(value) => onChangeMinMax('min', value)}
                        placeholder='from'
                        min={0}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                     />
                     <InputNumber
                        value={minMax.max}
                        onChange={(value) => onChangeMinMax('max', value)}
                        placeholder='to'
                        formatter={(value) =>
                           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                     />
                  </Space>
                  {isShowAlert && (
                     <div className='minMaxAlert'>
                        <Space size={5}>
                           <StopOutlined />
                           <div>Undefined range</div>
                        </Space>
                     </div>
                  )}

                  <Button block type='primary' onClick={onSubmitMinMax}>
                     Submit
                  </Button>
               </div>
            </div>
            <div className='inputBox'>
               <Text className='subTitle'>PLACE</Text>
               <Select
                  defaultValue='global'
                  showSearch={true}
                  onSelect={(province) => onSelectProvince(province)}
               >
                  <Option value='global'>Global</Option>
                  {provinces?.map((province) => (
                     <Option value={province.name} key={province.idProvince}>
                        <div style={{ width: 40 }}>{province.name}</div>
                     </Option>
                  ))}
               </Select>
            </div>
         </div>
      </>
   );
}

export default CategorySidebar;
