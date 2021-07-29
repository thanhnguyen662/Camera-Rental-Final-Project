import { notification } from 'antd';

const openNotificationWithIcon = (type, message, description, duration) => {
   notification[type]({
      message: message,
      description: description,
      duration: duration ? 0 : 4.5,
   });
};

export default openNotificationWithIcon;
