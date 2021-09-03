import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, DatePicker } from 'antd';
import moment from 'moment';
import './RevenueSelectDate.scss';

RevenueSelectDate.propTypes = {
   handleDatePickerChange: PropTypes.func,
   userId: PropTypes.string,
};

RevenueSelectDate.defaultProps = {
   handleDatePickerChange: null,
   userId: '',
};

const { Text, Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

function RevenueSelectDate(props) {
   const { handleDatePickerChange, userId } = props;

   const [datePickerDate, setDatePickerDate] = useState([
      moment().subtract(30, 'days'),
      moment().add(1, 'days'),
   ]);

   useEffect(() => {
      if (!userId) return;
      handleDatePickerChange({
         userId: userId,
         startDate: datePickerDate[0].format('YYYY-MM-DD'),
         endDate: datePickerDate[1].format('YYYY-MM-DD'),
      });
      // eslint-disable-next-line
   }, [datePickerDate, userId]);

   const onDatePickerChange = (value, dateString) => {
      setDatePickerDate([moment(value[0]), moment(value[1])]);
   };

   const disabledDate = (current) => {
      return current && current > moment().add(1, 'days');
   };

   return (
      <>
         <Row>
            <Col flex='auto'>
               <Paragraph>
                  <Title level={5} style={{ marginBottom: 2 }}>
                     Select the Date
                  </Title>
                  <Text>View orders statistic by Date</Text>
               </Paragraph>
            </Col>
            <Col>
               <RangePicker
                  allowClear={false}
                  value={datePickerDate}
                  className='datePickerRevenue'
                  disabledDate={disabledDate}
                  onChange={onDatePickerChange}
               />
            </Col>
         </Row>
      </>
   );
}

export default RevenueSelectDate;
