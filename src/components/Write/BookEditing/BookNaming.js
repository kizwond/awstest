import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import axios from 'axios'
import Button from '../../styledComponents/defaultButton'

const { Option } = Select;
const HorizontalLoginForm = () => {
  
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); // To disable submit button at the beginning.
  const [ message, setMessage ] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [data, setData] = useState({});


  useEffect(() => {
    let completed = false; 

    async function get() {
      const result = await axios.get('api/category/get-categorylist')
      if (!completed) setData(result.data.categories);
    }
    get();
    return () => {
      completed = true;
    };
  }, []); 

  const handleSubmit = (values) => {
    var url = '/api/book/create-book';
    var data = values;
    console.log(data)

    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(function(response){
      console.log(response)
      if(response.error === "동일한 이름의 책이 이미 존재합니다."){
        setMessage(response.error)
      } else {
        window.location.href = '/write'
      }
    })
    .catch(error => console.error('Error:', error));
  }

  const onFinish = values => {
    if(values.size === undefined){
      values.size = 'a4'
    }
    handleSubmit(values)
  };

  const book_layout = {
    width:"300px",
    padding: "20px 20px 0 20px",
    margin: "auto",
    border: "1px solid #d8d8d8",
    borderRadius:"5px",
    background:"#f7f7f7",
    boxShadow: "0px 0px 12px -3px rgba(153,153,153,1)"
  }

  return (
    <>
    {data.length > 0 ? <div style={{marginTop:"100px"}}>
      <div style={book_layout}>
        <Form form={form} initialValues={{
                                          ['category_id']:data[0]._id,
                                        }} 
                          name="book_naming" 
                          layout="block" 
                          onFinish={onFinish}>
            <div style={{fontSize:"25px",fontFamily: `'Jua', sans-serif`, color:"#565656"}}>내 책 만들기</div>
            <div style={{fontSize:"11px"}}>카테고리 선택</div>
            <Form.Item
              className="category_select_naming"
              name='category_id'
              rules={[{ required: false, message: '카테고리를 선택해 주세요' }]}
              
            >
              <Select style={{ width: "100%" }} placeholder="카테고리를 선택해 주세요." >
                {data.map((category)=>(
                                      <Option key={category._id} value={category._id}>{category.name}</Option>
                                    )) }
              </Select>
            </Form.Item>
            <div style={{fontSize:"11px"}}>첵제목 입력</div>
            <Form.Item
              className="naming_input"
              name="book_title"
              rules={[
                {
                  required: true,
                  message: '책제목을 입력해 주세요!!!',
                },
              ]}
            >
              <Input style={{width:"100%"}} prefix={<BookOutlined className="site-form-item-icon" />} placeholder="책제목을 입력해 주세요" />
            </Form.Item>
              
            
              <Form.Item style={{marginBottom:"10px"}}>
                  <Button
                    className="naming_submit_button"
                    type="primary"
                    htmlType="submit"
                  >
                    시작
                  </Button>
              </Form.Item>

              <Form.Item>
                  <Button
                    className="naming_submit_button"
                    size="samll"
                    htmlType="submit"
                    style={{}}
                  >
                    취소
                  </Button>
              </Form.Item>
        </Form>
        { message && <div style={{fontSize:"10px",color:"red"}}>※ {message}</div> }
      </div>
    </div>:''}
    
    </>
  );
};

export default HorizontalLoginForm