import React, { Component } from 'react';
import './Write.css'
import LikeSectionContent from './LikeSectionContent'
import ListSectionContent from './ListSectionContent'
import {NavLink} from 'react-router-dom'
import { DownCircleTwoTone,UpCircleTwoTone } from '@ant-design/icons';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

class WriteMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isToggleOn: true,
      user:'',
      bookTitle:[],
      likeTitle:[],
      message:'',
      hideOrShowClass : false,
      category : [],
      hide_or_show: false,
      hide_or_show_like :false
     }
  }

  componentDidMount() {
    this.getOnlyShowTitle()
  }

  getOnlyShowTitle() {
    axios.get('api/book/get-booklist')
    .then(res => {
      console.log("first axios :",res.data)
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist,
        isToggleOn:res.data.write_config[0].write_config.likebook,
        hide_or_show:res.data.write_config[0].write_config.hide_or_show
      })
    })
  }

  updateState = (data) => {
    this.setState({
      category:data.value1,
      likeTitle:data.value2
    })
  }
  updateHideOrShowState = (data) => {
    this.setState({
      hide_or_show:data.hide_or_show
    })
  }

  onClickToggle = () => {
    axios.post('api/book/change-like-config',{
      like_toggle : !this.state.isToggleOn
    }).then(res => {
      this.setState({
        isToggleOn:res.data.write_config[0].write_config.likebook
      })
    })
  }

  render() { 

    return ( 
      <div className="write_container" style={{marginTop:"10px"}}>
        <div>즐겨찾기</div>
        <br/>
        {this.state.isToggleOn ? <LikeSectionContent updateState={this.updateState}
                                                     category={this.state.category} 
                                                     bookTitle={this.state.likeTitle}
                                                     hideOrShowToggleStateLike={this.state.hide_or_show_like}/> : ''}
        
        <div style={{textAlign:"center", marginTop:"-20px"}}>
        {this.state.isToggleOn ? <UpCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/> 
                              : <div style={{borderBottom:"1px solid lightgrey", marginTop:"10px", marginBottom:"20px"}}>
                                  <div style={{marginBottom:"-15px"}}>
                                    <DownCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/>
                                  </div>
                                </div>}
        </div>
        <NavLink to="/naming" exact><Button type="primary" size="small" width="100px" style={{marginBottom:"10px"}}>새책만들기</Button></NavLink> 
        <div className="book_list_container_in_write">
          <ListSectionContent updateState={this.updateState}
                              category={this.state.category} 
                              updateHideOrShowState={this.updateHideOrShowState} 
                              hideOrShowToggleState={this.state.hide_or_show}
                              />
        </div>
      </div>
     );
  }
}
 
export default WriteMain;