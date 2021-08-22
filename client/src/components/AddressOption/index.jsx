import { Button, Form, Input, Select, Space } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AddressOption.scss';

AddressOption.propTypes = {
   onFinish: PropTypes.func,
   oldData: PropTypes.object,
};

AddressOption.defaultProps = {
   onFinish: null,
   oldData: {},
};

const { Option } = Select;

function AddressOption(props) {
   const { onFinish, oldData } = props;

   const location = useLocation();
   const [provinces, setProvinces] = useState(null);
   const [districts, setDistricts] = useState(null);
   const [wards, setWards] = useState(null);

   const [form] = Form.useForm();

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

   const getDistrict = async (provinceId) => {
      try {
         const response = await axios.get(
            `https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${provinceId}`
         );
         setDistricts(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   const getWards = async (districtId) => {
      try {
         const response = await axios.get(
            `https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${districtId}`
         );
         setWards(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   const disableDistrictsOption = !districts && {
      disabled: true,
      loading: true,
   };

   const disableWardsOption = !wards && {
      disabled: true,
      loading: true,
   };

   const validationForm = location.pathname !== '/maps' && {
      rules: [
         {
            required: true,
         },
      ],
   };

   const initialValues = Object.keys(oldData).length !== 0 && {
      address: oldData.pins[0].address,
      city: oldData.pins[0].city,
      district: oldData.pins[0].district,
      ward: oldData.pins[0].ward,
   };

   return (
      <>
         <div className='addressForm'>
            <Form
               className='form'
               form={form}
               onFinish={onFinish}
               labelCol={{ span: 8 }}
               wrapperCol={{ span: 16 }}
               initialValues={initialValues}
            >
               {location.pathname === '/maps' && (
                  <Form.Item
                     name='productName'
                     label='Name'
                     {...validationForm}
                  >
                     <Input
                        allowClear
                        placeholder='Please input product name'
                        style={{ width: '205%' }}
                     />
                  </Form.Item>
               )}
               <Form.Item name='address' {...validationForm} label='Address'>
                  <Input
                     allowClear
                     placeholder='Please input address'
                     style={{ width: '205%' }}
                  />
               </Form.Item>

               <Form.Item name='city' {...validationForm} label='City'>
                  <Select
                     allowClear
                     showSearch
                     style={{ width: '205%' }}
                     placeholder='Please select city/province'
                     onChange={(value) => {
                        getDistrict(value?.split('/')[0]);
                     }}
                  >
                     {provinces &&
                        provinces.map((province) => (
                           <Option
                              value={`${province.idProvince}/${province.name}`}
                              key={province.idProvince}
                           >
                              {province.name}
                           </Option>
                        ))}
                  </Select>
               </Form.Item>
               <Form.Item name='district' {...validationForm} label='District'>
                  <Select
                     {...disableDistrictsOption}
                     allowClear
                     showSearch
                     style={{ width: '205%' }}
                     placeholder='Please select district'
                     onChange={(value) => {
                        getWards(value?.split('/')[0]);
                     }}
                  >
                     {districts &&
                        districts.map((district) => (
                           <Option
                              value={`${district.idDistrict}/${district.name}`}
                              key={district.idDistrict}
                           >
                              {district.name}
                           </Option>
                        ))}
                  </Select>
               </Form.Item>
               <Form.Item name='ward' {...validationForm} label='Ward'>
                  <Select
                     {...disableWardsOption}
                     allowClear
                     style={{ width: '205%' }}
                     placeholder='Please select ward'
                     showSearch
                  >
                     {wards &&
                        wards.map((ward) => (
                           <Option
                              value={`${ward.idCommune}/${ward.name}`}
                              key={ward.idCommune}
                           >
                              {ward.name}
                           </Option>
                        ))}
                  </Select>
               </Form.Item>
               <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Space>
                     <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: '120px' }}
                     >
                        Submit
                     </Button>
                     <Button
                        htmlType='button'
                        onClick={() => form.resetFields()}
                     >
                        Reset
                     </Button>
                  </Space>
               </Form.Item>
            </Form>
         </div>
      </>
   );
}

export default AddressOption;
