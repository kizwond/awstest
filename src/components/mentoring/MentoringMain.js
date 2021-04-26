import React, { Component } from 'react';
import axios from 'axios'
import MenteeList from "./MenteeList"
import MentorList from "./MentorList"
import { Layout,Badge,Select,Modal } from 'antd';
import "./StudyList.css"
import {UserSwitchOutlined,UsergroupAddOutlined} from '@ant-design/icons';
import MentoringWaiting from './MentoringWaiting'
import MentoringAsk from './MentoringAsk'
import MentoringPending from './MentoringPending'
import DefaultButton from '../styledComponents/defaultButton'

const { Content } = Layout;
const { Option } = Select;
class MentoringMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isRequestModalVisible:false,
      isAcceptModalVisible:false,
      my_study_result:[],
      mentee_study_result:[],
      category:[],
      mentor_id:'',
      mentor_info:'',
      msg_to_mentor:'',
      agree:false,
      book_info:[],
      mentoring_req:[],
      mentoring_pending:[]
     }
  }
  
  componentDidMount() {
    this.getMentoringList()
    
    axios.post('api/mentoring/enter-mentoring-req')
      .then(res => {
        console.log(res.data)
        this.setState({
          category:res.data.category,
          mentoring_req:res.data.mentoring_req,
        })
      })
    this.getPendingList()
    
  }
  getMentoringList() {
    axios.post('api/mentoring/get-mentoringlist')
    .then(res => {
      console.log(res.data)
      this.setState({
        my_study_result:res.data.my_study_result,
        mentee_study_result:res.data.mentee_study_result
      })
    })
  }

  getPendingList() {
    axios.post('api/mentoring/enter-mentoring-req_management')
    .then(res => {
      console.log('pending:',res.data)
      this.setState({
        mentoring_pending:res.data.mentoring_req,
      })
    })
  }
  updatePendingList = (data) => {
    this.setState({
      mentoring_pending:data,
    })
  }
  updateRequestList = (data) => {
    this.setState({
      mentoring_req:data,
    })
  }
  showRequestModal = () => {
    this.setState({
      isRequestModalVisible:true
    })
  };

  handleOk = () => {
    this.setState({
      isRequestModalVisible:false
    })
  };

  handleCancel = () => {
    this.setState({
      isRequestModalVisible:false
    })
  };


  showAcceptModal = () => {
    this.setState({
      isAcceptModalVisible:true
    })
  };
  acceptHandleOk = () => {
    this.setState({
      isAcceptModalVisible:false
    })
  };

  acceptHandleCancel = () => {
    this.setState({
      isAcceptModalVisible:false
    })
  };


  onChangeAgree = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({
      agree:e.target.checked
    })
  }
  searchMentor = () => {
    axios.post('api/mentoring/get-user-info',{
      user_id: this.state.mentor_id
    }).then(res => {
      console.log(res.data)
      this.setState({
        mentor_info:res.data.user,
      })
    })
  }
  inputMentorId = (e) => {
    console.log(e.target.value)
    this.setState({
      mentor_id: e.target.value
    })
  }
  msgToSend = (e) => {
    console.log(e.target.value)
    this.setState({
      msg_to_mentor: e.target.value
    })
  }
  saveBookInfo = (record) => {
    this.setState({
      book_info : record
    })
  }
  sendRequestMentoring = () => {
    axios.post('api/mentoring/request-mentoring',{
      mentor_id: this.state.mentor_id,
      book_id :this.state.book_info.book_id,
      title: this.state.book_info.book_title,
      msg : this.state.msg_to_mentor,
    }).then(res => {
      console.log(res.data)
      this.setState({
        category:res.data.category,
        mentoring_req:res.data.mentoring_req,
      })
    })
  }
  render() { 
    return ( 
      <div className="study_page_booklist_container">
          <Layout>
            <Content className="study_page_content_padding">
              <div className="study_page_list_title"><DefaultButton size="small" onClick={this.showRequestModal} width="100px"><UserSwitchOutlined /> 멘토링 요청</DefaultButton>
                <Modal
                  title="멘토링 요청"
                  visible={this.state.isRequestModalVisible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <span style={{fontSize:"11px"}}>요청한 멘토링</span>
                  <MentoringWaiting updateRequestList={this.updateRequestList} mentoring_req={this.state.mentoring_req} />
                  <span style={{fontSize:"11px"}}>멘토링 요청하기</span>
                  <MentoringAsk onChangeAgree={this.onChangeAgree}
                                searchMentor={this.searchMentor}
                                inputMentorId={this.inputMentorId}
                                msgToSend={this.msgToSend}
                                saveBookInfo={this.saveBookInfo}
                                sendRequestMentoring={this.sendRequestMentoring}
                                book_info={this.state.book_info}
                                mentor_id={this.state.mentor_id}
                                category={this.state.category}
                                mentor_info={this.state.mentor_info}
                                />
                </Modal>
              </div>
              <MentorList my_study_result={this.state.my_study_result}/>
              <div className="study_page_list_title study_page_bottom_title"><Badge count={this.state.mentoring_pending.length} size="small"><DefaultButton size="small" onClick={this.showAcceptModal} width="100px"><UsergroupAddOutlined /> 멘토링 수락</DefaultButton></Badge></div>
              <Modal
                  title="멘토링 수락"
                  visible={this.state.isAcceptModalVisible}
                  onOk={this.acceptHandleOk}
                  onCancel={this.acceptHandleCancel}
                >
                  <span style={{fontSize:"11px"}}> 멘토링 수락</span>
                  <MentoringPending mentoring_pending={this.state.mentoring_pending} updatePendingList={this.updatePendingList} />
                  
                </Modal>
              <div style={{padding:5, backgroundColor:"white" }}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"5px"}}>
                  <div>
                    <Select style={{width:"100px", fontSize:"11px"}} defaultValue="재수종합1반" size="small">
                      <Option value="jack">재수종합1반</Option>
                      <Option value="lucy">재수종합2반</Option>
                    </Select>
                  </div>
                  <div>
                    <DefaultButton size="small" width="100px" style={{marginRight:"5px"}}>학습정보 내려받기</DefaultButton>
                    <DefaultButton size="small" width="100px">멘토링 관리</DefaultButton>
                  </div>
                </div>
                <MenteeList/>
              </div>
            </Content>
          </Layout>
      </div>
     );
  }
}
 
export default MentoringMain;