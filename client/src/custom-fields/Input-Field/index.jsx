import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

InputField.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,

   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
};

InputField.defaultProps = {
   type: 'text',
   label: '',
   placeholder: '',
   disabled: false,
   prefix: '',
};

function InputField(props) {
   const { field, form, placeholder, prefix } = props;

   const { name } = field;
   const { errors, touched, submitCount, hasFeedback } = form;

   const hasTouched = touched[name];
   const submitted = submitCount > 0;
   const hasError = errors[name];
   const submittedError = hasError && submitted;
   const touchedError = hasError && hasTouched;

   return (
      <div>
         <Form.Item
            hasFeedback={
               (hasFeedback && submitted) || (hasFeedback && hasTouched)
                  ? true
                  : false
            }
            help={submittedError || touchedError ? hasError : false}
            validateStatus={
               submittedError || touchedError ? 'error' : 'success'
            }
         >
            <Input {...field} placeholder={placeholder} prefix={prefix} />
         </Form.Item>
      </div>
   );
}

export default InputField;
