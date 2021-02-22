import React, { Component } from 'react';
import { Modal, DatePicker, Space, InputNumber, Switch, Form,Checkbox,Radio} from 'antd'
import './AdvancedFilterModal.css'
import Button from '../../styledComponents/defaultButton'
import moment from 'moment';

const { RangePicker } = DatePicker;

class AdvancedFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      andOr : true,
      userFlagOnchange : false,
      makerFlagOnchange : false,
      recentStudyOnchange : false,
      cardLevelOnchange : false,
      studyTimesOnchange : false,
      difficultyOnchange : false,
      examResultOnchange : false,

      userFlagGroupOnchange : false,
      makerFlagGroupOnchange : false,
      recentStudyGroupOnchange : false,
      cardLevelGroupOnchange : false,
      studyTimesGroupOnchange : false,
      difficultyGroupOnchange : false,
      examResultGroupOnchange : false,

      value_for_difficulty:[]
     };
  }
  onFinish = (values) => {
    console.log('advanced_filter before sessionstorage', values)
    values.recent_study_time_gap = this.props.advanced_filter.recent_study_time_gap
    sessionStorage.setItem('advanced_filter', JSON.stringify(values))
    // const user_flag_group = this.state.userFlagGroupOnchange
    this.props.handleOk(values)
    
  }
  andOrChange = () =>{
    this.setState((prevState)=>({
      andOr:!prevState.andOr
    }))
  }
  userFlagOnchange = () =>{
    this.setState((prevState)=>({
      userFlagOnchange:!prevState.userFlagOnchange
    }))
  }
  makerFlagOnchange = () =>{
    this.setState((prevState)=>({
      makerFlagOnchange:!prevState.makerFlagOnchange
    }))
  }
  recentStudyOnchange = () =>{
    this.setState((prevState)=>({
      recentStudyOnchange:!prevState.recentStudyOnchange
    }))
  }
  cardLevelOnchange = () =>{
    this.setState((prevState)=>({
      cardLevelOnchange:!prevState.cardLevelOnchange
    }))
  }
  studyTimesOnchange = () =>{
    this.setState((prevState)=>({
      studyTimesOnchange:!prevState.studyTimesOnchange
    }))
  }
  difficultyOnchange = () =>{
    this.setState((prevState)=>({
      difficultyOnchange:!prevState.difficultyOnchange
    }))
  }
  examResultOnchange = () =>{
    this.setState((prevState)=>({
      examResultOnchange:!prevState.examResultOnchange
    }))
  }

  userFlagGroupOnchange = () =>{
    console.log(this.state.userFlagGroupOnchange)
    this.setState((prevState)=>({
      userFlagGroupOnchange:!prevState.userFlagGroupOnchange
    }))
  }
  makerFlagGroupOnchange = () =>{
    this.setState((prevState)=>({
      makerFlagGroupOnchange:!prevState.makerFlagGroupOnchange
    }))
  }
  recentStudyGroupOnchange = () =>{
    this.setState((prevState)=>({
      recentStudyGroupOnchange:!prevState.recentStudyGroupOnchange
    }))
  }
  cardLevelGroupOnchange = () =>{
    this.setState((prevState)=>({
      cardLevelGroupOnchange:!prevState.cardLevelGroupOnchange
    }))
  }
  studyTimesGroupOnchange = () =>{
    this.setState((prevState)=>({
      studyTimesGroupOnchange:!prevState.studyTimesGroupOnchange
    }))
  }
  difficultyGroupOnchange = () =>{
    this.setState((prevState)=>({
      difficultyGroupOnchange:!prevState.difficultyGroupOnchange
    }))
  }
  examResultGroupOnchange = () =>{
    this.setState((prevState)=>({
      examResultGroupOnchange:!prevState.examResultGroupOnchange
    }))
  }
  render() {
    const dateFormat = 'YYYY-MM-DD';

    if(this.state.andOr === true){
      var andOr = "Or그룹"
    } else {
      andOr = "And그룹"
    }
    const user_flag_option = [
      { label: '플래그없음', value: '0' },
      { label: '플래그1', value: '1' },
      { label: '플래그2', value: '2' },
      { label: '플래그3', value: '3' },
      { label: '플래그4', value: '4' },
      { label: '플래그5', value: '5' },
        ]
    const maker_flag_option = [
      { label: '플래그없음', value: '0' },
      { label: 'X1', value: '1' },
      { label: 'X2', value: '2' },
      { label: 'X3', value: '3' },
      { label: 'X4', value: '4' },
      { label: 'X5', value: '5' },
        ]
    const difficulty_option = [
      { label: '결과없음', value: 'none' },
      { label: '모르겠음', value: 'diffi1' },
      { label: '거의모르겠음', value: 'diffi2' },
      { label: '애매함', value: 'diffi3' },
      { label: '거의알겠음', value: 'diffi4' },
      { label: '알겠음', value: 'diffi5' },
        ]
    const exam_option = [
      { label: '결과없음', value: 'none' },
      { label: '맞음', value: 'right' },
      { label: '틀림', value: 'wrong' },
        ]
    
    if(this.state.userFlagGroupOnchange){
      var selectedCss = "#1890ff"
      var fontColor = "white"
      var fontWeight = "700"
    } else {
      selectedCss = "white"
      fontColor = "black"
      fontWeight = "400"
    }
    if(this.state.makerFlagGroupOnchange){
      var selectedCss2 = "#1890ff"
      var fontColor2 = "white"
      var fontWeight2 = "700"
    } else {
      selectedCss2 = "white"
      fontColor2 = "black"
      fontWeight2 = "400"
    }
    if(this.state.recentStudyGroupOnchange){
      var selectedCss3 = "#1890ff"
      var fontColor3 = "white"
      var fontWeight3 = "700"
    } else {
      selectedCss3 = "white"
      fontColor3 = "black"
      fontWeight3 = "400"
    }
    if(this.state.cardLevelGroupOnchange){
      var selectedCss4 = "#1890ff"
      var fontColor4 = "white"
      var fontWeight4 = "700"
    } else {
      selectedCss4 = "white"
      fontColor4 = "black"
      fontWeight4 = "400"
    }
    if(this.state.studyTimesGroupOnchange){
      var selectedCss5 = "#1890ff"
      var fontColor5 = "white"
      var fontWeight5 = "700"
    } else {
      selectedCss5 = "white"
      fontColor5 = "black"
      fontWeight5 = "400"
    }
    if(this.state.difficultyGroupOnchange){
      var selectedCss6 = "#1890ff"
      var fontColor6 = "white"
      var fontWeight6 = "700"
    } else {
      selectedCss6 = "white"
      fontColor6 = "black"
      fontWeight6 = "400"
    }
    if(this.state.examResultGroupOnchange){
      var selectedCss7 = "#1890ff"
      var fontColor7 = "white"
      var fontWeight7 = "700"
    } else {
      selectedCss7 = "white"
      fontColor7 = "black"
      fontWeight7 = "400"
    }
    
    if(this.props.advanced_filter){
      console.log("고급필터:", this.props.advanced_filter)
      var filter = this.props.advanced_filter

      var mode = filter.mode

      var user_flag_on_off = filter.user_flag_on_off
      var user_flag_group = filter.user_flag_group
      var user_flag_value = filter.user_flag_value

      var maker_flag_on_off = filter.maker_flag_on_off
      var maker_flag_group = filter.maker_flag_group
      var maker_flag_value = filter.maker_flag_value

      var recent_study_time_on_off = filter.recent_study_time_on_off
      var recent_study_time_group = filter.recent_study_time_group
      var recent_study_time_value = filter.recent_study_time_value
      var low = recent_study_time_value[0]
      var high = recent_study_time_value[1]

      var level_on_off = filter.level_on_off
      var level_group = filter.level_group
      var level_value = filter.level_value
      var level_from = level_value[0]
      var level_to = level_value[1]

      var study_times_on_off = filter.study_times_on_off
      var study_times_group = filter.study_times_group
      var study_times_value = filter.study_times_value
      var study_times_from = study_times_value[0]
      var study_times_to = study_times_value[1]

      var difficulty_on_off = filter.difficulty_on_off
      var difficulty_group = filter.difficulty_group
      var difficulty_value = filter.difficulty_value

      var test_result_on_off = filter.test_result_on_off
      var test_result_group = filter.test_result_group
      var test_result_value = filter.test_result_value

    
    } else {
      mode = ''

      user_flag_on_off = ''
      user_flag_group = ''
      user_flag_value = ''

      maker_flag_on_off = ''
      maker_flag_group = ''
      maker_flag_value = ''

      recent_study_time_on_off = ''
      recent_study_time_group = ''
      recent_study_time_value = ''
      low = ''
      high = ''

      level_on_off = ''
      level_group = ''
      level_value = ''
      level_from = ''
      level_to = ''

      study_times_on_off = ''
      study_times_group = ''
      study_times_value = ''
      study_times_from = ''
      study_times_to = ''

      difficulty_on_off = ''
      difficulty_group = ''
      difficulty_value = ''

      test_result_on_off = ''
      test_result_group = ''
      test_result_value = ''
    }
    
    return (
      <>
        <Modal title="고급필터" width={650} className="advanced_filter_modal" visible={this.props.modalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>

      {/* {this.props.advanced_filter && <> */}
      <div className="advanced_filter_container" style={{fontSize:"12px"}}>
        <ul style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
        <Form
        name="advanced_settings"
        initialValues={{
          mode,
          user_flag_on_off,
          user_flag_group,
          user_flag_value,
          maker_flag_on_off,
          maker_flag_group,
          maker_flag_value,
          recent_study_time_on_off,
          recent_study_time_group,
          recent_study_time_value:[moment(low, dateFormat), moment(high, dateFormat)],
          level_on_off,
          level_group,
          level_from,
          level_to,
          study_times_on_off,
          study_times_group,
          study_times_from,
          study_times_to,
          difficulty_on_off,
          difficulty_group,
          difficulty_value,
          test_result_on_off,
          test_result_group,
          test_result_value,
          
        }}
        onFinish={this.onFinish}
        size="small"
      >
          <li>
            <span>필터계산</span>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", minHeight:"30px", backgroundColor:"white"}}>
              {/* And ON & Or Grouping */}
              {this.state.andOr ? <span style={{color:"blue"}}>({this.state.userFlagOnchange ? <>{this.state.userFlagGroupOnchange && <span> 사용자플래그 or </span>}</>:''}
                                    {this.state.makerFlagOnchange ? <>{this.state.makerFlagGroupOnchange && <span> 제작자플래그 or </span>}</>:''}
                                    {this.state.recentStudyOnchange ? <>{this.state.recentStudyGroupOnchange && <span> 최근학습시점 or </span>}</>:''}
                                    {this.state.cardLevelOnchange ? <>{this.state.cardLevelGroupOnchange && <span> 카드레벨 or </span>}</>:''}
                                    {this.state.studyTimesOnchange ? <>{this.state.studyTimesGroupOnchange && <span> 학습횟수 or </span>}</>:''}
                                    {this.state.difficultyOnchange ? <>{this.state.difficultyGroupOnchange && <span> 최근선택한난이도 or </span>}</>:''}
                                    {this.state.examResultOnchange ? <>{this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}) and
                                    </span>:''}
              {/* And ON & Or Not Grouping */}
              {this.state.andOr ? <span style={{color:"red"}}>{this.state.userFlagOnchange ? <>{!this.state.userFlagGroupOnchange && <span> 사용자플래그 and </span>}</>:''}
                                    {this.state.makerFlagOnchange ? <>{!this.state.makerFlagGroupOnchange && <span> 제작자플래그 and </span>}</>:''}
                                    {this.state.recentStudyOnchange ? <>{!this.state.recentStudyGroupOnchange && <span> 최근학습시점 and </span>}</>:''}
                                    {this.state.cardLevelOnchange ? <>{!this.state.cardLevelGroupOnchange && <span> 카드레벨 and </span>}</>:''}
                                    {this.state.studyTimesOnchange ? <>{!this.state.studyTimesGroupOnchange && <span> 학습횟수 and </span>}</>:''}
                                    {this.state.difficultyOnchange ? <>{!this.state.difficultyGroupOnchange && <span> 최근선택한난이도 and </span>}</>:''}
                                    {this.state.examResultOnchange ? <>{!this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}
                                    </span>:''}

              {/* And ON & Or Grouping */}
              {this.state.andOr === false ? <span style={{color:"blue"}}>({this.state.userFlagOnchange ? <>{this.state.userFlagGroupOnchange && <span> 사용자플래그 and </span>}</>:''}
                                    {this.state.makerFlagOnchange ? <>{this.state.makerFlagGroupOnchange && <span> 제작자플래그 and </span>}</>:''}
                                    {this.state.recentStudyOnchange ? <>{this.state.recentStudyGroupOnchange && <span> 최근학습시점 and </span>}</>:''}
                                    {this.state.cardLevelOnchange ? <>{this.state.cardLevelGroupOnchange && <span> 카드레벨 and </span>}</>:''}
                                    {this.state.studyTimesOnchange ? <>{this.state.studyTimesGroupOnchange && <span> 학습횟수 and </span>}</>:''}
                                    {this.state.difficultyOnchange ? <>{this.state.difficultyGroupOnchange && <span> 최근선택한난이도 and </span>}</>:''}
                                    {this.state.examResultOnchange ? <>{this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}) or
                                    </span>:''}
              {/* And ON & Or Not Grouping */}
              {this.state.andOr === false ? <span style={{color:"red"}}>{this.state.userFlagOnchange ? <>{!this.state.userFlagGroupOnchange && <span> 사용자플래그 or </span>}</>:''}
                                    {this.state.makerFlagOnchange ? <>{!this.state.makerFlagGroupOnchange && <span> 제작자플래그 or </span>}</>:''}
                                    {this.state.recentStudyOnchange ? <>{!this.state.recentStudyGroupOnchange && <span> 최근학습시점 or </span>}</>:''}
                                    {this.state.cardLevelOnchange ? <>{!this.state.cardLevelGroupOnchange && <span> 카드레벨 or </span>}</>:''}
                                    {this.state.studyTimesOnchange ? <>{!this.state.studyTimesGroupOnchange && <span> 학습횟수 or </span>}</>:''}
                                    {this.state.difficultyOnchange ? <>{!this.state.difficultyGroupOnchange && <span> 최근선택한난이도 or </span>}</>:''}
                                    {this.state.examResultOnchange ? <>{!this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}
                                    </span>:''}
              
            </div>
            <span>설명</span>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", minHeight:"30px", backgroundColor:"white"}}>
            </div>
          </li>
          <li>
            <Form.Item
              name="mode"
              valuePropName="checked"
            >
              <Radio.Group defaultValue="and" size="small" onChange={this.andOrChange} style={{ marginTop: 16 }}>
                <Radio.Button value="and">AND</Radio.Button>
                <Radio.Button value="or">OR</Radio.Button>
              </Radio.Group>
            </Form.Item>
          
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <Space>
                <span>사용자플래그</span> 
                <Form.Item
                  name="user_flag_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small" onChange={this.userFlagOnchange}/>
                </Form.Item>
                {this.state.userFlagOnchange && <Form.Item
                  name="user_flag_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.userFlagGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
                
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
              <Form.Item
                name="user_flag_value"
              >            
                <Checkbox.Group options={user_flag_option} />
              </Form.Item>
            </div>
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <Space>
                <span>제작자플래그</span> 
                <Form.Item
                  name="maker_flag_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small"  onChange={this.makerFlagOnchange}/>
                </Form.Item>
                {this.state.makerFlagOnchange && <Form.Item
                  name="maker_flag_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.makerFlagGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss2}`, color:`${fontColor2}`, fontWeight:`${fontWeight2}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
                
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
              <Form.Item
                name="maker_flag_value"
              >            
                <Checkbox.Group options={maker_flag_option} />
              </Form.Item>
            </div>
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <Space>
                <span>최근학습시점</span> 
                <Form.Item
                  name="recent_study_time_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small" onChange={this.recentStudyOnchange}/>
                </Form.Item>
                {this.state.recentStudyOnchange && <Form.Item
                  name="recent_study_time_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.recentStudyGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss3}`, color:`${fontColor3}`, fontWeight:`${fontWeight3}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
                
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
            <Form.Item name="recent_study_time_value" >
              <RangePicker 
              // defaultValue={[moment(low, dateFormat), moment(high, dateFormat)]} 
              format={dateFormat}/>
            </Form.Item>
            </div>
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
            <Space>
                <span>카드레벨</span> 
                <Form.Item
                  name="level_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small" onChange={this.cardLevelOnchange}/>
                </Form.Item>
                {this.state.cardLevelOnchange && <Form.Item
                  name="level_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.cardLevelGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss4}`, color:`${fontColor4}`, fontWeight:`${fontWeight4}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex"}}>
              <Form.Item name="level_from" >
                <InputNumber style={{ width: 100, textAlign: 'center' }} />
              </Form.Item>
              ~
              <Form.Item name="level_to" >
                <InputNumber style={{ width: 100, textAlign: 'center' }}  />
              </Form.Item>
            </div>
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
            <Space>
                <span>학습횟수</span> 
                <Form.Item
                  name="study_times_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small" onChange={this.studyTimesOnchange}/>
                </Form.Item>
                {this.state.studyTimesOnchange && <Form.Item
                  name="study_times_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.studyTimesGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss5}`, color:`${fontColor5}`, fontWeight:`${fontWeight5}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
                
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex"}}>
              <Form.Item name="study_times_from" >
                <InputNumber style={{ width: 100, textAlign: 'center' }} />
              </Form.Item>
              ~
              <Form.Item name="study_times_to" >
                <InputNumber style={{ width: 100, textAlign: 'center' }}  />
              </Form.Item>
            </div>
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
            <Space>
                <span>최근선택한난이도</span> 
                <Form.Item
                  name="difficulty_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small" onChange={this.difficultyOnchange}/>
                </Form.Item>
                {this.state.difficultyOnchange && <Form.Item
                  name="difficulty_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.difficultyGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss6}`, color:`${fontColor6}`, fontWeight:`${fontWeight6}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
                
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
            <Form.Item
                name="difficulty_value"
              >            
                <Checkbox.Group options={difficulty_option} />
              </Form.Item>
            </div>
          </li>
          <li>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
            <Space>
                <span>최근시험결과</span> 
                <Form.Item
                  name="test_result_on_off"
                  valuePropName="checked"
                >
                  <Switch size="small" onChange={this.examResultOnchange}/>
                </Form.Item>
                {this.state.examResultOnchange && <Form.Item
                  name="test_result_group"
                  valuePropName="checked"
                >            
                  <Checkbox className="advanced_filter_checkbox" onChange={this.examResultGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss7}`, color:`${fontColor7}`, fontWeight:`${fontWeight7}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                </Form.Item>}
                
              </Space>
            </div>
            <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
            <Form.Item
                name="test_result_value"
              >            
                <Checkbox.Group options={exam_option} />
              </Form.Item>
            </div>
          </li>
          <li>
            <Form.Item
                name="setting_save"
                valuePropName="checked"
              >            
                <Checkbox>다음학습에도 설정한 고급필터 사용하기(해당 책의 학습설정에 저장됩니다.)</Checkbox>
              </Form.Item>
          </li>
          <Button htmlType="submit" width="200px" style={{color:"white", fontWeight:"700", background:"#69d316", height:"50px"}}>적용</Button>
        </Form>
        </ul>
      </div>
    {/* </>} */}
    </Modal>
      </>
    )
  }
}

export default AdvancedFilterModal;