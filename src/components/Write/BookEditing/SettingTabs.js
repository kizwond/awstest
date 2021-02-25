import React, { Component } from 'react';
import { Tabs } from 'antd';
import { SettingOutlined, DoubleRightOutlined } from '@ant-design/icons';
import PageSetting from './PageSetting'
import CardSetting from './CardSetting'
import FaceSetting from './FaceSetting'
import RowSetting from './RowSetting'
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
          <TabPane tab="페이지설정" key="1">
            <PageSetting addCardType={this.props.addCardType}/>
          </TabPane>
          <TabPane tab="카드설정" key="2">
            <CardSetting initialValues={this.props.initialValues} card_selected={this.props.card_selected} onCardChangeHandler={this.props.onCardChangeHandler} cardType={this.props.cardType} addCardType={this.props.addCardType}/>
          </TabPane>
          <TabPane tab="면설정" key="3">
            <FaceSetting addCardType={this.props.addCardType}/>
          </TabPane>
          <TabPane tab="행설정" key="4">
            <RowSetting addCardType={this.props.addCardType}/>
          </TabPane>
        </Tabs>
    );
  }
}


export default SettingTabs;