import React, { Component } from 'react';
import { Modal, Popover,Form, Input, Space } from 'antd';
import { PlusCircleOutlined,SettingOutlined,EditOutlined,StepBackwardOutlined,StepForwardOutlined } from '@ant-design/icons';
import './ContentsTable.css'
import ContentsTableChangeName from './ContentsTableChangeName'
import DeleteTable from './DeleteTable'
import axios from 'axios'
import Button from '../../styledComponents/defaultButton'

class ContentsTableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputArea : false,
      newInput : false
     };
  }

  onFinish = value => {
    console.log(this.props)
    this.addTable({value, prevTableLevel:this.props.table.level, prevTableOrder:this.props.table.seq})
    this.newInputVisible()
  };

  addTable =(value) => {
    console.log(value)
    axios.post('api/index/create-index',{
      book_id : this.props.table.book_id,
      level : value.prevTableLevel,
      seq : value.prevTableOrder,
      name : value.value.newTable,
    }).then(res => {
      console.log(res.data)
      this.props.updateContentsTable(res.data.indexList)
    })
  }

  tableLevelHandler = (value) => {
    console.log(value)
    axios.post('api/index/change-index-level',{
      book_id : this.props.table.book_id,
      index_id : value.tableId,
      level : value.presentLevel,
      seq: value.seq,
      action: value.action
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "이동불가") {
        alert(res.data.msg)
      } else {
        console.log(res.data)
        this.props.updateContentsTable(res.data.indexList)
      }
    })
  }

  // tableOrderlHandler = (value) => {
  //   console.log(value)
  //   axios.post('api/index/change-index-order',{
  //     index_id : value.tableId,
  //     book_id : this.props.table.book_id,
  //     action : value.action,
  //     seq :value.presentOrder
  //   })
  //   .then(res => {
  //     console.log(res.data)
  //     this.props.updateContentsTable(res.data.indexList)
  //   })
  // }

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
    const text = <span>새로운 목차를 입력해 주세요.</span>;
    const content = (
      <Form
          layout={'inline'}
          size="small"
          onFinish={this.onFinish}
          className="change_book_title_input_form"
        >
          <Space>
          <Form.Item name={['newTable']} rules={[{ required: true }]} >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item className="change_book_title_buttons">
            <Button type="primary" htmlType="submit">완료</Button>
            <Button type="primary" onClick={this.newInputVisible}>취소</Button>
          </Form.Item>
          </Space>
        </Form>
    );
    return (
      <div className="mokcha_contents">
        <div className="mokcha_levels">
          <div></div>
          {this.props.table.level === 1 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
          {this.state.inputArea ? <ContentsTableChangeName updateContentsTable={this.props.updateContentsTable} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.name}/ 순서 : {this.props.table.seq}</>}
          </div> : <div></div>}
          {this.props.table.level === 2 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName updateContentsTable={this.props.updateContentsTable} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.name}/ 순서 : {this.props.table.seq}</>}
          </div> : <div></div>}
          {this.props.table.level === 3 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName updateContentsTable={this.props.updateContentsTable} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.name}/ 순서 : {this.props.table.seq}</>}
          </div> : <div></div>}
          {this.props.table.level === 4 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName updateContentsTable={this.props.updateContentsTable} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.name}/ 순서 : {this.props.table.seq}</>}
          </div> : <div></div>}
          {this.props.table.level === 5 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName updateContentsTable={this.props.updateContentsTable} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.name}/ 순서 : {this.props.table.seq}</>}
          </div> : <div></div>}
        </div>
        <div className="mokcha_tools">
          <div><EditOutlined onClick={this.inputAreaVisible} style={{fontSize:'14px'}}/></div>
          <div><StepBackwardOutlined onClick={()=>this.tableLevelHandler({action:'left', tableId:this.props.table._id, presentLevel:this.props.table.level,seq:this.props.table.seq})}/> <StepForwardOutlined onClick={()=>this.tableLevelHandler({action:'right', tableId:this.props.table._id, presentLevel:this.props.table.level,seq:this.props.table.seq})}/></div>
          {/* <div><CaretUpOutlined onClick={()=>this.tableOrderlHandler({action:'up', bookId:this.props.table.book_id, tableId:this.props.table._id, presentOrder:this.props.table.seq})}/> <CaretDownOutlined onClick={()=>this.tableOrderlHandler({action:'down', bookId:this.props.table.book_id, tableId:this.props.table._id, presentOrder:this.props.table.seq})}/></div> */}
          <div><DeleteTable table={this.props.table} updateContentsTable={this.props.updateContentsTable}/></div>
        </div>
      </div>
    );
  }
}

class ContentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }
  render() {
    const contentsTableList = this.props.table_of_contents.map((table)=>(
      <ContentsTableList key={table._id} 
                         table={table} 
                         updateContentsTable={this.props.updateContentsTable} 
                         table_of_contents={this.props.table_of_contents}/>
    ))
    return (
      <Modal
        title={[<SettingOutlined />, " 목차편집"]}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
        width={900}
        maskClosable={false}
      >
        <div className="mokcha_container">
          <div className="mokcha_columns">
            <div className="mokcha_left_columns">
              <div>레벨</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div className="mokcha_right_columns">
              <div>이름변경</div>
              <div>레벨이동</div>
              {/* <div>순서이동</div> */}
              <div>삭제</div>
            </div>
          </div>
          
            {contentsTableList}
         
        </div>
      </Modal>
    );
  }
}
export default ContentsTable;