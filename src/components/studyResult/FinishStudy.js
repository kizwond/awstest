import React, { Component } from 'react';
// import { Card } from 'antd';
import axios from 'axios'

class FinishStudy extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            result:[],
            by_book:[],
         }
    }

    componentDidMount(){
        const sessionId = sessionStorage.getItem('sessionId')
        axios.post('api/studyresult/req-session-studyresult',{
            session_id:sessionId
        }).then(res => {
            console.log("서버로부터 통계정보 :",res.data)
            this.setState({
                result:res.data.study_results_by_session,
                by_book: res.data.study_results_by_book
            })
        })
        
    }

    render() { 
        console.log(this.state.result)
        console.log(this.state.by_book)
        return (
            <>
            {this.state.result ? <div style={{width:'920px', margin:"auto", marginTop:"5%"}}>
                <div style={{textAlign:"center", marginBottom:"5px", fontSize:"14px"}}>학습이 종료되었습니다!!!</div>
                <div style={{textAlign:"center", marginBottom:"20px", fontSize:"14px"}}>수고하셨습니다!!!</div>
                <pre>{JSON.stringify(this.state.by_book, undefined, 5)}</pre>
                <pre>{JSON.stringify(this.state.result, undefined, 5)}</pre>
            </div>    :'hello' }
            
            </>
          );
    }
}
 
export default FinishStudy;