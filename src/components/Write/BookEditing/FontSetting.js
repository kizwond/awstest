import React, { Component } from 'react';
import { Affix, Collapse, Form, Switch, Select, Input, InputNumber } from 'antd';
import { BoldOutlined,ItalicOutlined,UnderlineOutlined,AlignCenterOutlined,AlignLeftOutlined,AlignRightOutlined } from '@ant-design/icons';
import Button from '../../styledComponents/defaultButton'
import axios from 'axios'

const { Panel } = Collapse;
const { Option } = Select;

class FontSetting extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      card_selected:'',
      direction:"left-right",
      backgroundColor:"#FFFFFF",
      marginTop:0,
      marginRight:0,
      marginLeft:0,
      marginBottom:0,
      paddingTop:0,
      paddingRight:0,
      paddingLeft:0,
      paddingBottom:0,
      borderStyle:"solid",
      borderColor:"#FFFFFF",
      borderThickness:0,
      face_selected:'',
      face_selected_index:'',
      row_selected:'',
      row_selected_index:''
      

     };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey(){
    return this.keyCount++;
  }

  onFinish = () => {
    console.log(this.state.prev_row_style)
    const prev_row_style = this.state.prev_row_style
    if(this.state.face_selected_index === 1){
      const update_row_style = prev_row_style.face1.map(style=>{
        if(this.state.row_selected === style._id){
          style.background_color = this.state.backgroundColor
          style.outer_margin = {
            top:this.state.marginTop,
            right:this.state.marginRight,
            left:this.state.marginLeft,
            bottom:this.state.marginBottom,
          }
          style.inner_padding = {
            top:this.state.paddingTop,
            bottom:this.state.paddingBottom,
            left:this.state.paddingLeft,
            right:this.state.paddingRight
          }
          style.border={
            mode:"package",
            package:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            top:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            bottom:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            left:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            right:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
          }
        }
      })
    } else {
      const update_row_style = prev_row_style.face2.map(style=>{
        if(this.state.row_selected === style._id){
          style.background_color = this.state.backgroundColor
          style.outer_margin = {
            top:this.state.marginTop,
            right:this.state.marginRight,
            left:this.state.marginLeft,
            bottom:this.state.marginBottom,
          }
          style.inner_padding = {
            top:this.state.paddingTop,
            bottom:this.state.paddingBottom,
            left:this.state.paddingLeft,
            right:this.state.paddingRight
          }
          style.border={
            mode:"package",
            package:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            top:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            bottom:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            left:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
            right:{type:this.state.borderStyle, thickness:this.state.borderThickness, color:this.state.borderColor},
          }
        }
      })
    }
    
    console.log("final : ", prev_row_style)

    axios.post('api/cardtype/update-rowstyle',{
      cardtype_id: this.props.cardSetting_selected,
      updated_row_style:prev_row_style,
      book_id:this.props.cardType[0].book_id,
    }).then(res => {
      console.log(res.data)
      this.props.getCardTypeList()
    })
  }

  onChangeBackgroundColor = (e) => {
    console.log(e.target.value)
    this.setState({
      backgroundColor:e.target.value
    })
  }
  onChangeMarginTop = (marginTop) => {
    console.log(marginTop)
    this.setState({
      marginTop:marginTop
    })
  }
  onChangeMarginRight = (marginRight) => {
    console.log(marginRight)
    this.setState({
      marginRight:marginRight
    })
  }
  onChangeMarginBottom = (marginBottom) => {
    console.log(marginBottom)
    this.setState({
      marginBottom:marginBottom
    })
  }
  onChangeMarginLeft = (marginLeft) => {
    console.log(marginLeft)
    this.setState({
      marginLeft:marginLeft
    })
  }
  onChangePaddingTop = (paddingTop) => {
    console.log(paddingTop)
    this.setState({
      paddingTop:paddingTop
    })
  }
  onChangePaddingRight = (paddingRight) => {
    console.log(paddingRight)
    this.setState({
      paddingRight:paddingRight
    })
  }
  onChangePaddingBottom = (paddingBottom) => {
    console.log(paddingBottom)
    this.setState({
      paddingBottom:paddingBottom
    })
  }
  onChangePaddingLeft = (paddingLeft) => {
    console.log(paddingLeft)
    this.setState({
      paddingLeft:paddingLeft
    })
  }
  onChangeBorderStyle = (borderStyle) => {
    console.log(borderStyle)
    this.setState({
      borderStyle:borderStyle
    })
  }
  onChangeBorderColor = (e) => {
    console.log(e.target.value)
    this.setState({
      borderColor:e.target.value
    })
  }
  onChangeBorderThickness = (borderThickness) => {
    console.log(borderThickness)
    this.setState({
      borderThickness:borderThickness
    })
  }
  componentDidMount(){
    this.getCardTypeList()
  }

  getCardTypeList = () => {
    const value = sessionStorage.getItem("book_id")
    axios.post('api/cardtype/get-cardtype',{
      book_id:value
    })
      .then(res => {
        console.log(res.data)
        this.setState({ 
          card_type:res.data.cardtypes
        });
      })
  }

  onCardChangeHandler = (e) => {
    console.log('onCardChangeHandler : ',e.target.value)
    this.setState({
      card_selected:e.target.value
    })
    this.props.onCardChangeHandler(e)
  }

  onFaceChangeHandler = (e) => {
    console.log('onFaceChangeHandler : ',e.target.value)
    console.log('onFaceChangeHandler : ',e.target.selectedIndex)
    this.setState({
      face_selected:e.target.value,
      face_selected_index:e.target.selectedIndex
    })
    this.props.onFaceChangeHandler(e)
  }

  onRowChangeHandler = (e) => {
    console.log('onRowChangeHandler : ',e.target.value)
    console.log('onRowChangeHandler : ',e.target.selectedIndex)
    this.setState({
      row_selected:e.target.value,
      row_selected_index:e.target.selectedIndex
    })
    this.getInitialValues(this.props.cardSetting_selected,e.target.selectedIndex)
  }

  getInitialValues = (id,index) => {
    console.log('11111111111111111111111111',id)
      const align = []
      const bold = []
      const font = []
      const italic = []
      const size = []
      const underline = []

        console.log('22222222222222222222222222222')
        this.state.card_type.map((value)=>{
          if(value._id === id){
            console.log(value)
            if(this.state.face_selected_index === 1){
                align.push(value.font.face1[index-1].align)
                bold.push(value.font.face1[index-1].bold)
                font.push(value.font.face1[index-1].font)
                italic.push(value.font.face1[index-1].italic)
                size.push(value.font.face1[index-1].size)
                underline.push(value.font.face1[index-1].underline)
            } else {
                align.push(value.font.face2[index-1].align)
                bold.push(value.font.face2[index-1].bold)
                font.push(value.font.face2[index-1].font)
                italic.push(value.font.face2[index-1].italic)
                size.push(value.font.face2[index-1].size)
                underline.push(value.font.face2[index-1].underline)
            }
            
            this.setState({
              prev_font:value.font
            })
          }
        })
  
  
        const initialValues = {
            align:align[0],
            bold:bold[0],
            font:font[0],
            italic:italic[0],
            size:size[0],
            underline:underline[0],
        }
      
      console.log('선택한 카드타입의 기본값 :',initialValues)

      this.setState({
        align:initialValues.align 
      })
      this.setState({
        bold:initialValues.bold
      })
      this.setState({
        font:initialValues.font
      })
      this.setState({
        italic:initialValues.italic
      })
      this.setState({
        size:initialValues.size
      })
      this.setState({
        underline:initialValues.underline
      })

  }

  render() {
    if(this.props.cardType) {
      var cardTypeListOption = this.props.cardType.map((card_type)=>{
        // if(card_type._id === this.props.cardSetting_selected) {
          return <option key={this.getKey()} value={card_type._id}>{card_type.name} - ({card_type.type} 카드)</option>
        // }
      } )
      var cardFaceListOption = this.props.cardType.map((card_type)=>{
        if(card_type._id === this.props.cardSetting_selected){
          if(card_type.type === 'read'){
            return 
          } else if(card_type.type === 'flip-normal'){
            return <><option value={card_type.face_style[0]._id}>1면</option><option value={card_type.face_style[1]._id}>2면</option></>
          } 
        }
      })
      console.log(cardFaceListOption)

      var cardRowListOption = this.props.cardType.map((card_type)=>{
        if(card_type._id === this.props.cardSetting_selected){
          console.log('---------------------------------', card_type)
          if(this.state.face_selected_index === 1){
            const row_options = card_type.row_style.face1.map((row,index)=>{
              console.log(row,index)
              return <><option value={row._id}>{index+1}행</option></>
            })
            return row_options

          } else if(this.state.face_selected_index === 2) {
            const row_options = card_type.row_style.face2.map((row,index)=>{
              console.log(row,index)
              return <><option value={row._id}>{index+1}행</option></>
            })
            return row_options
          } 
        }
      })
      console.log(cardRowListOption)
    }

    
    return (   
      <>
      <div className="page_setting_container">
          <Collapse defaultActiveKey={['1','3','4','5','6']} >
          <Panel header="템플릿 선택" key="1" className="data_collapse_panel"> 
              <div className="select_card_templete">
                <div className='select_page_size_div'>
                    <div>카드</div>
                    <div>
                      <select defaultValue="카드선택" size='small' onChange={this.onCardChangeHandler} value={this.props.cardSetting_selected} style={{ width: 195 }}>
                        {/* <option key="default1" value="카드선택">카드선택</option> */}
                        {cardTypeListOption}
                      </select>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>면</div>
                    <div>
                      <select defaultValue="면선택" size='small' onChange={this.onFaceChangeHandler} style={{ width: 195 }}>
                        <option key="default2" value="면선택">면선택</option>
                        {cardFaceListOption}
                      </select>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>행</div>
                    <div>
                      <select defaultValue="행선택" onChange={this.onRowChangeHandler} size='small' style={{ width: 195 }}>
                        <option key="default3" value="행선택">행선택</option>
                        {cardRowListOption}
                      </select>
                    </div>
                </div>
              </div>
            </Panel>
            
            <Panel header="폰트설정" key="3" className="data_collapse_panel">
              <div className="select_card_templete" style={{height:"600px"}}>
                <div className='select_page_size_div'>
                    <div>폰트</div>
                    <div>
                        <Input type="text" size='small' onChange={this.onChangeBackgroundColor}  style={{ width: 125 }} />
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>색</div>
                    <div>
                        <Input type="color" size='small' onChange={this.onChangeBackgroundColor}  style={{ width: 125 }} />
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>크기</div>
                    <div>
                        <InputNumber size='small' onChange={this.onChangeMarginLeft}  style={{ width: 100,fontSize:10 }} type="number"/>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>볼드</div>
                    <div>
                        <InputNumber size='small' onChange={this.onChangeMarginLeft}  style={{ width: 100,fontSize:10 }} type="number"/>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>이탈릭</div>
                    <div>
                        <InputNumber size='small' onChange={this.onChangeMarginLeft}  style={{ width: 100,fontSize:10 }} type="number"/>
                    </div>
                </div>
                <div className='select_page_size_div'>
                    <div>밑줄</div>
                    <div>
                        <InputNumber size='small' onChange={this.onChangeMarginLeft}  style={{ width: 100,fontSize:10 }} type="number"/>
                    </div>
                </div>
              </div>
            </Panel>
            </Collapse>
        </div>
      
        <Affix offsetBottom={0}>
          <div className="save_page_setting">
            <Button type="primary" onClick={this.onFinish} shape="round" size="small">적용</Button>
            <Button type="primary" shape="round" size="small">취소</Button>
            <Button type="primary" shape="round" size="small">설정초기화</Button>
          </div>
        </Affix>
      </>
    );
  }
}



export default FontSetting;