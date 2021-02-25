import React from 'react';
import { Form, Input, Space } from 'antd';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

const ChangeCategory = (props) => {
  const [form] = Form.useForm();
  const onFinish = value => {
    changeCategoryHandler({value, categoryId:props.category._id})
    props.inputAreaVisible()
  };
  const cancel = () => {
    props.inputAreaVisible()
    console.log(props.inputAreaVisible)
    console.log('cancel clicked!!!')
    console.log(props.vi)
  }
  const changeCategoryHandler = (value) => {
    axios.post('api/category/change-category-name',{
      category_id : value.categoryId,
      name : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 카테고리명이 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
      }
    })
  }
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
          <Input placeholder={props.category.category_name} />
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" htmlType="submit">완료</Button>
          <Button type="primary" onClick={cancel}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default ChangeCategory