import React from 'react';
import { Form, Input, Space } from 'antd';
import axios from 'axios'
import Button from '../../styledComponents/defaultButton'

const ChangeCategory = (props) => {
  const [form] = Form.useForm();
  const onFinish = value => {
    console.log(value)
    changeTableNameHandler({value, tableId:props.table._id})
    props.inputAreaVisible()
  };
  const cancel = () => {
    props.inputAreaVisible()
    console.log(props.inputAreaVisible)
    console.log('cancel clicked!!!')
    console.log(props.vi)
  }

  const changeTableNameHandler = (value) => {
    console.log(value)
    const book_id = sessionStorage.getItem("book_id")
    axios.post('api/index/change-index-name',{
      index_id : value.tableId,
      name : value.value.newName,
      book_id: book_id
    })
    .then(res => {
      console.log(res.data)
      props.updateContentsTable(res.data.indexList)
    })
  }

  return (
    <span>
      <Form
        layout={'inline'}
        form={form}
        size="small"
        onFinish={onFinish}
        className="change_book_title_input_form"
      >
        <Space>
        <Form.Item name={['newName']} rules={[{ required: true }]} >
          <Input placeholder={props.table.table_name}/>
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" htmlType="submit">완료</Button>
          <Button type="primary" onClick={cancel}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
    </span>
  );
};

export default ChangeCategory