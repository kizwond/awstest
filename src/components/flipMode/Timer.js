import React, { Component } from 'react';
import DefaultButton from '../../../styledComponents/defaultButton'

const ms = require('pretty-ms')

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  componentDidMount(){
    this.props.startTimer()
    this.props.startTimerTotal()
  }
  
  render() {

    let stop_total = (this.props.time_total  === 0 || !this.props.isOn_total ) ?
      null :
      <DefaultButton onClick={this.props.stopTimerTotal} type="primary" danger style={{ width:"80px", borderRadius:"10px"}}>일시정지</DefaultButton>

    let resume_total = (this.props.time_total  === 0 || this.props.isOn_total ) ?
      null :
      <DefaultButton onClick={this.props.startTimerResume} type="primary" style={{ width:"80px", borderRadius:"10px", backgroundColor:"#1ce400", border:"none"}}>재개</DefaultButton>

    return(
      <>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{marginBottom:"0px"}}>현재카드 학습시간</div>
          <h3 style={{width:'100px',fontFamily: 'Mina, sans-serif',fontSize:"20px"}}>{ms(this.props.time,{compact: true, colonNotation: true})}</h3>
        </div>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{marginBottom:"0px"}}>총 경과시간</div>
          <h3 style={{width:'100px',fontFamily: 'Mina, sans-serif',fontSize:"20px"}}>{ms(this.props.time_total ,{compact: true, colonNotation: true})}</h3>
        </div>
        {stop_total}
        {resume_total}
      </>
    )
  }
}
export default Timer