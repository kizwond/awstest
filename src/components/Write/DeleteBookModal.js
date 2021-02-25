import React, { Component } from 'react'
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined,WarningTwoTone } from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal;

class DeleteBook extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }

  bookDeleteHandler = (value) => {
    axios.post('api/book/delete-book',{
      book_id : value.book_id,
      seq_in_category : value.seq_in_category,
      seq_in_like : value.seq_in_like,
      category_id : value.category_id,
    }).then(res => {
      console.log(res.data)
      this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
    })
  }

  showPromiseConfirm = (book, event) => {
    confirm({
      title: [`[${this.props.bookTitle.title}] 책을 삭제하시겠습니까?`],
      icon: <ExclamationCircleOutlined />,
      content: [<WarningTwoTone twoToneColor="red"/>,<span style={{fontSize:"12px",fontWeight:"700"}}> 삭제시 <span style={{color:"red"}}>영구 삭제</span> 되오니 신중히 결정 하십시오.</span>,<br/>,<span style={{fontSize:"11px",fontWeight:"700"}}>- 구매한책일경우, oo에서 다시 불러올 수 있으나,<br/> 본인이 추가한 카드는 영구 삭제됩니다.</span>],
      onOk() {  
        event({book_id:book._id, seq_in_category:book.seq_in_category, seq_in_like:book.seq_in_like, category_id:book.category_id._id})
      },
      onCancel() {},
    });
  }
  render() { 
    return ( 
      <Space>
        <DeleteOutlined onClick={()=>this.showPromiseConfirm(this.props.bookTitle, this.bookDeleteHandler)} style={{fontSize:'14px'}} />
      </Space>
    );
  }
}



export default DeleteBook