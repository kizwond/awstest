import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink} from 'react-router-dom';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

const Login = (props) => {
  const onFinish = (values) => {
    axios.post('api/user/login', {
      user_id:values.user_id,
      password:values.password
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "아이디가 없는 듯요"){
        alert('유저정보가 없습니다. 아이디와 비밀번호를 확인하여 주세요.')
      } else {
        window.location.href = '/'
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const login_container = {
      width:"300px",
      margin:"auto",
      textAlign:"center"
  }

  return (
    <div style={login_container}>
      <div className="login_title"><img src="img/logo.png" alt="logo"/></div>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true}} onFinish={onFinish}>
        <Form.Item name="user_id" rules={[{required: true,message: '아이디를 입력해 주세요.'}]}>
          <Input prefix={<UserOutlined />} placeholder="아이디" />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: '비밀번호를 입력해 주세요.'}]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="비밀번호"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">Log In</Button>
        </Form.Item>
        <div>
            <a href="/">아이디 찾기 / </a>
            <a href="/"> 비밀번호 찾기 / </a>
            <NavLink to="/register">회원가입</NavLink>
        </div>
      </Form>
    </div>
  );
};

export default Login;