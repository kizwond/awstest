import React, { Component } from 'react';
import { Radio, Switch,Form, DatePicker, InputNumber } from 'antd';
import './StudyModeTab.css'
import AdvancedFilterModal from './AdvancedFilterModal'
import moment from 'moment';
import Button from '../../styledComponents/defaultButton'

const { RangePicker } = DatePicker;


class FlipModeTab extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible:false,
      study_quantity_change:this.props.study_config.flip_mode.num_cards.on_off
     };
  }
  showModal = () => {
    this.setState({
      modalVisible:true
    });
  };

  handleOk = (values) => {
    console.log('advanced', values)
    this.setState({
      modalVisible:false
    });
    this.props.applyAdvancedFilter()
  };


  handleCancel = () => {
    this.setState({
      modalVisible:false
    });
  };
  
  study_quantity_change =(value) =>{
    console.log(value)
    if(value === true){
      this.setState({
        study_quantity_change : "on"
      })
    } else {
      this.setState({
        study_quantity_change : "off"
      })
    }
  }

  render() {
    if(this.props.study_config){
      console.log(this.props.study_config)
      var options = this.props.study_config.flip_mode
      console.log(options)
      var sort_option = options.sort_option
      if(options.card_on_off.read_card === "on"){
        var read_card = true
      } else {
        read_card = false
      }
      if(options.card_on_off.flip_card === "on"){
        var flip_card = true
      } else {
        flip_card = false
      }
      if(options.status_on_off.yet === "on"){
        var yet = true
      } else {
        yet = false
      }
      if(options.status_on_off.ing === "on"){
        var ing = true
      } else {
        ing = false
      }
      if(options.status_on_off.completed === "on"){
        var completed = true
      } else {
        completed = false
      }
      if(options.status_on_off.hold === "on"){
        var hold = true
      } else {
        hold = false
      }
      var collect_criteria = options.collect_criteria
      if(options.num_cards.on_off === "on"){
        var study_quantity_use_switch = true
      } else {
        study_quantity_use_switch = false
      }
      var yet_card_num = options.num_cards.yet
      var ing_card_num = options.num_cards.ing
      var completed_card_num = options.num_cards.completed
      var hold_card_num = options.num_cards.hold
      var high = options.needstudytime_filter.high
      var low = options.needstudytime_filter.low
    } else {
      sort_option = "standard"
      flip_card = false
      read_card = false
      yet = false
      ing = false
      completed = false
      hold = false
      collect_criteria="all"
      study_quantity_use_switch = false
      yet_card_num = 0
      ing_card_num = 0
      completed_card_num = 0
      hold_card_num = 0
      high = ""
      low = ""
    }

    const dateFormat = 'YYYY-MM-DD';

    return (
      <>
        <div style={{fontSize:"13px", fontWeight:"700"}}>보기순서 정렬</div>
        <Form
          name="settings"
          initialValues={{
            ing_card_self_setting:[moment(low, dateFormat), moment(high, dateFormat)],
            sort_option,
            read_card,
            flip_card,
            yet,
            ing,
            completed,
            hold,
            collect_criteria,
            advanced_filter_mode:false,
            study_quantity_use_switch,
            yet_card_num,
            ing_card_num,
            completed_card_num,
            hold_card_num,
          }}
          onFinish={this.props.onFinish}
          size="small"
          className="read_setting"
        >
          <div style={{border:"1px solid lightgrey", marginBottom:"10px",background:"white", borderRadius:"5px", padding:"5px", textAlign:"left", display:"column", justifyContent:"start"}}>
            <Form.Item
              name="sort_option"
              noStyle
            >
              <Radio.Group style={{display:"flex", flexDirection:"column"}}>
                <Radio value="standard" style={{fontSize:"11px"}}>
                  원본 그대로
                </Radio>
                <Radio value="time" style={{fontSize:"11px"}}>
                  복습시점 빠른 순으로 정렬
                </Radio>
                <Radio value="random" style={{fontSize:"11px"}}>
                  랜덤하게 섞기
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div style={{fontSize:"13px", fontWeight:"700"}}>카드타입설정</div>
          <div style={{height:"60px",border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left", marginBottom:"10px"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
            <span  style={{fontSize:"11px", marginLeft:"20px", marginRight:"5px"}}>읽기카드 </span> 
              <Form.Item
                name="read_card"
                valuePropName="checked"
              >
                <Switch size="small" />
              </Form.Item>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
            <span  style={{fontSize:"11px", marginLeft:"20px", marginRight:"5px"}}>뒤집기카드 </span> 
              <Form.Item
                name="flip_card"
                valuePropName="checked"
              >
                <Switch size="small" />
              </Form.Item>
            </div>
          </div>
          <div style={{fontSize:"13px", fontWeight:"700"}}>필터 설정</div>
          <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
            <div style={{fontSize:"13px", fontWeight:"700"}}>학습상태</div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
            <span style={{fontSize:"11px", marginLeft:"20px", marginRight:"5px"}}>미학습카드 </span>
              <Form.Item
                name="yet"
                valuePropName="checked"
              >
                 <Switch size="small" />
              </Form.Item>
            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
            <span style={{fontSize:"11px", marginLeft:"20px", marginRight:"5px"}}>학습중카드 </span> 
              <Form.Item
                name="ing"
                valuePropName="checked"
              >
                <Switch size="small" />
              </Form.Item>
            </div>

            <div style={{background:"white", padding:"5px"}}>
              <Form.Item
                name="collect_criteria"
              >
                <Radio.Group style={{marginLeft:"30px", display:"flex", flexDirection:"column"}}>
                  <Radio value="all" style={{fontSize:"11px"}}>
                    전체카드
                  </Radio>
                  <Radio value="by_now" style={{fontSize:"11px"}}>
                    금일자정이전 복습필요 카드만
                  </Radio>
                  <Radio value="by_today" style={{fontSize:"11px"}}>
                    현재시간이전 복습필요 카드만
                  </Radio>
                  <Radio value="custom" style={{fontSize:"11px", marginBottom:"5px"}}>
                    복습시점 직접설정
                  </Radio>
                </Radio.Group>
                
              </Form.Item>
              <Form.Item name="ing_card_self_setting" style={{marginLeft:"50px"}}>
                <RangePicker format={dateFormat}/>
              </Form.Item>
            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
            <span style={{fontSize:"11px", marginLeft:"20px", marginRight:"5px"}}>학습완료카드 </span>
              <Form.Item
                name="completed"
                valuePropName="checked"
              >
                 <Switch size="small" />
              </Form.Item>
            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
            <span style={{fontSize:"11px", marginLeft:"20px", marginRight:"5px"}}>학습보류카드 </span>
              <Form.Item
                name="hold"
                valuePropName="checked"
              >
                 <Switch size="small" />
              </Form.Item>
            </div>
            <div style={{marginTop:"10px", display:"flex", flexDirection:"row", alignItems:"baseline"}}>
              <span style={{fontSize:"13px", fontWeight:"700", marginRight:"5px"}}>학습량 설정 </span> 
                <Form.Item
                    name="study_quantity_use_switch"
                    valuePropName="checked"
                  >
                    <Switch onChange={this.study_quantity_change} size="small" />
                </Form.Item>
            </div>
            {this.state.study_quantity_change === "on" && <div style={{fontSize:"11px", marginLeft:"20px"}}>
              <div style={{width:"180px",display:"flex",justifyContent:"space-between", alignItems:"center"}}> 
                <span>미학습카드</span>
                <Form.Item
                      name="yet_card_num"
                    >
                      <InputNumber></InputNumber>
                </Form.Item>
              </div>
              <div style={{width:"180px",display:"flex",justifyContent:"space-between", alignItems:"center"}}> 
                <span>학습중카드</span>
                <Form.Item
                    name="ing_card_num"
                  >
                    <InputNumber></InputNumber>
                </Form.Item>
              </div>
              <div style={{width:"180px",display:"flex",justifyContent:"space-between", alignItems:"center"}}> 
                <span>학습완료카드</span>
                <Form.Item
                    name="completed_card_num"
                  >
                    <InputNumber></InputNumber>
                </Form.Item>
              </div>
              <div style={{width:"180px",display:"flex",justifyContent:"space-between", alignItems:"center"}}> 
                <span>학습보류카드</span>
                <Form.Item
                    name="hold_card_num"
                  >
                    <InputNumber></InputNumber>
                </Form.Item>
              </div>
            </div> }
            <div style={{display:"flex",justifyContent:"flex-end", alignItems:"center", marginTop:"10px"}}> <span style={{marginRight:"5px"}}><Button size="small" onClick={this.showModal}>고급필터</Button></span>
            <Form.Item
                name="advanced_filter_mode"
                valuePropName="checked"
              >
                 <Switch size="small" />
              </Form.Item></div>
            <AdvancedFilterModal applyAdvancedFilter={this.props.applyAdvancedFilter} advanced_filter={this.props.advanced_filter} modalVisible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
          </div>
          <Form.Item>
          <div style={{height:"100px", lineHeight:"100px", marginTop:"10px", textAlign:"center", width:"253px"}}>
            <Button htmlType="submit" width="200px" fontSize="13px" style={{color:"white", background:"#69d316", height:"50px"}}>세션 시작하기</Button>
          </div>
        </Form.Item>
      </Form>
      </>
    );
  }
}

export default FlipModeTab;