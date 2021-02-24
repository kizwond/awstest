import React, { Component } from 'react';
// import { Card } from 'antd';
import axios from 'axios'

class FinishStudy extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            exp_gained_session:0,
            exp_gained_card_count:0,
         }
    }

    componentDidMount(){
        const sessionId = sessionStorage.getItem('sessionId')
        axios.post('api/studyresult/req-session-studyresult',{
            session_id:sessionId
        }).then(res => {
            console.log("서버로부터 통계정보 :",res.data)
            this.setState({
                result:res.data.session.study_result,
                by_book: res.data.study_results_by_book
            })
        })

    }

    render() { 
        console.log(this.state.result)
        console.log(this.state.by_book)
        if(this.state.result){
           const total_result = this.state.result.total
           const read_result = this.state.result.read
           const flip_result = this.state.result.flip
           var average_level_before = this.state.result.avg_level.before
           var average_level_after = this.state.result.avg_level.after

           var total_studied_cards_total = total_result.studied_cards.total
           var total_studied_cards_yet = total_result.studied_cards.yet
           var total_studied_cards_ing = total_result.studied_cards.ing
           var total_studied_cards_hold = total_result.studied_cards.hold
           var total_studied_cards_completed = total_result.studied_cards.completed
           var total_studied_study_hour = total_result.study_hour / 1000 / 60
           var total_studied_diffi1 = total_result.study_times.diffi1
           var total_studied_diffi2 = total_result.study_times.diffi2
           var total_studied_diffi3 = total_result.study_times.diffi3
           var total_studied_diffi4 = total_result.study_times.diffi4
           var total_studied_diffi5 = total_result.study_times.diffi5
           var total_studied_diffi_total = total_result.study_times.total
           var total_studied_exp_gained = total_result.exp_gained

           var read_studied_cards_total = read_result.studied_cards.total
           var read_studied_cards_yet = read_result.studied_cards.yet
           var read_studied_cards_ing = read_result.studied_cards.ing
           var read_studied_cards_hold = read_result.studied_cards.hold
           var read_studied_cards_completed = read_result.studied_cards.completed
           var read_studied_study_hour = read_result.study_hour / 1000 / 60
           var read_studied_diffi1 = read_result.study_times.diffi1
           var read_studied_diffi2 = read_result.study_times.diffi2
           var read_studied_diffi3 = read_result.study_times.diffi3
           var read_studied_diffi4 = read_result.study_times.diffi4
           var read_studied_diffi5 = read_result.study_times.diffi5
           var read_studied_diffi_total = read_result.study_times.total
           var read_studied_exp_gained = read_result.exp_gained

           var flip_studied_cards_total = flip_result.studied_cards.total
           var flip_studied_cards_yet = flip_result.studied_cards.yet
           var flip_studied_cards_ing = flip_result.studied_cards.ing
           var flip_studied_cards_hold = flip_result.studied_cards.hold
           var flip_studied_cards_completed = flip_result.studied_cards.completed
           var flip_studied_study_hour = flip_result.study_hour / 1000 / 60
           var flip_studied_diffi1 = flip_result.study_times.diffi1
           var flip_studied_diffi2 = flip_result.study_times.diffi2
           var flip_studied_diffi3 = flip_result.study_times.diffi3
           var flip_studied_diffi4 = flip_result.study_times.diffi4
           var flip_studied_diffi5 = flip_result.study_times.diffi5
           var flip_studied_diffi_total = flip_result.study_times.total
           var flip_studied_exp_gained = flip_result.exp_gained


        } else {
            average_level_before = 0
            average_level_after = 0

           total_studied_cards_total = 0
           total_studied_cards_yet = 0
           total_studied_cards_ing = 0
           total_studied_cards_hold = 0
           total_studied_cards_completed = 0
           total_studied_study_hour = 0
           total_studied_diffi1 = 0
           total_studied_diffi2 = 0
           total_studied_diffi3 = 0
           total_studied_diffi4 = 0
           total_studied_diffi5 = 0
           total_studied_diffi_total = 0
           total_studied_exp_gained = 0

           read_studied_cards_total = 0
           read_studied_cards_yet = 0
           read_studied_cards_ing = 0
           read_studied_cards_hold = 0
           read_studied_cards_completed = 0
           read_studied_study_hour = 0
           read_studied_diffi1 = 0
           read_studied_diffi2 = 0
           read_studied_diffi3 = 0
           read_studied_diffi4 = 0
           read_studied_diffi5 = 0
           read_studied_diffi_total = 0
           read_studied_exp_gained = 0

           flip_studied_cards_total = 0
           flip_studied_cards_yet = 0
           flip_studied_cards_ing = 0
           flip_studied_cards_hold = 0
           flip_studied_cards_completed = 0
           flip_studied_study_hour = 0
           flip_studied_diffi1 = 0
           flip_studied_diffi2 = 0
           flip_studied_diffi3 = 0
           flip_studied_diffi4 = 0
           flip_studied_diffi5 = 0
           flip_studied_diffi_total = 0
           flip_studied_exp_gained = 0
        }
        if(this.state.by_book){
            var byBook = this.state.by_book.map(item=>{
                const study_date = item.study_date
                const book_id = item.book_id.title
                const total_exp_gained = item.total.exp_gained
                const total_study_hour = item.total.study_hour / 1000 / 60;
                console.log(total_study_hour)

                const total_studied_cards_total = item.total.studied_cards.total
                const total_studied_cards_yet = item.total.studied_cards.yet
                const total_studied_cards_ing = item.total.studied_cards.ing
                const total_studied_cards_hold = item.total.studied_cards.hold
                const total_studied_cards_completed = item.total.studied_cards.completed
                const total_studied_study_hour = item.total.study_hour
                const total_studied_diffi1 = item.total.study_times.diffi1
                const total_studied_diffi2 = item.total.study_times.diffi2
                const total_studied_diffi3 = item.total.study_times.diffi3
                const total_studied_diffi4 = item.total.study_times.diffi4
                const total_studied_diffi5 = item.total.study_times.diffi5
                const total_studied_diffi_total = item.total.study_times.total
                const total_studied_exp_gained = item.total.exp_gained

                const read_studied_cards_total = item.read.studied_cards.total
                const read_studied_cards_yet = item.read.studied_cards.yet
                const read_studied_cards_ing = item.read.studied_cards.ing
                const read_studied_cards_hold = item.read.studied_cards.hold
                const read_studied_cards_completed = item.read.studied_cards.completed
                const read_studied_study_hour = item.read.study_hour
                const read_studied_diffi1 = item.read.study_times.diffi1
                const read_studied_diffi2 = item.read.study_times.diffi2
                const read_studied_diffi3 = item.read.study_times.diffi3
                const read_studied_diffi4 = item.read.study_times.diffi4
                const read_studied_diffi5 = item.read.study_times.diffi5
                const read_studied_diffi_total = item.read.study_times.total
                const read_studied_exp_gained = item.read.exp_gained

                const flip_studied_cards_total = item.flip.studied_cards.total
                const flip_studied_cards_yet = item.flip.studied_cards.yet
                const flip_studied_cards_ing = item.flip.studied_cards.ing
                const flip_studied_cards_hold = item.flip.studied_cards.hold
                const flip_studied_cards_completed = item.flip.studied_cards.completed
                const flip_studied_study_hour = item.flip.study_hour
                const flip_studied_diffi1 = item.flip.study_times.diffi1
                const flip_studied_diffi2 = item.flip.study_times.diffi2
                const flip_studied_diffi3 = item.flip.study_times.diffi3
                const flip_studied_diffi4 = item.flip.study_times.diffi4
                const flip_studied_diffi5 = item.flip.study_times.diffi5
                const flip_studied_diffi_total = item.flip.study_times.total
                const flip_studied_exp_gained = item.flip.exp_gained

                return <>
                    <div key={book_id} style={{fontSize:"11px", marginBottom:"20px", display:"flex", justifyContent:"space-between"}}>
                        <ul>
                            <li style={{marginTop:"5px", fontWeight:"700"}}>책 제목 : {book_id}</li>
                            <li style={{marginTop:"5px"}}>학습날짜 : {study_date}</li>
                            <li style={{marginTop:"5px"}}>획득 경험치총합 : {total_exp_gained}exp</li>
                            <li style={{marginTop:"5px"}}>학습시간 총합 : {total_study_hour}분</li>
                        </ul>

                        <ul>
                            <li>전체</li>
                            <li style={{marginTop:"5px"}}>학습카드 토탈 : {total_studied_cards_total}</li>
                            <li style={{marginTop:"5px"}}>미학습카드 토탈 : {total_studied_cards_yet}</li>
                            <li style={{marginTop:"5px"}}>복습카드 토탈 : {total_studied_cards_ing}</li>
                            <li style={{marginTop:"5px"}}>보류카드 토탈 : {total_studied_cards_hold}</li>
                            <li style={{marginTop:"5px"}}>완료카드 토탈 : {total_studied_cards_completed}</li>
                            <li style={{marginTop:"5px"}}>학습시간 : {total_studied_study_hour}분</li>
                            <li style={{marginTop:"5px"}}>난이도1선택 : {total_studied_diffi1}회</li>
                            <li style={{marginTop:"5px"}}>난이도2선택 : {total_studied_diffi2}회</li>
                            <li style={{marginTop:"5px"}}>난이도3선택 : {total_studied_diffi3}회</li>
                            <li style={{marginTop:"5px"}}>난이도4선택 : {total_studied_diffi4}회</li>
                            <li style={{marginTop:"5px"}}>난이도5선택 : {total_studied_diffi5}회</li>
                            <li style={{marginTop:"5px"}}>난이도 선택횟수 총합 : {total_studied_diffi_total}회</li>
                            <li style={{marginTop:"5px"}}>획득 경험치 : {total_studied_exp_gained}exp</li>
                        </ul>
                        <ul>
                            <li>읽기카드</li>
                            <li style={{marginTop:"5px"}}>학습카드 토탈 : {read_studied_cards_total}</li>
                            <li style={{marginTop:"5px"}}>미학습카드 토탈 : {read_studied_cards_yet}</li>
                            <li style={{marginTop:"5px"}}>복습카드 토탈 : {read_studied_cards_ing}</li>
                            <li style={{marginTop:"5px"}}>보류카드 토탈 : {read_studied_cards_hold}</li>
                            <li style={{marginTop:"5px"}}>완료카드 토탈 : {read_studied_cards_completed}</li>
                            <li style={{marginTop:"5px"}}>학습시간 : {read_studied_study_hour}분</li>
                            <li style={{marginTop:"5px"}}>난이도1선택 : {read_studied_diffi1}회</li>
                            <li style={{marginTop:"5px"}}>난이도2선택 : {read_studied_diffi2}회</li>
                            <li style={{marginTop:"5px"}}>난이도3선택 : {read_studied_diffi3}회</li>
                            <li style={{marginTop:"5px"}}>난이도4선택 : {read_studied_diffi4}회</li>
                            <li style={{marginTop:"5px"}}>난이도5선택 : {read_studied_diffi5}회</li>
                            <li style={{marginTop:"5px"}}>난이도 선택횟수 총합 : {read_studied_diffi_total}회</li>
                            <li style={{marginTop:"5px"}}>획득 경험치 : {read_studied_exp_gained}exp</li>
                        </ul>
                        <ul>
                            <li>뒤집기카드</li>
                            <li style={{marginTop:"5px"}}>학습카드 토탈 : {flip_studied_cards_total}</li>
                            <li style={{marginTop:"5px"}}>미학습카드 토탈 : {flip_studied_cards_yet}</li>
                            <li style={{marginTop:"5px"}}>복습카드 토탈 : {flip_studied_cards_ing}</li>
                            <li style={{marginTop:"5px"}}>보류카드 토탈 : {flip_studied_cards_hold}</li>
                            <li style={{marginTop:"5px"}}>완료카드 토탈 : {flip_studied_cards_completed}</li>
                            <li style={{marginTop:"5px"}}>학습시간 : {flip_studied_study_hour}분</li>
                            <li style={{marginTop:"5px"}}>난이도1선택 : {flip_studied_diffi1}회</li>
                            <li style={{marginTop:"5px"}}>난이도2선택 : {flip_studied_diffi2}회</li>
                            <li style={{marginTop:"5px"}}>난이도3선택 : {flip_studied_diffi3}회</li>
                            <li style={{marginTop:"5px"}}>난이도4선택 : {flip_studied_diffi4}회</li>
                            <li style={{marginTop:"5px"}}>난이도5선택 : {flip_studied_diffi5}회</li>
                            <li style={{marginTop:"5px"}}>난이도 선택횟수 총합 : {flip_studied_diffi_total}회</li>
                            <li style={{marginTop:"5px"}}>획득 경험치 : {flip_studied_exp_gained}exp</li>
                        </ul>
                    </div>
                    </>
            })
            console.log(byBook)
        }
        
        return (
            <>
            {this.state.result ? <div style={{width:'920px', margin:"auto", marginTop:"5%"}}>
                <div style={{textAlign:"center", marginBottom:"5px", fontSize:"14px"}}>학습이 종료되었습니다!!!</div>
                <div style={{textAlign:"center", marginBottom:"20px", fontSize:"14px"}}>수고하셨습니다!!!</div>
                <div style={{textAlign:"center", marginBottom:"20px", fontSize:"14px"}}>평균레벨 이전 : {average_level_before} , 현재 : {average_level_after} </div>
                <div style={{fontSize:"12px", display:"flex",flexDirection:"row", justifyContent:"space-between", width:'100%', marginBottom:"10px"}}>
                    <div>
                        <span>학습토탈</span>
                        <ul style={{marginTop:"5px"}}>
                            <li style={{marginTop:"5px"}}>학습카드 토탈 : {total_studied_cards_total}</li>
                            <li style={{marginTop:"5px"}}>미학습카드 토탈 : {total_studied_cards_yet}</li>
                            <li style={{marginTop:"5px"}}>복습카드 토탈 : {total_studied_cards_ing}</li>
                            <li style={{marginTop:"5px"}}>보류카드 토탈 : {total_studied_cards_hold}</li>
                            <li style={{marginTop:"5px"}}>완료카드 토탈 : {total_studied_cards_completed}</li>
                            <li style={{marginTop:"5px"}}>학습시간 : {total_studied_study_hour}분</li>
                            <li style={{marginTop:"5px"}}>난이도1선택 : {total_studied_diffi1}회</li>
                            <li style={{marginTop:"5px"}}>난이도2선택 : {total_studied_diffi2}회</li>
                            <li style={{marginTop:"5px"}}>난이도3선택 : {total_studied_diffi3}회</li>
                            <li style={{marginTop:"5px"}}>난이도4선택 : {total_studied_diffi4}회</li>
                            <li style={{marginTop:"5px"}}>난이도5선택 : {total_studied_diffi5}회</li>
                            <li style={{marginTop:"5px"}}>난이도 선택횟수 총합 : {total_studied_diffi_total}회</li>
                            <li style={{marginTop:"5px"}}>획득 경험치 : {total_studied_exp_gained}exp</li>
                        </ul>
                    </div>
                    <div>
                        <span>읽기카드</span>
                        <ul style={{marginTop:"5px"}}>
                            <li style={{marginTop:"5px"}}>학습카드 토탈 : {read_studied_cards_total}</li>
                            <li style={{marginTop:"5px"}}>미학습카드 토탈 : {read_studied_cards_yet}</li>
                            <li style={{marginTop:"5px"}}>복습카드 토탈 : {read_studied_cards_ing}</li>
                            <li style={{marginTop:"5px"}}>보류카드 토탈 : {read_studied_cards_hold}</li>
                            <li style={{marginTop:"5px"}}>완료카드 토탈 : {read_studied_cards_completed}</li>
                            <li style={{marginTop:"5px"}}>학습시간 : {read_studied_study_hour}분</li>
                            <li style={{marginTop:"5px"}}>난이도1선택 : {read_studied_diffi1}회</li>
                            <li style={{marginTop:"5px"}}>난이도2선택 : {read_studied_diffi2}회</li>
                            <li style={{marginTop:"5px"}}>난이도3선택 : {read_studied_diffi3}회</li>
                            <li style={{marginTop:"5px"}}>난이도4선택 : {read_studied_diffi4}회</li>
                            <li style={{marginTop:"5px"}}>난이도5선택 : {read_studied_diffi5}회</li>
                            <li style={{marginTop:"5px"}}>난이도 선택횟수 총합 : {read_studied_diffi_total}회</li>
                            <li style={{marginTop:"5px"}}>획득 경험치 : {read_studied_exp_gained}exp</li>
                        </ul>
                    </div>
                    <div>
                        <span>뒤집기카드</span>
                        <ul style={{marginTop:"5px"}}>
                            <li style={{marginTop:"5px"}}>학습카드 토탈 : {flip_studied_cards_total}</li>
                            <li style={{marginTop:"5px"}}>미학습카드 토탈 : {flip_studied_cards_yet}</li>
                            <li style={{marginTop:"5px"}}>복습카드 토탈 : {flip_studied_cards_ing}</li>
                            <li style={{marginTop:"5px"}}>보류카드 토탈 : {flip_studied_cards_hold}</li>
                            <li style={{marginTop:"5px"}}>완료카드 토탈 : {flip_studied_cards_completed}</li>
                            <li style={{marginTop:"5px"}}>학습시간 : {flip_studied_study_hour}분</li>
                            <li style={{marginTop:"5px"}}>난이도1선택 : {flip_studied_diffi1}회</li>
                            <li style={{marginTop:"5px"}}>난이도2선택 : {flip_studied_diffi2}회</li>
                            <li style={{marginTop:"5px"}}>난이도3선택 : {flip_studied_diffi3}회</li>
                            <li style={{marginTop:"5px"}}>난이도4선택 : {flip_studied_diffi4}회</li>
                            <li style={{marginTop:"5px"}}>난이도5선택 : {flip_studied_diffi5}회</li>
                            <li style={{marginTop:"5px"}}>난이도 선택횟수 총합 : {flip_studied_diffi_total}회</li>
                            <li style={{marginTop:"5px"}}>획득 경험치 : {flip_studied_exp_gained}exp</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div style={{fontSize:"12px", fontWeight:"700"}}>책별 학습정보</div>
                    {byBook}
                </div>
            </div>    :'hello' }
            
            </>
          );
    }
}
 
export default FinishStudy;