import React, { Component } from 'react';
import { Form, Modal, InputNumber, Input, Switch,Select } from 'antd';
import DefaultButton from '../../styledComponents/defaultButton'
const { Option } = Select;

class StudySettingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  onChange = (checked) => {
    console.log(`switch to ${checked}`);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const title = `학습설정 - ${this.props.info.book_title}`
    const style = {
      width:"700px",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"baseline", 
      fontSize:"12px"
    }
    const validateMessages = {
      required: `is required!`,
      types: {
        email: `is not a valid email!`,
        number: `is not a valid number!`,
      },
      number: {
        range: ` must be between  and `,
      },
    };
    console.log('hello there?:', this.props.studySetting)
    if(this.props.studySetting.book_id){
      var setting = this.props.studySetting
      var exp_setting_data = setting.exp_setting
      var difficulty_setting_data = setting.difficulty_setting
      var lev_setting_data = setting.lev_setting
      var initialValues = {
        book_id:this.props.info.book_id,
        exp_setting: {
            one_time: exp_setting_data.one_time,
            two_times:exp_setting_data.two_times,
            three_times:exp_setting_data.three_times,
            four_times:exp_setting_data.four_times,
            five_times:exp_setting_data.five_times,
        },
        difficulty_setting: {
          lev_1: {
            time_unit:difficulty_setting_data.lev_1.time_unit,
            nick:difficulty_setting_data.lev_1.nick,
            hot_key:difficulty_setting_data.lev_1.hot_key,
            interval:difficulty_setting_data.lev_1.interval,
            on_off:difficulty_setting_data.lev_1.on_off,
          },
          lev_2: {
            time_unit:difficulty_setting_data.lev_2.time_unit,
            nick:difficulty_setting_data.lev_2.nick,
            hot_key:difficulty_setting_data.lev_2.hot_key,
            interval:difficulty_setting_data.lev_2.interval,
            on_off:difficulty_setting_data.lev_2.on_off,
          },
          lev_3: {
            time_unit:difficulty_setting_data.lev_3.time_unit,
            nick:difficulty_setting_data.lev_3.nick,
            hot_key:difficulty_setting_data.lev_3.hot_key,
            interval:difficulty_setting_data.lev_3.interval,
            on_off:difficulty_setting_data.lev_3.on_off,
          },
          lev_4: {
            time_unit:difficulty_setting_data.lev_4.time_unit,
            nick:difficulty_setting_data.lev_4.nick,
            hot_key:difficulty_setting_data.lev_4.hot_key,
            interval:difficulty_setting_data.lev_4.interval,
            on_off:difficulty_setting_data.lev_4.on_off,
          },
          lev_5: {
            nick:difficulty_setting_data.lev_5.nick,
            hot_key:difficulty_setting_data.lev_5.hot_key,
          }
        },
        lev_setting: {
          lev_1: {
            time_unit:lev_setting_data.lev_1.time_unit,
            interval:lev_setting_data.lev_1.interval,
          },
          lev_2: {
            time_unit:lev_setting_data.lev_2.time_unit,
            interval:lev_setting_data.lev_2.interval,
          },
          lev_3: {
            time_unit:lev_setting_data.lev_3.time_unit,
            interval:lev_setting_data.lev_3.interval,
          },
          lev_4: {
            time_unit:lev_setting_data.lev_4.time_unit,
            interval:lev_setting_data.lev_4.interval,
          },
          lev_5: {
            time_unit:lev_setting_data.lev_5.time_unit,
            interval:lev_setting_data.lev_5.interval,
          },
          lev_6: {
            time_unit:lev_setting_data.lev_6.time_unit,
            interval:lev_setting_data.lev_6.interval,
          },
          lev_7: {
            time_unit:lev_setting_data.lev_7.time_unit,
            interval:lev_setting_data.lev_7.interval,
          },
          lev_8: {
            time_unit:lev_setting_data.lev_8.time_unit,
            interval:lev_setting_data.lev_8.interval,
          },
          lev_9: {
            time_unit:lev_setting_data.lev_9.time_unit,
            interval:lev_setting_data.lev_9.interval,
          },
          lev_10: {
            time_unit:lev_setting_data.lev_10.time_unit,
            interval:lev_setting_data.lev_10.interval,
          }
        },
      }
      var name = this.props.info.book_id
    } else {
      console.log("initialvaue : null")
      initialValues = null
      name = this.props.info.book_id
    }
    if(this.props.info.book_id === this.props.studySetting.book_id){
      var turn_on = this.props.isModalVisible.visible
    }
    return (
      <>
      <Modal
        title={title}
        width={800}
        visible={turn_on}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >

        <div className="study_setting_container" style={{width:"800px"}}>
        <Form initialValues={initialValues} 
              name={name} 
              onFinish={this.props.onFinish} 
              validateMessages={validateMessages}>
            <ul>
              <li>
                <div>경험치 획득설정</div>
                <div>알겠음 블라블라........</div>
              </li>
              <li style={{display:"flex", flexDirection:"column"}}>
                이전 경험치 획득 후 .... 블라블라
                <div>
                <Form.Item name={['exp_setting', 'one_time']} label="알겠음 한방에" rules={[{ required: true }]}>
                  <InputNumber size="small" style={{width:"80px"}}type="number"/>
                </Form.Item>
                <Form.Item name={['book_id']} label="book_id" style={{width:"80px", display:"none"}}>
                  <Input size="small" />
                </Form.Item>
                </div>
                <div>
                <Form.Item name={['exp_setting', 'two_times']} label="알겠음 2방에" rules={[{ required: true }]}>
                  <InputNumber size="small" style={{width:"80px"}}type="number"/>
                </Form.Item>
                </div>
                <div>
                <Form.Item name={['exp_setting', 'three_times']} label="알겠음 3방에" rules={[{ required: true }]}>
                  <InputNumber size="small" style={{width:"80px"}}type="number"/>
                </Form.Item>
                </div>
                <div>
                <Form.Item name={['exp_setting', 'four_times']} label="알겠음 4방에" rules={[{ required: true }]}>
                  <InputNumber size="small" style={{width:"80px"}}type="number"/>
                </Form.Item>
                </div>
                <div>
                <Form.Item name={['exp_setting', 'five_times']} label="알겠음 5방이상" rules={[{ required: true }]}>
                  <InputNumber size="small" style={{width:"80px"}}type="number"/>
                </Form.Item>
                </div>
              </li>
              <li>

                <div>
                  <ul style={style}>
                    <li style={{width:"100px", fontSize:"11px"}}>난이도버튼</li>
                    <li style={{width:"30px", fontSize:"11px"}}>사용</li>
                    <li style={{width:"120px", fontSize:"11px"}}>별칭</li>
                    <li style={{width:"50px", fontSize:"11px"}}>단축키</li>
                    <li style={{width:"50px", fontSize:"11px"}}>화살표</li>
                    <li style={{width:"200px", fontSize:"11px"}}>다음복습까지 시간</li>
                  </ul>
                </div>

                <div>
                  <ul style={style}>
                    <li><DefaultButton width="100px" size="small">모르겠음</DefaultButton></li>
                    <li style={{width:"30px"}}></li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_1','nick']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"120px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_1','hot_key']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"50px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li style={{width:"50px"}}>화살표</li>
                    <li style={{width:"200px", display:"flex"}}>
                    <Form.Item name={['difficulty_setting', 'lev_1','interval']} rules={[{ required: true }]}>
                        <InputNumber size="small" style={{width:"50px", fontSize:"12px"}} />
                    </Form.Item> 
                    <Form.Item name={['difficulty_setting', 'lev_1','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px", fontSize:"12px"}}>
                        <Option value="min">분</Option>
                        <Option value="hour">시간</Option>
                      </Select> 
                    </Form.Item>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={style}>
                    <li><DefaultButton width="100px" size="small">거의모르겠음</DefaultButton></li>
                    <li style={{width:"30px"}}>
                      <Form.Item name={['difficulty_setting', 'lev_2','on_off']} valuePropName="checked" rules={[{ required: true }]}>
                        <Switch size="small" />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_2','nick']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"120px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_2','hot_key']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"50px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li style={{width:"50px"}}>화살표</li>
                    <li style={{width:"200px", display:"flex"}}>
                    <Form.Item name={['difficulty_setting', 'lev_2','interval']} rules={[{ required: true }]}>
                        <InputNumber size="small" style={{width:"50px", fontSize:"12px"}} />
                    </Form.Item> 
                    <Form.Item name={['difficulty_setting', 'lev_2','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px", fontSize:"12px"}}>
                        <Option value="min">분</Option>
                        <Option value="hour">시간</Option>
                      </Select> 
                    </Form.Item>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={style}>
                    <li><DefaultButton width="100px" size="small">애매함</DefaultButton></li>
                    <li style={{width:"30px"}}>
                      <Form.Item name={['difficulty_setting', 'lev_3','on_off']} valuePropName="checked" rules={[{ required: true }]}>
                        <Switch size="small" />
                      </Form.Item></li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_3','nick']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"120px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_3','hot_key']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"50px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li style={{width:"50px"}}>화살표</li>
                    <li style={{width:"200px", display:"flex"}}>
                    <Form.Item name={['difficulty_setting', 'lev_3','interval']} rules={[{ required: true }]}>
                        <InputNumber size="small" style={{width:"50px", fontSize:"12px"}} />
                    </Form.Item> 
                    <Form.Item name={['difficulty_setting', 'lev_3','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px", fontSize:"12px"}}>
                        <Option value="min">분</Option>
                        <Option value="hour">시간</Option>
                      </Select> 
                    </Form.Item>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={style}>
                    <li><DefaultButton width="100px" size="small">거의알겠음</DefaultButton></li>
                    <li style={{width:"30px"}}>
                      <Form.Item name={['difficulty_setting', 'lev_4','on_off']} valuePropName="checked" rules={[{ required: true }]}>
                        <Switch size="small" />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_4','nick']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"120px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_4','hot_key']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"50px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li style={{width:"50px"}}>화살표</li>
                    <li style={{width:"200px", display:"flex"}}>
                    <Form.Item name={['difficulty_setting', 'lev_4','interval']} rules={[{ required: true }]}>
                        <InputNumber size="small" style={{width:"50px", fontSize:"12px"}} />
                    </Form.Item> 
                    <Form.Item name={['difficulty_setting', 'lev_4','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px", fontSize:"12px"}}>
                        <Option value="min">분</Option>
                        <Option value="hour">시간</Option>
                      </Select> 
                    </Form.Item>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={style}>
                    <li><DefaultButton width="100px" size="small">알겠음</DefaultButton></li>
                    <li style={{width:"30px"}}></li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_5','nick']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"120px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li>
                      <Form.Item name={['difficulty_setting', 'lev_5','hot_key']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"50px", fontSize:"12px"}} />
                      </Form.Item>
                    </li>
                    <li style={{width:"50px"}}>화살표</li>
                    <li style={{width:"200px", display:"flex"}}>
                      장기복습주기에 따름
                    {/* <Form.Item name={['difficulty_setting', 'lev_5','interval']} rules={[{ required: true }]}>
                        <InputNumber size="small" style={{width:"50px"}} />
                    </Form.Item> 
                    <Form.Item name={['difficulty_setting', 'lev_5','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="min">분</Option>
                        <Option value="hour">시간</Option>
                      </Select> 
                    </Form.Item> */}
                    </li>
                  </ul>
                </div>

              </li>
              <li>
                <div>레벨업 및 다음 복습까지 대기 기간 설정</div>
                <table>
                  <thead>
                    <tr>
                      <td>레벨</td><td>레벨업 경험치</td><td>복습대기</td>   
                    </tr>        
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td><td>1000Exp</td>
                    <td>
                      <Form.Item name={['lev_setting', 'lev_1','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item> 
                    </td>
                    <td><Form.Item name={['lev_setting', 'lev_1','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                      <td>2</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_2','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_2','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                  <tr>
                      <td>3</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_3','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_3','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>4</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_4','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_4','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>5</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_5','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_5','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>6</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_6','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_6','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>7</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_7','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_7','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>8</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_8','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_8','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>9</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_9','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_9','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
                  <tbody>
                      <tr><td>10</td><td>1000Exp</td><td><Form.Item name={['lev_setting', 'lev_10','interval']} rules={[{ required: true }]}>
                        <Input size="small" style={{width:"100px"}}/>
                      </Form.Item></td><td><Form.Item name={['lev_setting', 'lev_10','time_unit']} rules={[{ required: true }]} >
                      <Select size="small" style={{width:"80px"}}>
                        <Option value="hour">시간</Option>
                        <Option value="day">일</Option>
                      </Select> 
                    </Form.Item></td></tr>
                  </tbody>
              </table>
              </li>
            </ul>
            <Form.Item >
              <DefaultButton type="primary" onClick={this.props.handleCancel}>
                취소
              </DefaultButton>
              <DefaultButton type="primary" onClick={this.props.handleOk} htmlType="submit">
                적용
              </DefaultButton>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      </>
    );
  }
}

export default StudySettingModal;

