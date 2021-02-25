import React, { Component } from 'react'

import { Modal, Space, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined,WarningTwoTone } from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal;
const { Option } = Select;

class DeleteCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category:this.props.category,
      moveTo:''
     }
  }
  handleChange = (value) => {
    console.log(value)
    this.setState({
      moveTo : value
    })
  }
  handleChangeInside = (value) => {
    console.log(value)
    this.setState({
      moveTo : ''
    })
  }
  deleteThis = (value) => {
    this.categoryDeleteHandler({value, moveTo:this.state.moveTo})
  }

  categoryDeleteHandler = (value) => {
    if(value.moveTo === ""){
      value.moveTo = 'none'
    }
    axios.post('api/category/delete-category',{
      category_id : value.value.categoryId,
      target_category : value.moveTo,
    }).then(res => {
      this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
    })
  }

  showPromiseConfirm = (category_id, event, handleChangeInside) => {
    console.log(this)
    if(this.props.categoryTotal.length >= 0) {
      var optionList = this.props.categoryTotal.map((category)=>(
        <Option key={category._id} value={category._id}>{category.name}</Option>
      ))
    } else {
      optionList = <Option value="j">j</Option>
    }
    confirm({
      title: [`[${this.state.category.name}] 카테고리를 삭제하시겠습니까?`],
      okText: '삭제',
      cancelText: '취소',
      icon: <ExclamationCircleOutlined />,
      content: [<WarningTwoTone twoToneColor="red"/>,<span style={{fontSize:"12px",fontWeight:"700"}}> 삭제시 <span style={{color:"red"}}>영구 삭제</span> 되오니 신중히 결정 하십시오.</span>,
                                                    <br/>,<span style={{fontSize:"11px",fontWeight:"700"}}>- 다른 카테고리를 선택하지 않을시 포함된 책 또한 함께 삭제됩니다.</span>,<br/>,
                                                    <span style={{fontSize:"11px",fontWeight:"700"}}>- 구매한 책은 미지정 카테고리로 이동되며, 본인이 직접 만든 책은 영구삭제 됩니다.</span>,<br/>,
                                                    <span style={{fontSize:"11px",fontWeight:"700"}}>- [카테고리 이동후 삭제시] 숨긴책은 이동후에도 숨긴상태가 유지됩니다.</span>,
                                                    <br/>,<div className="selection_move_down" style={{fontSize:"11px",fontWeight:"700"}}><span>포함된 책을</span> <Select defaultValue="카테고리 선택" 
                                                    size="small" style={{ fontSize:'11px', width: 160 }} onChange={this.handleChange}>
                                                    <Option key={'default'} value=''>카테고리 선택</Option>
                                                    {optionList}
                                                  </Select> <span>로 이동 후</span></div>],
      onOk() {  
        event({categoryId:category_id._id})
      },
      onCancel() {
        handleChangeInside()
      },
    });
  }
  render() { 
    return ( 
      <Space>
        <DeleteOutlined onClick={()=>this.showPromiseConfirm(this.state.category, this.deleteThis, this.handleChangeInside)} style={{fontSize:'14px'}} />
      </Space>
    );
  }
}



export default DeleteCategory