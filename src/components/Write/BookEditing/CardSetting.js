import React, { Component } from 'react';
import { Affix, Collapse, Form, Switch, Select, Input, InputNumber } from 'antd';
import { BoldOutlined,ItalicOutlined,UnderlineOutlined,AlignCenterOutlined,AlignLeftOutlined,AlignRightOutlined } from '@ant-design/icons';
import Button from '../../styledComponents/defaultButton'
import axios from 'axios'

const { Panel } = Collapse;
const { Option } = Select;

class CardSetting extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      card_selected:'',
      initialValues:''
     };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey(){
    return this.keyCount++;
  }

  // getInitialValues = () => {
  //   if(this.props.card_selected){
  //     const direction = []
  //     const margin = []
  //     const padding = []
  //     const background_color = []
  //     const left_right_ratio = []
  //     let initialValues
  //     if(this.props.card_selected){
  //       this.props.cardType.map((value)=>{
  //         if(value._id === this.props.card_selected){
  //           direction.push(value.card_style.card_direction)
  //           margin.push(value.card_style.outer_margin)
  //           padding.push(value.card_style.inner_padding)
  //           background_color.push(value.card_style.background_color)
  //           left_right_ratio.push(value.card_style.left_right_ratio)
  //         }
  //       })
  
  //       if(margin.length > 0){
  //         var top = margin[0].top
  //         var bottom = margin[0].bottom
  //         var left = margin[0].left
  //         var right = margin[0].right
  //       } else {
  //         top = ''
  //         bottom = ''
  //         left = ''
  //         right = ''
  //       }
  
  //       if(padding.length > 0){
  //         var innerPaddingTop = padding[0].top
  //         var innerPaddingBottom = padding[0].bottom
  //         var innerPaddingLeft = padding[0].left
  //         var innerPaddingRight = padding[0].right
  //       } else {
  //         innerPaddingTop = ''
  //         innerPaddingBottom = ''
  //         innerPaddingLeft = ''
  //         innerPaddingRight = ''
  //       }
  
  //       if(background_color.length > 0){
  //         var backgroundColor = background_color[0]
  //       } else {
  //         backgroundColor = background_color[0]
  //       }
  
  //       if(backgroundColor === null){
  //         backgroundColor = "#ffffff"
  //       } else {
  //         backgroundColor = background_color[0]
  //       }
  
  //       if(left_right_ratio.length > 0){
  //         var face1_ratio = left_right_ratio[0].face1
  //         var face2_ratio = left_right_ratio[0].face2
  //       } else {
  //         face1_ratio = left_right_ratio[0].face1
  //         face2_ratio = left_right_ratio[0].face2
  //       }
  
  
  //       initialValues = {
  //         card_direction: direction[0],
  //         outer_margin:{
  //           top,
  //           right,
  //           left,
  //           bottom,
  //         },
  //         inner_padding:{
  //           top:innerPaddingTop,
  //           bottom:innerPaddingBottom,
  //           left:innerPaddingLeft,
  //           right:innerPaddingRight
  //         },
  //         background_color:backgroundColor,
  //         left_right_ratio:{
  //           face1:face1_ratio,
  //           face2:face2_ratio,
  //         }
  //       }
        
  
  //     }
  //     console.log('선택한 카드타입의 기본값 :',initialValues)
  //     this.setState({
  //       initialValues:initialValues
  //     })
  //   }
  // }
  onFinish = (values) => {
    console.log(values)
    values.border.mode = "package"
    values.border.top = {type:null, thickness:null, color:null}
    values.border.bottom = {type:null, thickness:null, color:null}
    values.border.left = {type:null, thickness:null, color:null}
    values.border.right = {type:null, thickness:null, color:null}
    console.log(values)
    axios.post('api/cardtype/update-cardstyle',{
      cardtype_id: this.props.card_selected,
      updated_card_style:values,
      book_id:this.props.cardType[0].book_id
    }).then(res => {
      console.log(res.data)
    })
  }
 
  render() {
    console.log('선택한 카드타입 : ',this.props.card_selected)
    console.log(this.props.initialValues)
    if(this.props.cardType) {
      var cardTypeListOption = this.props.cardType.map((card_type)=>(
        <Option key={this.getKey()} value={card_type._id}>{card_type.name} - ({card_type.type} 카드)</Option>
      ))
      var cardFaceListOption = this.props.cardType.map((card_type)=>{
        if(card_type._id === this.props.card_selected){
          if(card_type.type === 'read'){
            return <><Option value='1면'>1면</Option></>
          } else if(card_type.type === 'flip-normal'){
            return <><Option value='1면'>1면</Option><Option value='2면'>2면</Option></>
          } 
        }
      })
    }

    if(this.props.initialValues){
      console.log(this.props.initialValues)
    }

    return (
      <>
            {/* <Panel header="템플릿 선택" key="1" className="data_collapse_panel">  */}
              <div className="select_card_templete">
                <div className='select_page_size_div'>
                    <div>카드</div>
                    <div>
                      <Select defaultValue="카드선택" size='small' onChange={this.props.onCardChangeHandler} style={{ width: 195 }}>
                        <Option key="default1" value="카드선택">카드선택</Option>
                        {cardTypeListOption}
                      </Select>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>면</div>
                    <div>
                      <Select defaultValue="면선택" size='small' style={{ width: 195 }}>
                        <Option key="default2" value="면선택">면선택</Option>
                        {cardFaceListOption}
                      </Select>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>행</div>
                    <div>
                      <Select defaultValue="행선택" size='small' style={{ width: 195 }}>
                        <Option key="default3" value="행선택">행선택</Option>
                      </Select>
                    </div>
                </div>
              </div>
            {/* </Panel> */}
      
      {this.props.card_selected &&
        <><div className="page_setting_container">
            <Form
              name="settings"
              initialValues={this.props.initialValues}
              onFinish={this.onFinish}
              size="small"
            >
          <Collapse defaultActiveKey={['2','3','4','5','6']} >
            <Panel header="레이아웃" key="2" className="data_collapse_panel">
              <div className="layout_container">
                <div className='select_mode_container'>
                  <div>방향(on)</div>
                  <div>
                    <Form.Item name='card_direction'>
                      <Select size='small' >
                        <Option value="left-right">좌우</Option>
                        <Option value="top-bottom">상하</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='select_mode_container'>
                  <div></div>
                  <div className='layout_example_img'>
                    <img src="img/leftright.png" width='90px' alt="좌우"/>
                    <img src="img/updown.png" width='90px'  alt="상하"/>
                  </div>
                </div>
                <div className='select_mode_container'>
                  <div>면간 비율</div>
                  <div className='layout_ratio'>
                    <div>
                    <Form.Item name={['left_right_ratio', 'face1']}>
                      <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='1면' suffix='%' type="number"/>
                    </Form.Item>
                      
                    </div>
                    <div>
                    <Form.Item name={['left_right_ratio', 'face2']}>
                      <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='2면' suffix='%' type="number"/>
                    </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="카드 배경색" key="3" className="data_collapse_panel">
              <div className="select_card_bg_color_container">
                <div className="select_card_bg_color">
                  <div>배경색</div>
                  <div className="select_card_bg_color_right">
                    <div>
                      <Form.Item name='background_color'>
                        <Input type="color" size='small' style={{ width: 125 }} type="color"/>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="카드 테두리 바깥쪽 여백" key="4" className="data_collapse_panel">
              <div className="select_card_margin">
                <div className="card_margin_top">
                  <Form.Item name={['outer_margin', 'top']}>
                    <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='상' suffix='px' type="number"/>
                  </Form.Item>
                </div>
                <div className="card_margin_mid_container">
                  <div>
                    <Form.Item name={['outer_margin', 'left']}>
                      <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='좌' suffix='px' type="number"/>
                    </Form.Item>
                  </div>
                  <div className="">
                    <img src="img/cardmargin.png" width="100" alt="cardmargin_img"/>
                  </div>
                  <div>
                    <Form.Item name={['outer_margin', 'right']}>
                      <InputNumber size='small' style={{ width: 100,fontSize:10 }}prefix='우' suffix='px' type="number"/>
                    </Form.Item>
                  </div>
                </div>
                <div className="card_margin_bottom">
                  <Form.Item name={['outer_margin', 'bottom']}>
                    <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='하' suffix='px' type="number"/>
                  </Form.Item>
                </div>
              </div>
            </Panel>
            <Panel header="카드 테두리 안쪽 여백" key="5" className="data_collapse_panel_numbering">
              <div className="select_card_margin">
                  <div className="card_margin_top">
                    <Form.Item name={['inner_padding', 'top']}>
                      <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='상' suffix='px' type="number"/>
                    </Form.Item>
                  </div>
                  <div className="card_margin_mid_container">
                    <div>
                      <Form.Item name={['inner_padding', 'left']}>
                        <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='좌' suffix='px' type="number"/>
                      </Form.Item>
                    </div>
                    <div className="">
                      <img src="img/cardpadding.png" width="100" alt="cardpadding_img"/>
                    </div>
                    <div>
                      <Form.Item name={['inner_padding', 'right']}>
                        <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='우' suffix='px' type="number"/>
                      </Form.Item>
                      </div>
                  </div>
                  <div className="card_margin_bottom">
                    <Form.Item name={['inner_padding', 'bottom']}>
                      <InputNumber size='small' style={{ width: 100,fontSize:10 }} prefix='하' suffix='px' type="number"/>
                    </Form.Item>
                  </div>
              </div>
            </Panel>
            <Panel header="카드 테두리" key="6" className="data_collapse_panel_page_top">
              <Switch size="small" className="page_top_toggle" />
              <div className="card_border_container">
                <div className="select_card_bg_color">
                  <div>전체테두리</div>
                  <div className="card_border_total">
                    <div>
                      <Form.Item name={['border','package', 'type']}>
                        <Select size='small' style={{ width: 100 }}>
                          <Option value="solid">solid</Option>
                          <Option value="dashed">dashed</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div><Form.Item name={['border','package', 'color']}><Input size='small' type="color" style={{width:20}}/></Form.Item></div>
                    <div>
                      <Form.Item name={['border','package', 'thickness']}>
                        <InputNumber size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div style={{paddingLeft:50}}>
                  <Collapse className="border_detail" >
                    <Panel header="테두리 상세 설정" key="1" className="data_collapse_panel"> 
                      <div className="select_card_bg_color">
                        <div>상</div>
                        <div className="card_border_total">
                          <div>
                            <Select size='small' style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div><Input size='small' type="color" style={{width:20}}/></div>
                          <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                          <div>
                            <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                          </div>
                        </div>
                      </div>
                      <div className="select_card_bg_color">
                        <div>하</div>
                        <div className="card_border_total">
                          <div>
                            <Select size='small' style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div><Input size='small' type="color" style={{width:20}}/></div>
                          <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                          <div>
                            <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                          </div>
                        </div>
                      </div>
                      <div className="select_card_bg_color">
                        <div>좌</div>
                        <div className="card_border_total">
                          <div>
                            <Select size='small' style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div><Input size='small' type="color" style={{width:20}}/></div>
                          <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                          <div>
                            <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                          </div>
                        </div>
                      </div>
                      <div className="select_card_bg_color">
                        <div>우</div>
                        <div className="card_border_total">
                          <div>
                            <Select size='small' style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div><Input size='small' type="color" style={{width:20}}/></div>
                          <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                          <div>
                            <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className="card_border_radius_container">
                  <div>라운드</div>
                  <div className="card_border_radius">
                    <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
                  </div>
                </div>
                <div className="card_border_radius_container">
                  <div>그림자</div>
                  <div className="card_border_radius">
                    <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
                  </div>
                </div>
              </div>
            </Panel>
            </Collapse>
            </Form>
      </div>
      </> 
      }
      <Affix offsetBottom={0}>
            <div className="save_page_setting">
            <Form.Item>
              <Button htmlType="submit" type="primary" shape="round" size="small">적용</Button>
            </Form.Item>
              <Button type="primary" shape="round" size="small">취소</Button>
              <Button type="primary" shape="round" size="small">설정초기화</Button>
            </div>
          </Affix></>
      
    );
  }
}

class SelectTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      card_selected:''
     };
    this.keyCount = 70;
    this.getKey = this.getKey.bind(this);
  }
  getKey(){
    return this.keyCount++;
  }

  render() {

    const cardTypeListOption = this.props.cardType.map((card_type)=>(
      <Option key={this.getKey()} value={card_type._id}>{card_type.name} - ({card_type.type} 카드)</Option>
    ))
    const cardFaceListOption = this.props.cardType.map((card_type)=>{
      if(card_type._id === this.props.card_selected){
        if(card_type.type === 'read'){
          return <><Option value='1면'>1면</Option></>
        } else if(card_type.type === 'flip-normal'){
          return <><Option value='1면'>1면</Option><Option value='2면'>2면</Option></>
        } 
      }
    })
    return (
      <>
        <div className="select_card_templete">
          <div className='select_page_size_div'>
              <div>카드</div>
              <div>
                <Select defaultValue="카드선택" size='small' onChange={this.props.onCardChangeHandler} style={{ width: 195 }}>
                  <Option key="default1" value="카드선택">카드선택</Option>
                  {cardTypeListOption}
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
              <div>면</div>
              <div>
                <Select defaultValue="면선택" size='small' style={{ width: 195 }}>
                  <Option key="default2" value="면선택">면선택</Option>
                  {cardFaceListOption}
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
              <div>행</div>
              <div>
                <Select defaultValue="행선택" size='small' style={{ width: 195 }}>
                  <Option key="default3" value="행선택">행선택</Option>
                </Select>
              </div>
          </div>
        </div>
      </>
    );
  }
}

class LayoutSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  // card_selected={this.props.card_selected} cardType={this.props.cardType} 
  render() {
    const direction = []
    const layoutSettingValue = this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          direction.push(value.direction)
        }
        return null
    })
    console.log(layoutSettingValue)
    console.log(direction[0])
    return (
      <>
        <div className="layout_container">
          <div className='select_mode_container'>
            <div>방향</div>
            <div>
              <Select size='small' value={direction[0]} style={{ width: 195 }}>
                <Option value="left_right">좌우</Option>
                <Option value="up_down">상하</Option>
              </Select>
            </div>
          </div>
          <div className='select_mode_container'>
            <div></div>
            <div className='layout_example_img'>
              <img src="img/leftright.png" width='90px' alt="좌우"/>
              <img src="img/updown.png" width='90px'  alt="상하"/>
            </div>
          </div>
          <div className='select_mode_container'>
            <div>면간 비율</div>
            <div className='layout_ratio'>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='1면' suffix='%' type="text"/>
              </div>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='2면' suffix='%' type="text"/>
              </div>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='주석' suffix='%' type="text"/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CardBackgroundColor extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {

    return (
      <>
        <div className="select_card_bg_color_container">
          <div className="select_card_bg_color">
            <div>배경색</div>
            <div className="select_card_bg_color_right">
              <div><input type="color"/></div>
              <div><Input size='small' style={{ width: 125 }} type="text"/></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class CardMargin extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const margin = []
    const layoutSettingValue = this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          console.log(value.outer_margin)
          margin.push(value.outer_margin)
        }
        return null
    })
    console.log(layoutSettingValue)

    if(margin.length > 0){
      var top = margin[0].top
      var bottom = margin[0].bottom
      var left = margin[0].left
      var right = margin[0].right
    } else {
      top = ''
      bottom = ''
      left = ''
      right = ''
    }
    

    return (
      <>
        <div className="select_card_margin">
            <div className="card_margin_top"><Input size='small' value={top} style={{ width: 70,fontSize:10 }} prefix='상' suffix='px' type="number"/></div>
            <div className="card_margin_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={left} prefix='좌' suffix='px' type="number"/></div>
              <div className="">
                <img src="img/cardmargin.png" width="100" alt="cardmargin_img"/>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={right} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="card_margin_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} value={bottom} prefix='하' suffix='px' type="number"/></div>
        </div>
      </>
    );
  }
}
class CardPadding extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const padding = []
    const layoutSettingValue = this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          padding.push(value.card_style.inner_padding)
        }
        return null
    })
    if(padding.length > 0){
      var top = padding[0].top
      var bottom = padding[0].bottom
      var left = padding[0].left
      var right = padding[0].right
    } else {
      top = ''
      bottom = ''
      left = ''
      right = ''
    }
    return (
      <>
        <div className="select_card_margin">
            <div className="card_margin_top"><Input size='small' style={{ width: 70,fontSize:10 }} value={top} prefix='상' suffix='px' type="number"/></div>
            <div className="card_margin_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={left} prefix='좌' suffix='px' type="number"/></div>
              <div className="">
                <img src="img/cardpadding.png" width="100" alt="cardpadding_img"/>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={right} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="card_margin_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} value={bottom} prefix='하' suffix='px' type="number"/></div>
        </div>
      </>
    );
  }
}
class CardBorder extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    // const props = {
    //   name: 'file',
    //   action: '',
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    // };
    return (
      <>
        <div className="card_border_container">
          <div className="select_card_bg_color">
            <div>전체테두리</div>
            <div className="card_border_total">
              <div>
                <Select size='small' style={{ width: 50 }}>
                  <Option value="선택">선택</Option>
                  <Option value="선택">선택</Option>
                </Select>
              </div>
              <div><Input size='small' type="color" style={{width:20}}/></div>
              <div><Input size='small' style={{ width: 60 }} type="text"/></div>
              <div>
                <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
              </div>
            </div>
          </div>
          <div style={{paddingLeft:50}}>
            <Collapse className="border_detail" >
              <Panel header="테두리 상세 설정" key="1" className="data_collapse_panel"> 
                <div className="select_card_bg_color">
                  <div>상</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>하</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>좌</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>우</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="card_border_radius_container">
            <div>라운드</div>
            <div className="card_border_radius">
              <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
            </div>
          </div>
          <div className="card_border_radius_container">
            <div>그림자</div>
            <div className="card_border_radius">
              <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
            </div>
          </div>
        </div>
      </>
    );
  }
}
class FontChange extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="card_font_container">
          <div className="card_border_radius_container">
              <div>라운드</div>
              <div className="text_align">
                <AlignLeftOutlined />
                <AlignCenterOutlined />
                <AlignRightOutlined />
              </div>
          </div>
          <div className="card_border_radius_container">
            <div>폰트</div>
            <div>
              <Select size='small' style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size='small' style={{ width: 60,fontSize: 10 }} suffix='px' type="number"/>
              </div>
            <div>
              <BoldOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey' }}/>
            </div>
            <div>
              <ItalicOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
            <div>
            <UnderlineOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CardSetting;