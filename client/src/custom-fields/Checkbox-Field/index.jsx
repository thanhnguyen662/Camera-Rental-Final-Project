import { Checkbox, Form } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

CheckboxField.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,

   type: PropTypes.string,
   label: PropTypes.object,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
};

CheckboxField.defaultProps = {
   type: 'text',
   label: {},
   placeholder: '',
   disabled: false,
   prefix: '',
};

function CheckboxField(props) {
   const { field, form, label } = props;

   const { name, value } = field;
   const { errors, touched } = form;

   const showErrors = errors[name] && touched[name];

   return (
      <Form.Item
         help={showErrors ? errors[name] : false}
         validateStatus={showErrors ? 'error' : 'success'}
      >
         <Checkbox {...field} checked={value}>
            {label}
         </Checkbox>
      </Form.Item>
   );
}

export default CheckboxField;
