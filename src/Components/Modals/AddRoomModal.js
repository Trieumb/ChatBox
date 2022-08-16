import React, {useContext} from 'react';
import {Form, Modal} from 'antd';
import Input from 'antd/lib/input/Input';
import {AppContext} from '../Context/AppProvider';

const AddRoomModal = () => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useContext (AppContext);
  const [form] = Form.useForm ();

  const handleOk = () => {
    console.log ({formData: form.getFieldsValue ()});
    setIsAddRoomVisible (false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible (false);
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
