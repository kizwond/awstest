import React, { Component } from 'react'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import Button from '../../styledComponents/defaultButton'

const { confirm } = Modal;

class CardDelete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }

  tableCardHandler = (value) => {
    axios.post('api/card/delete-card',{
      index_id : value.index_id,
      card_id : value.card_id,
      seq_in_index:value.seq_in_index,
    }).then(res => {
      console.log("check this out? : ", res.data)
      this.props.updateCardListState(res.data.cardlist)
    })
  }

  deleteThis = () => {
    this.tableCardHandler({ index_id:this.props.index_id, seq_in_index:this.props.seq_in_index, card_id:this.props.card_id})
  }
  showPromiseConfirm = (event) => {
    confirm({
      // title: [`[${this.props.table.name}] 카드를 삭제하시겠습니까?`],
      title: [`선택하신 카드를 삭제하시겠습니까?`],
      okText: '삭제',
      cancelText: '취소',
      icon: <ExclamationCircleOutlined />,
      content: [],
      onOk() {  
        event()
      },
      onCancel() { },
    });
  }
  render() { 
    return ( 
      <>
      <Button size="small" onClick={()=>this.showPromiseConfirm(this.deleteThis)} icon={<DeleteOutlined />}>카드 삭제</Button>
      </>
      // <Space>
      //   <DeleteOutlined onClick={()=>this.showPromiseConfirm(this.props.table, this.deleteThis)} style={{fontSize:'14px'}} />
      // </Space>
    );
  }
}



export default CardDelete