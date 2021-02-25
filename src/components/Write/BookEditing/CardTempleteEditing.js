import React, { Component } from 'react';
import { Modal} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import CardTypeSettingTabs from './CardTypeSettingTabs'


class CardTempleteEditing extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible:false,
     };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };



  render() {  
    return (
      <>
        <SettingOutlined onClick={this.showModal}/>
        <Modal
          title="카드 템플릿 관리"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='만들기'
          cancelText='취소'
          maskClosable={false}
          width={900}
        >
            <CardTypeSettingTabs card_type={this.props.card_type}/>
        </Modal>
      </>
    );
  }
}

export default CardTempleteEditing;