import React from 'react';
import { Form, Input, Space } from 'antd';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

const ChangeBookTitle = (props) => {
  const [form] = Form.useForm();

  const onFinish = value => {
    console.log(value, props)
    // props.changeBookTitleHandler({value, bookId:props.bookTitle._id})
    axios.post('api/book/change-book-title',{
      book_id : props.bookTitle._id,
      name : value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 이름의 책이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {

        console.log(res.data)
        props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
      }
    })
  
   
    props.onClick()
  };
  return (
    <>
      <Form
        layout={'inline'}
        form={form}
        size="small"
        onFinish={onFinish}
        className="change_book_title_input_form"
      >
        <Space>
        <Form.Item name={['newName']} rules={[{ required: true }]} >
          <Input placeholder={props.bookTitle.book_title} />
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" htmlType="submit">완료</Button>
          <Button type="primary" onClick={props.onClick}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default ChangeBookTitle