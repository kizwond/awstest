import React, { Component } from 'react';
import {Modal,Table} from 'antd'
import './StudyData.css'
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class StudySettingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    if(this.props.info.book_id){
      var turn_on_modal = this.props.isModalVisible.studyDataVisible
      console.log('turn_on_modal',turn_on_modal)
      // var book_status = JSON.stringify(this.props.book_status, null, 2)
      // var book_status = JSON.stringify(this.props.book_status.cards,undefined,4)
      // document.getElementById("show_data").textContent = JSON.stringify(this.props.book_status.cards, undefined, 2);
    }

    console.log("info", this.props.book_status)

    const columns = [
      {
        title: 'Card ID',
        dataIndex: 'card_id',
        key: 'card_id',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => text
        // <FroalaEditorView model={text}/> 
      },
      {
        title: '학습상태',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Card Type',
        dataIndex: 'card_type',
        key: 'card_type',
      },
      {
        title: '최근학습시간',
        dataIndex: 'recent_study_time',
        key: 'recent_study_time',
      },
      {
        title: '다음복습시간',
        dataIndex: 'need_study_time',
        key: 'need_study_time',
      },
      {
        title: '마지막선택난이도',
        dataIndex: 'recent_difficulty',
        key: 'recent_difficulty',
      },
      {
        title: '총학습횟수',
        dataIndex: 'total_study_times',
        key: 'total_study_times',
      },
      {
        title: '알겠음이후 학습횟수',
        dataIndex: 'current_lev_study_times',
        key: 'current_lev_study_times',
      },
      {
        title: '총학습시간',
        dataIndex: 'total_study_hour',
        key: 'total_study_hour',
      },
      {
        title: '최근학습시간',
        dataIndex: 'recent_study_hour',
        key: 'recent_study_hour',
      },
      {
        title: '획득경험치',
        dataIndex: 'exp_gained',
        key: 'exp_gained',
      },
      {
        title: '누적경험치',
        dataIndex: 'exp_stacked',
        key: 'exp_stacked',
      },
      {
        title: '현재레벨',
        dataIndex: 'level',
        key: 'level',
      },
    ];

    if(this.props.book_status.cards){
      console.log(this.props.book_status)
      var data = this.props.book_status.cards.map(item =>({
        key: item._id,
        content: item.contents.face1[0], 
        card_id: item._id,
        status : item.status,
        card_type : item.type,
        recent_study_time: item.detail_status.recent_study_time,
        need_study_time: item.detail_status.need_study_time,
        recent_difficulty: item.detail_status.recent_difficulty,
        total_study_times: item.detail_status.total_study_times,
        current_lev_study_times: item.detail_status.current_lev_study_times,
        total_study_hour: item.detail_status.total_study_hour,
        recent_study_hour: item.detail_status.recent_study_hour,
        exp_gained: item.detail_status.exp_gained,
        exp_stacked: item.detail_status.exp_stacked,
        level: item.detail_status.level,
      }))
      console.log(data)
    }

    return (
      <>
      <Modal
        title="상세보기"
        width={1200}
        visible={turn_on_modal}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >

        <div className="study_setting_container" style={{fontSize:"11px"}}>
        <Table 
            size='small' 
            pagination={false} 
            columns={columns} 
            dataSource={data} 
        />
        {/* <pre><code style={{fontSize:"10px"}}> {book_status} </code></pre> */}
        </div>
      </Modal>
      </>
    );
  }
}

export default StudySettingModal;

