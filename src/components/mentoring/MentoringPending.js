import React, { Component } from 'react';
import { Table, Modal, Space,Avatar } from 'antd';
import { LinkOutlined,UserOutlined} from '@ant-design/icons';
import DefaultButton from '../styledComponents/defaultButton'
import axios from 'axios'

const { confirm } = Modal;

class MentoringWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    function showConfirm(id, event) {
      confirm({
        title: '해당 요청을 수락하시겠습니까?',
        icon:<LinkOutlined />,
        content: 'Some descriptions',
        onOk() {
          console.log('OK');
          axios.post('api/mentoring/accept-mentoring-req',{
              mentoring_id: id
          })
          .then(res => {
            console.log(res.data)
            event(res.data.new_mentoring_req)
          })
        },
        onCancel() {
          console.log('Cancel');
        },
        okText: '예',
        cancelText: '아니요',
      });
    }

    function showDenyConfirm(id, event) {
        confirm({
          title: '해당 요청을 거절하시겠습니까?',
          icon:<LinkOutlined />,
          content: 'Some descriptions',
          onOk() {
            console.log('OK');
            axios.post('api/mentoring/deny-mentoring-req',{
                mentoring_id: id
            })
            .then(res => {
              console.log(res.data)
              event(res.data.new_mentoring_req)
            })
          },
          onCancel() {
            console.log('Cancel');
          },
          okText: '예',
          cancelText: '아니요',
        });
      }

    if(this.props.mentoring_pending.length > 0){
      console.log("here?")
    
      var data = this.props.mentoring_pending.map(book =>({
        key: book._id,
        mentoring_id: book._id,
        name: book.mentee_id,
        book_title : book.title,
        ask_data: book.time_created,
        msg:book.msg
      }))
      console.log(data)
    }

    const columns = [
      {
        title: '책',
        dataIndex: 'book_title',
        render: text => text,
      },
      {
        title: '요청상대',
        dataIndex: 'name',
        width:"100px",
        render: (text) => <><Avatar size={15} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {text}</>
      },
      {
        title: '요청날짜',
        dataIndex: 'ask_data',
      },
      {
        title: '메세지',
        dataIndex: 'msg',
      },
      {
        render: (text, record) => (
          <div style={{display:"flex"}}>
            <Space>
                <DefaultButton size="small" onClick={() => showConfirm(record.mentoring_id, this.props.updatePendingList)} >요청수락</DefaultButton>
                <DefaultButton size="small" onClick={() => showDenyConfirm(record.mentoring_id, this.props.updatePendingList)} >거절</DefaultButton>
            </Space>
          </div>
        ),
      },
    ];
    
    return (
      // style={{maxHeight:"150px", overflow:"auto"}}
            <div >
              <Table
                className='study_table_list'
                columns={columns}
                dataSource={data}
                pagination={false}
                size='small'
              />
            </div> 
            );
  }
}
 
export default MentoringWaiting;

