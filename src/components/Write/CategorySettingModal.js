import React, { Component } from 'react';
import { Modal, Popover,Form, Input, Space  } from 'antd';
import './CategorySettingModal.css'
import { SettingOutlined, PlusOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import ChangeCategoryName from './ChangeCategoryName'
import DeleteCategory from './DeleteCategory'
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

// const [form] = Form.useForm();

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputArea : false,
      newInput : false
     };
  }  

  onFinish = value => {
    this.addCategory(value)
    this.newInputVisible()
  };

  addCategory = (value) => {
    axios.post('api/category/create-category',{
      prev_category_id : this.props.category.category_id,
      prev_category_seq : this.props.category.seq,
      new_category : value.newCategory,
    }).then(res => {
      if(res.data.error === "동일한 이름의 카테고리명이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        console.log(res)
        this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
      }
    })
  }

  categoryListOrder = (value) => {
    console.log('category_id:',value.categoryId)
    console.log('action:',value.action)
    console.log('seq:',value.categorySeq)
    axios.post('api/category/change-category-order',{
      category_id : value.categoryId,
      action : value.action,
      seq:value.categorySeq
    }).then(res => {
      this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
    })
  }

  
  
  inputAreaVisible = () =>{
    this.setState(state => ({
      inputArea: !state.inputArea
    }));
  }
  newInputVisible = () =>{
    this.setState(state => ({
      newInput: !state.newInput
    }));
  }
  render() {
    
    const text = <span style={{fontSize:"11px"}}>새로운 카테고리 이름을 입력해 주세요.</span>;
    const content = (
      <Form
          layout={'inline'}
          size="small"
          onFinish={this.onFinish}
          className="change_book_title_input_form"
        >
          <Space>
          <Form.Item name={['newCategory']} rules={[{ required: true }]} >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item className="change_book_title_buttons">
            <Button type="primary" htmlType="submit">완료</Button>
            <Button type="primary" onClick={this.newInputVisible}>취소</Button>
          </Form.Item>
          </Space>
        </Form>
    );
    const bookListInCategory = this.props.category.book_ids
    const bookList = bookListInCategory.map((book)=>(
      <span>{book.title}, </span>
    ))
    console.log('hello there :',this.props.category)
    const category_contents = {
      display:"flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height:"30px",
      lineHeight: "13px",
      padding:"5px",
      textAlign:"center"
    }
    return(
        <div className="category_setting_content" style={{fontSize:"11px"}}>
          <ul style={category_contents}>
            <li style={{width:"40px", textAlign:"left"}}>
              <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
                <PlusOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} />
              </Popover>
            </li>
            <li style={{width:"150px", textAlign:"left"}}>{this.state.inputArea ? <ChangeCategoryName updateState={this.props.updateState} 
                                                            vi={this.state.inputArea} 
                                                            inputAreaVisible={this.inputAreaVisible} 
                                                            category={this.props.category} /> : <>{this.props.category.name}/순서:{this.props.category.seq} </>}</li>
            <li style={{width:"50px"}}>
              {this.props.category.name === '(미지정)' ? '' :<EditOutlined onClick={this.inputAreaVisible} style={{fontSize:'14px'}}/>}
            </li>
            <li style={{width:"90px"}}>
              {this.props.category.name === '(미지정)' ? '' : <><ArrowUpOutlined onClick={()=>this.categoryListOrder({action: 'up', categoryId: this.props.category._id, categorySeq: this.props.category.seq})} style={{fontSize:'14px'}}/>
                                                               <ArrowDownOutlined onClick={()=>this.categoryListOrder({action: 'down', categoryId: this.props.category._id, categorySeq: this.props.category.seq})} style={{fontSize:'14px'}}/></>}
            </li>
            <li style={{width:"40px"}}>{this.props.category.name === '(미지정)' ? '' :<DeleteCategory updateState={this.props.updateState} categoryTotal={this.props.categoryTotal} category={this.props.category} />}</li>
            <li style={{width:"70px"}}>{bookList.length}</li>
            <li style={{width:"400px", textAlign:"left"}}>{bookList}</li>
          </ul>
        </div>
    )
  }
}



class CategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false
     };
  }

  render() {
    if(this.props.category){
      var categoryList = this.props.category.map((category)=>(
        <CategoryList updateState={this.props.updateState}
                      key={category._id} 
                      categoryTotal={this.props.category} 
                      category={category}/>
      ))
    } else {
      categoryList = 'none'
    }
    
    const category_columns = {
      display:"flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height:"30px",
      lineHeight: "13px",
      padding:"5px",
      backgroundColor:"#efefef",
      textAlign:"center"
    }
    return (
      <>
        <SettingOutlined  onClick={() => this.setState({visible:true})} style={{fontSize:'14px'}}/>
        <Modal
          title={[<SettingOutlined  onClick={() => this.setState({visible:true})} style={{fontSize:'14px'}}/>,<span style={{fontSize:"12px"}}> 카테고리 설정</span>]}
          visible={this.state.visible}
          onCancel={() => this.setState({visible:false})}
          width={1000}
          footer={null}
          style={{ top: 70 }}
          maskClosable={false}
        >
          <div style={{fontSize:"11px", border:"1px solid lightgrey"}}>
            <ul style={category_columns}>
              <li style={{width:"40px", textAlign:"left"}}>추가</li>
              <li style={{width:"150px", textAlign:"left"}}>카테고리 명</li>
              <li style={{width:"50px"}}>이름변경</li>
              <li style={{width:"90px"}}>표시순서 변경</li>
              <li style={{width:"40px"}}>삭제</li>
              <li style={{width:"70px"}}>총 책권수</li>
              <li style={{width:"400px", textAlign:"left"}}>책 제목모음</li>
            </ul>
          </div>
          {categoryList}
        </Modal>
      </>
    )
  }
}

export default CategoryModal