import React, { Component } from 'react';
import { Tooltip, Modal, Input, Radio, InputNumber, Space } from 'antd';
import axios from 'axios'
import { QuestionCircleOutlined } from '@ant-design/icons';
import Button from '../../styledComponents/defaultButton'

class NewCardTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible:false,
      type:'read',
      name:'',
      face1Num:'',
      face2Num:'',
      onChangeFlipMode:'normal',
      selection:''
     };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    if(this.state.type === "read") {
      var face1 = this.state.face1Num
      var selection = 0
      var face2 = 0
    } else if(this.state.type === "flip-normal" && this.state.onChangeFlipMode === "normal") {
      face1 = this.state.face1Num
      selection = 0
      face2 = this.state.face2Num
    } else if(this.state.type === "flip-normal" && this.state.onChangeFlipMode === "selection") {
      face1 = this.state.face1Num
      selection = this.state.selection
      face2 = this.state.face2Num
    } else if(this.state.type === "none") {
      face1 = this.state.face1Num
      selection = 0
      face2 = 0
    } else if(this.state.type === "share") {
      face1 =  this.state.face1Num
      selection = 0
      face2 = 0
    }

    console.log('name:', this.state.name)
    console.log('type:', this.state.type)
    console.log('flip_mode_detail:', this.state.onChangeFlipMode)
    console.log('face1:',face1)
    console.log('selection:',selection)
    console.log('face2:', face2)


    this.addCardType({name:this.state.name, type:this.state.type, face1:face1, face2:face2, selection:selection})

    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  addCardType =(value) => {
    console.log('---------------------????',value)
    const book_id = sessionStorage.getItem("book_id")
    axios.post('api/cardtype/create-cardtype',{
      book_id:book_id,
      name: value.name,
      type: value.type,
      face1: value.face1,
      face2: value.face2,
      selection: value.selection,
    }).then(res => {
      console.log(res.data)
      this.props.updateCardTypeState(res.data.cardtypes)
    })
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      type: e.target.value,
    });
  };

  noneStudyOnchange = e => {
    console.log('noneStudyOnchange checked', e.target.value);
    this.setState({
      type: e.target.value,
    });
  };

  shareStudyOnchange = e => {
    console.log('shareStudyOnchange checked', e.target.value);
    this.setState({
      type: e.target.value,
    });
  };

  onChangeFace1 = e => {
    console.log('face1', e);
    this.setState({
      face1Num: e,
    });
  };

  onChangeFace2 = e => {
    console.log('face2', e);
    this.setState({
      face2Num: e,
    });
  };
  onChangeName = e => {
    console.log('onChangeName', e.target.value);
    this.setState({
      name: e.target.value,
    });
  };

  onChangeFlipMode = e => {
    console.log('onChangeFlipMode', e.target.value);
    this.setState({
      onChangeFlipMode: e.target.value,
    });
  };
  onChangeSelection = e => {
    console.log('onChangeSelection', e);
    this.setState({
      selection: e,
    });
  };

  render() {
    const radioStyle = {
      display: 'block',
      // height: '30px',
      lineHeight: '30px',
      fontSize:"11px",
      alignItems:"center",
      top:"2px"
    };
    
    return (
      <>
        <Button size={'small'} onClick={this.showModal} >??? ?????? ????????? ??????</Button>
        <Modal
          title="????????? ?????????"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='?????????'
          cancelText='??????'
          maskClosable={false}
          width={700}
        >
          <div className="new_card_templete_container" style={{fontSize:"11px", display:"flex", alignItems:"flex-start", justifyContent:"space-evenly"}}>
            <div style={{width:"30%"}}>
                <div style={{display:"flex", alignItems:"center", marginBottom:"10px"}}>
                  <span style={{display:"inline-block",fontSize:"11px",paddingLeft:"5px",lineHeight:"20px",width:"100px",height:"20px", backgroundColor:"skyblue"}}>???????????? ??????</span>
                  <span style={{width:"0", height:"0", display:"inline-block",borderTop:"10px solid transparent", borderBottom:"10px solid transparent", borderLeft:"15px solid skyblue"}}></span>                
                </div>
                <Input size="small" onChange={this.onChangeName} value={this.state.name} style={{width:"150px", fontSize:"11px"}}placeholder="????????? ???????????????"/>
            </div>
            <ul style={{width:"30%"}}>
              <li>
                <div style={{display:"flex", alignItems:"center", marginBottom:"10px"}}>
                  <span style={{display:"inline-block",fontSize:"11px",paddingLeft:"5px",lineHeight:"20px",width:"100px",height:"20px", backgroundColor:"skyblue"}}>???????????? ??????</span>
                  <span style={{width:"0", height:"0", display:"inline-block",borderTop:"10px solid transparent", borderBottom:"10px solid transparent", borderLeft:"15px solid skyblue"}}></span>                
                </div>
                <Radio.Group onChange={this.onChange} style={{fontSize:"11px", height:"100%"}} defaultValue={this.state.type}>
                <Radio style={radioStyle} value='read'>
                  <span style={{marginRight:"10px"}}>?????? - ????????????</span>
                    <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
                <Radio style={radioStyle} value='flip-normal'>
                  <span style={{marginRight:"10px"}}>?????? - ???????????????</span>
                  <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                    {this.state.type === "flip-normal" ? 
                      <div style={{marginLeft:"20px"}}>
                          <Radio.Group onChange={this.onChangeFlipMode} value={this.state.onChangeFlipMode}>
                            <Radio style={radioStyle} value="normal">????????? ??????</Radio>
                            <Radio style={radioStyle} value="selection">????????? ??????</Radio>
                          </Radio.Group>
                      </div> :  <div style={{marginLeft:"20px"}}>
                          <Radio.Group disabled>
                            <Radio style={radioStyle} value="normal">????????? ??????</Radio>
                            <Radio style={radioStyle} value="selection">????????? ??????</Radio>
                          </Radio.Group>
                      </div>}
                </Radio>
                <Radio style={{...radioStyle, marginTop:"-25px"}} onChange={this.noneStudyOnchange} value='none'>
                  <span style={{marginRight:"10px"}}>?????? - ???????????????</span>
                  <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
                <Radio style={radioStyle} onChange={this.shareStudyOnchange} value='share'>
                  <span style={{marginRight:"10px"}}>?????? - ??????????????????</span>
                  <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
              </Radio.Group>
              </li>
            </ul>
            
            <div style={{width:"30%"}}>
              <div style={{display:"flex", alignItems:"center", marginBottom:"10px"}}>
                <span style={{display:"inline-block",fontSize:"11px",paddingLeft:"5px",lineHeight:"20px",width:"100px",height:"20px", backgroundColor:"skyblue"}}>??? ?????? ??????</span>
                <span style={{width:"0", height:"0", display:"inline-block",borderTop:"10px solid transparent", borderBottom:"10px solid transparent", borderLeft:"15px solid skyblue"}}></span>                
              </div>
                <ul>
                  <Space direction="vertical">
                    <li>
                      <span>?????? - ??? ??????</span><InputNumber value={this.state.face1Num} onChange={this.onChangeFace1} size="small" style={{width:"100px", fontSize:"11px", marginLeft:"10px"}}placeholder="?????? 5???"/>
                    </li>
                    {this.state.onChangeFlipMode === "selection" && this.state.type !== "none" && this.state.type !== "share" && this.state.type !== "read"  ? 
                    <li>
                    <span>?????? - ?????? ??????</span><InputNumber value={this.state.selection} onChange={this.onChangeSelection} size="small" style={{width:"100px", fontSize:"11px", marginLeft:"10px"}}/>
                  </li>  : null}
                  {this.state.type === "flip-normal" && this.state.type !== "none" && this.state.type !== "share" ? 
                    <li>
                    <span>?????? - ??? ??????</span><InputNumber value={this.state.face2Num} onChange={this.onChangeFace2} size="small" style={{width:"100px", fontSize:"11px", marginLeft:"10px"}}placeholder="?????? 5???"/>
                  </li>  : null}

                  {this.state.type === "read" && <li>
                    <div style={{fontStyle:"italic", fontSize:"11px", marginLeft:"20px"}}>??? ??????????????? ???????????? ??? ???????????????.</div>
                  </li> }

                  {this.state.type === "flip-normal" && <li>
                    <div style={{fontStyle:"italic", fontSize:"11px", marginLeft:"20px"}}>??? ?????????????????? ???????????? ????????? ???????????????. ????????? ????????? ???????????? ????????? ??????????????? ???????????? ??? ????????????.</div>
                  </li>}
                  
                  {this.state.type === "none" &&  <li>
                    <div style={{fontStyle:"italic", fontSize:"11px", marginLeft:"20px"}}>??? ?????????????????? ????????? ????????? ?????????????????????. ??????????????? ... ????????? ???????????? ??? ????????????.</div>
                  </li>}
                  
                  {this.state.type === "share" && <li>
                    <div style={{fontStyle:"italic", fontSize:"11px", marginLeft:"20px"}}>??? ????????????????????? ?????????????????????. ??? ????????? ???????????? 1?????? ????????? ?????? ????????? ???????????? ??? ????????????.</div>
                  </li> }
                 </Space>
                </ul>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default NewCardTemplete;