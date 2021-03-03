import React, { Component } from 'react';
import { Tabs } from 'antd';
import { SettingOutlined, DoubleRightOutlined } from '@ant-design/icons';
import PageSetting from './PageSetting'
import CardSetting from './CardSetting'
import FaceSetting from './FaceSetting'
import RowSetting from './RowSetting'
import FontSetting from './FontSetting'
const { TabPane } = Tabs;


class SettingTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'left',
      key:'',
    };
  }

  handleChange =(key) => {
    this.setState({
      key:key
    })
    this.props.onClick(key)
  }

  render() {
    const { mode } = this.state;
    if(this.props.toggle === false) {
      var toggle = <SettingOutlined />
    } else {
      toggle = <DoubleRightOutlined />
    }
    return (
        <Tabs defaultActiveKey={this.state.key} onChange={this.handleChange} type="card" size='small' tabPosition={mode} >
          <TabPane tab={toggle} key="0">
            <PageSetting addCardType={this.props.addCardType}/> {/* dummytab */}
          </TabPane>
          {/* <TabPane tab="페이지설정" key="1">
            <PageSetting addCardType={this.props.addCardType}/>
          </TabPane> */}
          <TabPane tab="카드설정" key="2">
            <CardSetting onCardChangeHandler={this.props.onCardChangeHandler} cardSetting_selected={this.props.cardSetting_selected} getCardTypeList={this.props.getCardTypeList} card_selected={this.props.card_selected} cardType={this.props.cardType}/>
          </TabPane>
          <TabPane tab="면설정" key="3">
            <FaceSetting onFaceChangeHandler={this.props.onFaceChangeHandler} onCardChangeHandler={this.props.onCardChangeHandler} faceSetting_selected={this.props.faceSetting_selected} cardSetting_selected={this.props.cardSetting_selected} getCardTypeList={this.props.getCardTypeList} card_selected={this.props.card_selected} cardType={this.props.cardType}/>
          </TabPane>
          <TabPane tab="행설정" key="4">
            <RowSetting onFaceChangeHandler={this.props.onFaceChangeHandler} faceSetting_selected={this.props.faceSetting_selected} onCardChangeHandler={this.props.onCardChangeHandler} cardSetting_selected={this.props.cardSetting_selected} getCardTypeList={this.props.getCardTypeList} card_selected={this.props.card_selected} cardType={this.props.cardType}/>
          </TabPane>
          <TabPane tab="폰트설정" key="5">
            <FontSetting onFaceChangeHandler={this.props.onFaceChangeHandler} faceSetting_selected={this.props.faceSetting_selected} onCardChangeHandler={this.props.onCardChangeHandler} cardSetting_selected={this.props.cardSetting_selected} getCardTypeList={this.props.getCardTypeList} card_selected={this.props.card_selected} cardType={this.props.cardType}/>
          </TabPane>
        </Tabs>
    );
  }
}


export default SettingTabs;