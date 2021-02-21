import React, { useState } from 'react';
import { Form, Input, Modal} from 'antd';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

const Register = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)
    axios.post('/api/user/register', {
      user_id:values.user_id,
      password:values.password
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "중복된 아이디가 있습니다."){
          alert("중복된 아이디가 있습니다.")
      } else {
        alert('회원가입에 성공하셨습니다. 로그인 페이지로 이동합니다.')
        document.getElementById("register_form").innerHTML='';
        document.getElementById("register_title").innerHTML='';
        window.location.href = '/login'
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  const register_form_container = {
    width:"300px",
    margin:"auto",
    textAlign:"center"
}

  return (
    <div style={register_form_container}>
      <div id='register_title' className="register_title"><img src="img/logo.png" alt="logo"/></div>
      <Form
        form={form}
        className="register_form"
        id='register_form'
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '82',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="user_id"
          label="아이디"
          rules={[
            {
              required: true,
              message: '사용할 아이디를 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해 주세요.',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '비밀번호를 다시한번 입력해 주세요.',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('비밀번호가 일치하지 않습니다.');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register