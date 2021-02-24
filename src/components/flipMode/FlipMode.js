import React, { Component } from 'react';
import { Avatar, Menu, Dropdown, Modal, Popover } from 'antd';
import { UserOutlined, DownOutlined, FlagFilled,SettingOutlined } from '@ant-design/icons';
import ProgressBar from "./progressBar";
import axios from 'axios'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import Timer from './Timer'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DefaultButton from '../../../styledComponents/defaultButton'

const { confirm } = Modal;

const session_id = sessionStorage.getItem('sessionId')


class FlipMode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contents:[],
      time: 0,
      start: 0,
      time_total:0,
      isOn_total:false,
      start_total:0,
      page_toggle:false,
      level_config:[],
      cardlist_studying:[],
      continue_study:false,
      average_completed:0,
      study_ratio:0,
      clickCount:1
     };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey(){
    return this.keyCount++;
  }
  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }


  startTimerTotal = () => {
    this.setState({
      isOn_total: true,
      time_total: this.state.time_total,
      start_total: Date.now() - this.state.time_total
    })
    this.timer_total = setInterval(() => this.setState({
      time_total: Date.now() - this.state.start_total
    }), 1);
  }
  stopTimerTotal = () => {
    this.setState({isOn_total: false})
    clearInterval(this.timer_total)  
    clearInterval(this.timer)
  }

  startTimerResume = () => {
    this.startTimer()
    this.startTimerTotal()
  }

  resetTimer = () => {
    this.setState({time: 0, start:0}, function(){
      this.startTimer()
      this.startTimerTotal()
    })
  }

  componentDidMount(){
    this.getCardList()
  }

  getCardList = async () => {
    sessionStorage.setItem('diffi5_stacked', 0);
    await axios.post('api/studyexecute/get-cardlist',{
      session_id: session_id,
    }).then(res => {
      sessionStorage.setItem('level_config',JSON.stringify(res.data.level_config));
      sessionStorage.setItem('cardlist_studying',JSON.stringify(res.data.cardlist_studying));

      this.setState({
        cardlist_studying:res.data.cardlist_studying,
        level_config:res.data.level_config,
      })
    })
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying')) 
    const cardIds = card_ids_session.map(item=>{
      return item._id
    })
    const diffStackedObject = []
    cardIds.map(item => {
      console.log(item)
      diffStackedObject.push({id:item, diff:''})
    })
    sessionStorage.setItem('cardlist_progress',JSON.stringify(diffStackedObject));
    this.getCardContentsAdd()
  }

  finishStudy = () =>{
    alert("학습할 카드가 없습니다. 학습결과 화면으로 이동합니다.")
    const cardlist_to_send = JSON.parse(sessionStorage.getItem('cardlist_to_send'))
      if(cardlist_to_send){
        console.log("서버에 학습데이타를 전송할 시간이다!!!!")
        sessionStorage.setItem('current_seq',0);
        const sessionId = sessionStorage.getItem('sessionId')
        axios.post('api/studyresult/create-studyresult',{
          cardlist_studied: cardlist_to_send,
          session_id:sessionId,
          status:"finished"
        }).then(res => {
          console.log("학습정보 전송완료!!!",res.data)        
          sessionStorage.removeItem('cardlist_to_send')
          window.location.href = '/study-result'
        })
      } else {
        window.location.href = '/study-result'
      }
  }

  
  getCardContentsAdd = () => {
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    const now = new Date();
    const current_seq = sessionStorage.getItem("current_seq")

    const reviewExist_data = card_ids_session.map(item => {
      if(item.detail_status.need_study_time_tmp !== null){
        if(new Date(item.detail_status.need_study_time_tmp) < now){
          return item
        }
      }
    })

    const reviewNotExist_temp = card_ids_session.map(item =>{
          if(item.detail_status.status_in_session === "on"){
            return item._id
          }
    })
    const reviewNotExist = reviewNotExist_temp.filter(function (el) {
      return el != null;
    });

    const reviewExist_filtered_data = reviewExist_data.filter(function (el) {
      return el != null;
    });

    const sortValue = reviewExist_filtered_data.slice()
    if(sortValue){
      sortValue.sort(function(a, b) { 
        return a.detail_status.need_study_time_tmp > b.detail_status.need_study_time_tmp ? 1 : a.detail_status.need_study_time_tmp < b.detail_status.need_study_time_tmp ? -1 : 0;
      });
      console.log("after sort:", sortValue)
    }

    const getReviewCardIds = sortValue.map(item =>{
      return item._id
    })

    if(sortValue.length > 0){
      //복습카드를 뿌린다
        const ids = getReviewCardIds
        const readyToStudyId = ids[0]
        console.log('지금공부할 복습카드 아이디',readyToStudyId)
        const newIdsArray = ids.slice(0, 6)
        console.log('ids',ids)
        console.log('newIdsArray',newIdsArray)

        axios.post('api/studyexecute/get-studying-cards',{
          card_ids: newIdsArray
        }).then(res => {
          console.log("세션 신규 카드 컨텐츠 : ",res.data.cards)
          const contents = res.data.cards.concat(this.state.contents)
          console.log('contents review exist',contents)
          const result = contents.filter((item, i) => {
            return (
              contents.findIndex((item2, j) => {
                return item._id === item2._id;
              }) === i
            );
          });

          //지금공부할 카드를 찾아서 지금스터디 통으로 저장하기
          const nowCard = result.find(item=>{
            console.log(item._id)
            if(readyToStudyId === item._id){
              return item
            }
          })
          //컨텐츠통에서 지금 공부할카드 삭제하기
          const removeNowCard = result.findIndex(function(item){
            return item._id === readyToStudyId
          })
          result.splice(removeNowCard, 1)
          console.log(removeNowCard)

          console.log('uniqueArr review exist',result)
          this.setState({
            contents:result,
            now_study:nowCard
          })
        })
    } else {
        const next_seq = Number(current_seq)+1
        sessionStorage.setItem('current_seq',next_seq);

        if(this.state.cardlist_studying.length < Number(current_seq)){
          if(this.state.continue_study === false) {
            this.showConfirm(this.continueStudy, this.finishStudy)
          } else {
            console.log("공부를 이어가기로 함")
            const resume_study_with_review_cards = card_ids_session.map(item => {
              if(item.detail_status.need_study_time_tmp !== null){
                if(new Date(item.detail_status.need_study_time_tmp) > now){
                  return item
                }
              }
            })
  
            const resume_study_filtered_data = resume_study_with_review_cards.filter(function (el) {
              return el != null;
            });
  
            const resume_sortValue = resume_study_filtered_data.slice()
            if(resume_sortValue){
              resume_sortValue.sort(function(a, b) { 
                return a.detail_status.need_study_time_tmp > b.detail_status.need_study_time_tmp ? 1 : a.detail_status.need_study_time_tmp < b.detail_status.need_study_time_tmp ? -1 : 0;
              });
              console.log("after sort:", resume_sortValue)
            }
            const getReviewCardIds = resume_sortValue.map(item =>{
              return item._id
            })
  
            if(resume_sortValue.length > 0){
              const ids = getReviewCardIds
              const readyToStudyId = ids[0]
              console.log('지금공부할 복습카드 아이디',readyToStudyId)
              const newIdsArray = ids.slice(0, 6)
              console.log('ids',ids)
              console.log('newIdsArray',newIdsArray)

              axios.post('api/studyexecute/get-studying-cards',{
                card_ids: newIdsArray
              }).then(res => {
                console.log("세션 신규 카드 컨텐츠 : ",res.data.cards)
                const contents = res.data.cards.concat(this.state.contents)
                console.log('contents review exist',contents)
                const result = contents.filter((item, i) => {
                  return (
                    contents.findIndex((item2, j) => {
                      return item._id === item2._id;
                    }) === i
                  );
                });
                //지금공부할 카드를 찾아서 지금스터디 통으로 저장하기
                const nowCard = result.find(item=>{
                  if(readyToStudyId === item._id){
                    return item
                  }
                })
                //컨텐츠통에서 지금 공부할카드 삭제하기
                const removeNowCard = result.findIndex(function(item){
                  return item._id === readyToStudyId
                })
                result.splice(removeNowCard, 1)

                this.setState({
                  contents:result,
                  now_study:nowCard
                })
              })
            } else {
              this.finishStudy()
            }


          }

          
        } else {
          const ids = reviewNotExist
          const readyToStudyId = ids[current_seq]
          const newIdsArray = ids.slice(current_seq, 6+Number(current_seq))
          if(newIdsArray.length === 0){
            if(this.state.continue_study === false) {
              this.showConfirm(this.continueStudy, this.finishStudy)
            } else {
              console.log("공부를 이어가기로 함")
              const resume_study_with_review_cards = card_ids_session.map(item => {
                if(item.detail_status.need_study_time_tmp !== null){
                  if(new Date(item.detail_status.need_study_time_tmp) > now){
                    return item
                  }
                }
              })
    
              const resume_study_filtered_data = resume_study_with_review_cards.filter(function (el) {
                return el != null;
              });
    
              const resume_sortValue = resume_study_filtered_data.slice()
              if(resume_sortValue){
                resume_sortValue.sort(function(a, b) { 
                  return a.detail_status.need_study_time_tmp > b.detail_status.need_study_time_tmp ? 1 : a.detail_status.need_study_time_tmp < b.detail_status.need_study_time_tmp ? -1 : 0;
                });
                console.log("after sort:", resume_sortValue)
              }
              const getReviewCardIds = resume_sortValue.map(item =>{
                return item._id
              })
    
              if(resume_sortValue.length > 0){
                const ids = getReviewCardIds
                const readyToStudyId = ids[0]
                const newIdsArray = ids.slice(0, 6)
                axios.post('api/studyexecute/get-studying-cards',{
                  card_ids: newIdsArray
                }).then(res => {
                  console.log("세션 신규 카드 컨텐츠 : ",res.data.cards)
                  const contents = res.data.cards.concat(this.state.contents)
                  console.log('contents review exist',contents)
                  const result = contents.filter((item, i) => {
                    return (
                      contents.findIndex((item2, j) => {
                        return item._id === item2._id;
                      }) === i
                    );
                  });
                  //지금공부할 카드를 찾아서 지금스터디 통으로 저장하기
                  const nowCard = result.find(item=>{
                    console.log(item._id)
                    if(readyToStudyId === item._id){
                      return item
                    }
                  })
                  //컨텐츠통에서 지금 공부할카드 삭제하기
                  const removeNowCard = result.findIndex(function(item){
                    return item._id === readyToStudyId
                  })
                  result.splice(removeNowCard, 1)

                  this.setState({
                    contents:result,
                    now_study:nowCard
                  })
                })
              } else {
                this.finishStudy()
              }
  
  
            }

          } else {
            axios.post('api/studyexecute/get-studying-cards',{
              card_ids: newIdsArray
            }).then(res => {
              const contents = this.state.contents.concat(res.data.cards)
              const result = contents.filter((item, i) => {
                return (
                  contents.findIndex((item2, j) => {
                    return item._id === item2._id;
                  }) === i
                );
              });
              //지금공부할 카드를 찾아서 지금스터디 통으로 저장하기
              const nowCard = result.find(item=>{
                if(readyToStudyId === item._id){
                  return item
                }
              })
              //컨텐츠통에서 지금 공부할카드 삭제하기
              const removeNowCard = result.findIndex(function(item){
                return item._id === readyToStudyId
              })
              result.splice(removeNowCard, 1)
              this.setState({
                contents:result,
                now_study:nowCard
              })
            })
          }
          
        }
       
    }

  }
  continueStudy = (value) => {
    this.setState({
      continue_study:value
    })
  }
  showConfirm = (event, event2) => {
    confirm({
      title: '학습이 끝났습니다. 복습시간전인 다음카드를 계속해서 보시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '학습계속하기',
      cancelText: '학습종료하기',
      onOk() {
        event()
      },
      onCancel() {
        event2()
      },
    });
  }
  

  milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);
    
  onClickDifficulty = (lev, id, book_id, interval, time_unit, card_level)=>{
    this.setState(prevState=>({
          clickCount:prevState.clickCount + 1
        }))

    const study_log_session = JSON.parse(sessionStorage.getItem('study_log'))

    const study_log = {seq:this.state.clickCount, card_id: id}
    if(study_log_session){
      study_log_session.push(study_log)
      sessionStorage.setItem('study_log',JSON.stringify(study_log_session));
      const back_seq = study_log_session[study_log_session.length - 1].seq
      sessionStorage.setItem('back_seq',back_seq+1);
    } else {
      sessionStorage.setItem('study_log',JSON.stringify([]));
      const study_log_session = JSON.parse(sessionStorage.getItem('study_log'))
      study_log_session.push(study_log)
      sessionStorage.setItem('study_log',JSON.stringify(study_log_session));
    }

    if(lev === "diffi1"){
      var diff_ratio = 0.2
    } else if(lev === "diffi2"){
      diff_ratio = 0.4
    } else if(lev === "diffi3"){
      diff_ratio = 0.6
    } else if(lev === "diffi4"){
      diff_ratio = 0.8
    } else if(lev === "diffi5"){
      diff_ratio = 1
    }

    const difficulty_stacked = JSON.parse(sessionStorage.getItem('cardlist_progress'))
    const difficulty_stacked_length = difficulty_stacked.length
    difficulty_stacked.find(item => {
      if(item.id === id){
        console.log(item.id)
        console.log(id)
        item.diff = diff_ratio;
        console.log(item.diff)
      }
    })

    sessionStorage.setItem('cardlist_progress',JSON.stringify(difficulty_stacked));
    const diffRatioArray = []
    difficulty_stacked.map(item => {
      diffRatioArray.push(item.diff)
    })
    const diffRatioSum = diffRatioArray.reduce((a, b) => a + b, 0)
    const averageStudyRatio = Number(diffRatioSum) / Number(difficulty_stacked_length) * 100
    const averageStudy = averageStudyRatio.toFixed(2);
    this.setState({
      study_ratio:averageStudy
    })

    //현재시간 기준
    const now = new Date();

    //세션스토리지에서 카드리스트 정보 가져오기
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))

    //해당 카드 인텍스 찾기
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === id
    })
    //현재카드 학습정보 조회
    const selectedCard = card_ids_session.find((item, index)=>{
      if(item._id === id){
        return item
      }
    })

    //세션스토리지에서 레벨설정 정보 가져오기
    const level_config_session = JSON.parse(sessionStorage.getItem('level_config'))
    console.log('경험치관련 level_config : ' , level_config_session)

    //현재카드가 속한 책의 레벨설정 정보 가져오기 
    const selected_card_book_level_config = level_config_session.find(item=>{
      if(item.book_id === book_id){
        return item
      }
    })

    //current_lev_study_times 기준으로 경험치 저장
    if(lev === "diffi5"){
      const current_lev_study_times_selected = selectedCard.detail_status.current_lev_study_times
      if(current_lev_study_times_selected === 0){
        var exp_gain = selected_card_book_level_config.exp_setting.one_time
      } else if(current_lev_study_times_selected === 1){
        exp_gain = selected_card_book_level_config.exp_setting.two_times
      } else if(current_lev_study_times_selected === 2){
        exp_gain = selected_card_book_level_config.exp_setting.three_times
      } else if(current_lev_study_times_selected === 3){
        exp_gain = selected_card_book_level_config.exp_setting.four_times
      } else if(current_lev_study_times_selected === 4){
        exp_gain = selected_card_book_level_config.exp_setting.five_times
      } else if(current_lev_study_times_selected > 4){
        exp_gain = selected_card_book_level_config.exp_setting.five_times
      }
  
      const prev_exp = card_ids_session[selectedIndex].detail_status.exp_stacked
      const exp_will_add = prev_exp + exp_gain
      if(exp_will_add < 0 ) {
        var exp_final = 0
      } else {
        exp_final = exp_will_add
      }
      console.log(exp_gain)
      card_ids_session[selectedIndex].detail_status.exp_stacked = exp_final
      card_ids_session[selectedIndex].detail_status.exp_gained = exp_gain

      const gained_level = Math.floor((prev_exp + exp_gain) / 1000)
      console.log("획득 레벨 : ",gained_level)
      
      const diffi5_stacked = sessionStorage.getItem('diffi5_stacked')
      const addDiff5 = Number(diffi5_stacked)+1
      sessionStorage.setItem('diffi5_stacked', addDiff5);
      const sessionLength = card_ids_session.length
      const new_average = (addDiff5 / sessionLength) * 100
      const average = new_average.toFixed(2);
      this.setState({
        average_completed:average
      })

      // if(gained_level === 1 || gained_level <= 0) {
      //   var interval_diffi5 = selected_card_book_level_config.lev_setting.lev_1.interval
      //   var time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_1.time_unit
      // } else if(gained_level >= 10){
      //   interval_diffi5 = selected_card_book_level_config.lev_setting.lev_10.interval
      //   time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_10.time_unit
      // } else {
      //   interval_diffi5 = selected_card_book_level_config.lev_setting['lev_'+gained_level].interval
      //   time_unit_diffi5 = selected_card_book_level_config.lev_setting['lev_'+gained_level].time_unit
      // }

      if(gained_level === 1 ){
        var interval_diffi5 = selected_card_book_level_config.lev_setting.lev_1.interval
        var time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_1.time_unit
      } else if(gained_level === 2 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_2.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_2.time_unit
      } else if(gained_level === 3 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_3.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_3.time_unit
      } else if(gained_level === 4 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_4.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_4.time_unit
      } else if(gained_level === 5 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_5.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_5.time_unit
      } else if(gained_level === 6 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_6.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_6.time_unit
      } else if(gained_level === 7 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_7.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_7.time_unit
      } else if(gained_level === 8 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_8.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_8.time_unit
      } else if(gained_level === 9 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_9.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_9.time_unit
      } else if(gained_level >= 10 ){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_10.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_10.time_unit
      } else if(gained_level <= 0){
        interval_diffi5 = selected_card_book_level_config.lev_setting.lev_1.interval
        time_unit_diffi5 = selected_card_book_level_config.lev_setting.lev_1.time_unit
      }

      const now_mili_convert = Date.parse(now);
      if(time_unit_diffi5 === "min"){
        var result = this.milliseconds(0, interval_diffi5, 0);
      } else if(time_unit_diffi5 === "hour"){
        result = this.milliseconds(interval_diffi5, 0, 0);
      } else if(time_unit_diffi5 === "day"){
        result = this.milliseconds(interval_diffi5*24, 0, 0);
      }

      const need_review_time = now_mili_convert + result
      const review_date = new Date(need_review_time)
      card_ids_session[selectedIndex].detail_status.need_study_time = review_date
      card_ids_session[selectedIndex].detail_status.need_study_time_tmp = null
      const final_level = gained_level
      if(final_level < 0){
        var level_save = 0
      } else if(final_level > 10) {
        level_save = 10
      } else {
        level_save = final_level
      }
      
      card_ids_session[selectedIndex].detail_status.level = level_save
      card_ids_session[selectedIndex].detail_status.current_lev_study_times = 0
      card_ids_session[selectedIndex].detail_status.status_in_session = "off"

    }    

    //세션내에 해당 카드 학습횟수 저장 (해당세션내에서 학습횟수 출력위한 정보)
    const prev_session_study_times = card_ids_session[selectedIndex].detail_status.session_study_times
    card_ids_session[selectedIndex].detail_status.session_study_times = prev_session_study_times + 1

    //카드 상태값 former 과 status 관리
    const prev_session_status = card_ids_session[selectedIndex].status
    card_ids_session[selectedIndex].former_status = prev_session_status
    card_ids_session[selectedIndex].status = 'ing'
    

    //해당 카드가 마지막 알겠음 버튼 클릭 후 학습횟수 (레벨설정에서 경험치 증감 기준을 위한 학습횟수 정보)
    if(lev !== "diffi5"){
      const prev_current_lev_study_times = card_ids_session[selectedIndex].detail_status.current_lev_study_times
      card_ids_session[selectedIndex].detail_status.current_lev_study_times = prev_current_lev_study_times + 1
    }
    

    //해당 카드의 총 학습횟수 저장
    const prev_total_study_times = card_ids_session[selectedIndex].detail_status.total_study_times
    card_ids_session[selectedIndex].detail_status.total_study_times = prev_total_study_times + 1

    //선택한 난이도 저장 
    card_ids_session[selectedIndex].detail_status.recent_difficulty = lev

    //해당카드 학습경과시간
    card_ids_session[selectedIndex].detail_status.recent_study_hour = this.state.time

    //해당카드 총 학습경과시간
    const prev_total_study_hour = card_ids_session[selectedIndex].detail_status.total_study_hour
    card_ids_session[selectedIndex].detail_status.total_study_hour = prev_total_study_hour + this.state.time

    //해당카드 학습시간
    card_ids_session[selectedIndex].detail_status.recent_study_time = now
    
    //복습시간 저장
    if(lev !== 'diffi5'){
      const now_mili_convert = Date.parse(now);
      if(time_unit === "min"){
        var result2 = this.milliseconds(0, interval, 0);
      } else if(time_unit === "hour"){
        result2 = this.milliseconds(interval, 0, 0);
      } else if(time_unit === "day"){
        result2 = this.milliseconds(interval*24, 0, 0);
      }
      const need_review_time = now_mili_convert + result2
      const review_date = new Date(need_review_time)
      card_ids_session[selectedIndex].detail_status.need_study_time = review_date
      card_ids_session[selectedIndex].detail_status.need_study_time_tmp = review_date
    }

    //해당카드 최종 업데이트 콘솔로그
    console.log('card_ids_session updated!!',card_ids_session[selectedIndex].detail_status)
    const updateThis = card_ids_session[selectedIndex]
    const getUpdateThis = JSON.parse(sessionStorage.getItem('cardlist_to_send'))

    if(getUpdateThis){
      var finalUpdate = getUpdateThis.concat(updateThis)
    } else {
      finalUpdate = [updateThis]
    }
    
    sessionStorage.setItem('cardlist_to_send',JSON.stringify(finalUpdate));
    const cardlist_to_send = JSON.parse(sessionStorage.getItem('cardlist_to_send'))
    console.log('cardlist_to_send',cardlist_to_send)

    if(cardlist_to_send.length > 5){
      console.log("서버에 학습데이타를 전송할 시간이다!!!!")
      
      const sessionId = sessionStorage.getItem('sessionId')
      axios.post('api/studyresult/create-studyresult',{
        cardlist_studied: cardlist_to_send,
        session_id:sessionId
      }).then(res => {
        console.log("학습정보 전송완료!!!",res.data)        
        sessionStorage.removeItem('cardlist_to_send')
      })

    }

    //세션스토리지에 최종 저장
    console.log('before saving',card_ids_session)
    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));
    const updatedSession = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    console.log(updatedSession)

    //데이터 저장 후 서버에 새카드 요청
      this.getCardContentsAdd()
    

    //this.state.contents에서 지금 공부한 카드 제거 / 다음카드로 넘어갈때 현카드 학습시간 초기화 / 카드 뒤집기를 정방향으로 되돌리기
    const list = this.state.contents.filter(item => item._id !== id);
    this.setState({
      contents:list
    }, function(){
      this.stopTimerTotal()
      this.resetTimer()
    })
    this.setState({
      page_toggle:false
    })
    console.log('here : ',list)
  }

  onClickPage = () => {
    console.log('page clicked to flip')
      this.setState(prevState => ({
        page_toggle: !prevState.page_toggle
      })
    )
  }
  userFlagChange =(flag, id) =>{
    console.log(flag, id)
      // axios.post('api/studyexecute/save-userflag',{
      //   card_id: id,
      //   flag: flag
      // }).then(res => {
      //   console.log("세션 신규 카드 컨텐츠 : ",res.data)
      //   const contents = res.data.cards.concat(this.state.contents)
      //   console.log('contents review exist',contents)
      // })
    }
  onClickBack = () =>{
    const current_seq = sessionStorage.getItem("current_seq")
    const study_log_session = JSON.parse(sessionStorage.getItem('study_log'))
    const back_seq = sessionStorage.getItem('back_seq')
    if(back_seq){
      const new_back_seq = back_seq -1
      sessionStorage.setItem('back_seq',new_back_seq);
    } else {
      console.log(study_log_session)
      if(study_log_session){
        const back_seq = study_log_session[study_log_session.length - 1].seq
        sessionStorage.setItem('back_seq',back_seq);
      } else {
        return alert("이전카드가 없습니다.")
      }
      
    }

    const current_back_seq = sessionStorage.getItem('back_seq')
    if(study_log_session){
      //한번이상 이전카드보기 버튼을 클릭시 current_seq가 -1씩 감소하는 문제.
      const current_seq = sessionStorage.getItem("current_seq")
      const next_seq = Number(current_seq) -1
      sessionStorage.setItem('current_seq',next_seq);

      const back_card = study_log_session.find(item=>{
        if(item.seq === Number(current_back_seq)){
          return item
        }
      })
      axios.post('api/studyexecute/get-studying-cards',{
        card_ids:[back_card.card_id]
      }).then(res => {
        this.setState({
          now_study:res.data.cards[0]
        })
      })
    } else {
      alert("이전카드가 없습니다.")
      // return this.getCardContentsAdd()
    }
    
  }

  onClickNext = () =>{
    console.log("Next clicked!!!!")
    console.log(this.state.now_study)
    const current_card_id = this.state.now_study._id
    //세션스토리지에서 카드리스트 정보 가져오기
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))

    //해당 카드 인텍스 찾기
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === current_card_id
    })

    card_ids_session[selectedIndex].detail_status.status_in_session = "off"
    card_ids_session[selectedIndex].detail_status.need_study_time_tmp = null

    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));
    const current_seq = sessionStorage.getItem("current_seq")
    const next_seq = Number(current_seq)-1
    sessionStorage.setItem('current_seq',next_seq);

    this.getCardContentsAdd()
  }

  onClickHold = () =>{
    console.log("Hold clicked!!!!!")
    console.log(this.state.now_study)
    const current_card_id = this.state.now_study._id
    //세션스토리지에서 카드리스트 정보 가져오기
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))

    //해당 카드 인텍스 찾기
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === current_card_id
    })

    card_ids_session[selectedIndex].detail_status.status_in_session = "off"
    card_ids_session[selectedIndex].detail_status.need_study_time_tmp = null
    card_ids_session[selectedIndex].status = "hold"

    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));
    const current_seq = sessionStorage.getItem("current_seq")
    const next_seq = Number(current_seq)-1
    sessionStorage.setItem('current_seq',next_seq);


    const updateThis = card_ids_session[selectedIndex]
    const getUpdateThis = JSON.parse(sessionStorage.getItem('cardlist_to_send'))
    console.log(getUpdateThis)
    if(getUpdateThis){
      var finalUpdate = getUpdateThis.concat(updateThis)
    } else {
      finalUpdate = [updateThis]
    }
    
    sessionStorage.setItem('cardlist_to_send',JSON.stringify(finalUpdate));
    this.getCardContentsAdd()
  }

  onClickCompleted = () =>{
    console.log("Complete clicked!!!!!")
    console.log(this.state.now_study)
    const current_card_id = this.state.now_study._id
    //세션스토리지에서 카드리스트 정보 가져오기
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))

    //해당 카드 인텍스 찾기
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === current_card_id
    })

    card_ids_session[selectedIndex].detail_status.status_in_session = "off"
    card_ids_session[selectedIndex].detail_status.need_study_time_tmp = null
    card_ids_session[selectedIndex].status = "completed"

    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));
    const current_seq = sessionStorage.getItem("current_seq")
    const next_seq = Number(current_seq)-1
    sessionStorage.setItem('current_seq',next_seq);


    const updateThis = card_ids_session[selectedIndex]
    const getUpdateThis = JSON.parse(sessionStorage.getItem('cardlist_to_send'))
    console.log(getUpdateThis)
    if(getUpdateThis){
      var finalUpdate = getUpdateThis.concat(updateThis)
    } else {
      finalUpdate = [updateThis]
    }
    
    sessionStorage.setItem('cardlist_to_send',JSON.stringify(finalUpdate));

    this.getCardContentsAdd()
  }

  reStateHold = (id_of_content) => {
    console.log('reStateHold clicked!!!')
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === id_of_content
    })

    card_ids_session[selectedIndex].detail_status.status_in_session = "on"
    card_ids_session[selectedIndex].detail_status.need_study_time_tmp = new Date()
    card_ids_session[selectedIndex].status = "ing"
    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));

    const selected_content = this.state.now_study
    console.log(selected_content)
    selected_content['status_change'] = true
    console.log(selected_content)
    this.setState({
      now_study:selected_content
    })

  }
  
  reStateCompleted = (id_of_content) => {
    console.log('reStateCompleted clicked!!!')
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === id_of_content
    })

    card_ids_session[selectedIndex].detail_status.status_in_session = "on"
    card_ids_session[selectedIndex].detail_status.need_study_time_tmp = new Date()
    card_ids_session[selectedIndex].status = "ing"
    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));

    const selected_content = this.state.now_study
    console.log(selected_content)
    selected_content['status_change'] = true
    console.log(selected_content)
    this.setState({
      now_study:selected_content
    })
  }


  render() {
    const style_study_layout_container ={
      display:"flex",
      flexDirection:"column",
      height:"45px",
    }
    const style_study_layout_top ={
      display:"flex",
      flexDirection:"row",
      width:"1000px",
      margin:"auto",
    }
    const style_study_layout_top_left ={
      display:"flex",
      flexDirection:"row",
      width:"50%",
      alignItems:"center",
      justifyContent:"space-between",
      marginRight:"15px"
    }
    const style_study_layout_top_right ={
      display:"flex",
      flexDirection:"row",
      width:"40%",
      justifyContent:"space-between",
      border:"1px solid lightgrey",
      borderRadius:"10px",
      backgroundColor:"white",
      padding:5,
      paddingBottom:0,
      fontSize:"12px"
    }
    const style_study_layout_bottom ={
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      width:"1410px",
      margin:"auto",
      marginTop:"10px"
    }
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <DefaultButton size="small" onClick={this.onClickBack} width="200px"><span style={{fontWeight:"bold"}}>이전</span><span style={{fontSize:"9px"}}>(이전학습카드로 이동)</span></DefaultButton>
        </Menu.Item>
        <Menu.Item key="1">
        <DefaultButton size="small" onClick={this.onClickNext} width="200px"><span style={{fontWeight:"bold"}}>통과</span><span style={{fontSize:"9px"}}>(이번세션에서 제외)</span></DefaultButton>
        </Menu.Item>
        {/* <Menu.Divider /> */}
        <Menu.Item key="3">
        <DefaultButton size="small" onClick={this.onClickHold} width="200px"><span style={{fontWeight:"bold"}}>보류</span><span style={{fontSize:"9px"}}>(복구 시까지 학습보류)</span></DefaultButton>
        </Menu.Item>
        <Menu.Item key="4">
        <DefaultButton size="small" onClick={this.onClickCompleted} width="200px"><span style={{fontWeight:"bold"}}>졸업</span><span style={{fontSize:"9px"}}>(만렙찍고 향후 학습제외)</span></DefaultButton>
        </Menu.Item>
      </Menu>
    );
    const nicks = []
    const interval = []
    const time_unit = []

    if(this.state.now_study){
      var id_of_content = this.state.now_study._id

      if(this.state.now_study.contents.user_flag[0] === "flag_1"){
        var user_flag = <FlagFilled style={{cursor:"pointer", fontSize:"15px",color:"red"}}/>
      } else if(this.state.now_study.contents.user_flag[0] === "flag_2") {
        user_flag = <FlagFilled style={{cursor:"pointer", fontSize:"15px",color:"orange"}}/>
      } else if(this.state.now_study.contents.user_flag[0] === "flag_3") {
        user_flag = <FlagFilled style={{cursor:"pointer", fontSize:"15px",color:"yello"}}/>
      } else if(this.state.now_study.contents.user_flag[0] === "flag_4") {
        user_flag = <FlagFilled style={{cursor:"pointer", fontSize:"15px",color:"green"}}/>
      } else if(this.state.now_study.contents.user_flag[0] === "flag_5") {
        user_flag = <FlagFilled style={{cursor:"pointer", fontSize:"15px",color:"blue"}}/>
      } else {
        user_flag = <FlagFilled style={{border:"1px dashed lightgrey",color:"white"}}/>
      }
      
      const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
     
      const selected_content = card_ids_session.find(item => {
        if(item._id === id_of_content){
          return item
        }
      })
      var card_status = selected_content.status
      

      var level_revealed = selected_content.detail_status.level
      var current_lev_study_times_selected = selected_content.detail_status.current_lev_study_times

      var first_face_data = this.state.now_study.contents.face1.map(item => <FroalaEditorView key={this.getKey()} model={item}/>)
      var second_face_data = this.state.now_study.contents.face2.map(item => <FroalaEditorView key={this.getKey()} model={item}/>)
      // var annotation_data = this.state.now_study._id.content_of_annot.map(item => <FroalaEditorView model={item}/>)
      
      var book_id = this.state.now_study.book_id
      const level_config_sessionStorage = JSON.parse(sessionStorage.getItem('level_config'))
      level_config_sessionStorage.map((item)=>{
        if(item.book_id === this.state.now_study.book_id){

          for(var i=0;i<5;i++){
            nicks.push(item.difficulty_setting['diffi'+(i+1)].nick)
          }

          for(var i=0;i<4;i++){
            interval.push(item.difficulty_setting['diffi'+(i+1)].interval)
          }
          
          if(level_revealed === 0){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_0.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_0.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_0.interval)
            }
          } else if(level_revealed === 1){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_0.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_0.interval)
            }
          } else if(level_revealed === 2){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_1.interval)
            }
          } else if(level_revealed === 3){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_2.interval)
            }
          } else if(level_revealed === 4){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_3.interval)
            }
          } else if(level_revealed === 5){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_4.interval)
            }
          } else if(level_revealed === 6){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_5.interval)
            }
          } else if(level_revealed === 7){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_6.interval)
            }
          } else if(level_revealed === 8){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_7.interval)
            }
          } else if(level_revealed === 9){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_8.interval)
            }
          } else if(level_revealed === 10){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_9.interval)
            }
          }

          //일반난이도 시간 단위 
          for(var i=0;i<4;i++){
            time_unit.push(item.difficulty_setting['diffi'+(i+1)].time_unit)
          }

          //알겠음 난이도 시간단위
          time_unit.push(item.lev_setting['lev_'+level_revealed].time_unit)   

        }
      })
    } 

    return (
      <div style={style_study_layout_container} className="study_layout_container">
        <div style={style_study_layout_top} className="study_layout_top">
          <ul style={style_study_layout_top_left} className="study_layout_top_left">
            <li style={{marginRight:"10px"}}><Avatar size="large" icon={<UserOutlined />} /></li>
            <li style={{marginRight:"10px", width:"320px"}}>
              <ul>
                <li style={{display:"flex",alignItems:"center",marginBottom:"3px"}}><span style={{marginRight:"10px", width:"40px", fontSize:"11px"}}>완료율</span><ProgressBar bgcolor={"#32c41e"} completed={this.state.average_completed} /></li>
                <li style={{display:"flex",alignItems:"center"}}><span style={{marginRight:"10px", width:"40px", fontSize:"11px"}}>학습율</span><ProgressBar bgcolor={"#a1bbe9"} completed={this.state.study_ratio} /></li>
              </ul>
            </li>
            <li><DefaultButton style={{height:"45px", borderRadius:"10px"}}>학습카드추가</DefaultButton></li>
          </ul>
          <div style={{flex:1, border:"1px solid lightgrey", marginRight:"10px", borderRadius:"10px",lineHeight:"45px", textAlign:'center', fontSize:"30px", backgroundColor:"white"}}>{this.state.clickCount}</div>
          <div style={style_study_layout_top_right} className="study_layout_top_right">
            <Timer 
                  startTimer={this.startTimer} 
                  startTimerTotal={this.startTimerTotal} 
                  stopTimerTotal={this.stopTimerTotal}
                  startTimerResume={this.startTimerResume}
                  time={this.state.time}
                  isOn={this.state.isOn}
                  start={this.state.start}
                  time_total={this.state.time_total}
                  isOn_total={this.state.isOn_total}
                  start_total={this.state.start_total}
            />
          </div>
        </div>
        <div style={style_study_layout_bottom} className="study_layout_middle">
          <div style={{width:"200px", textAlign:"right", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div></div>
            <div style={{width:'30px', height:"30px", textAlign:"center"}}>          
              <Popover
                content={[<div style={{display:"flex", flexDirection:"column", height:"200px", justifyContent:"space-around"}}>
                            <FlagFilled onClick={() => this.userFlagChange("flag_1", id_of_content)} style={{cursor:"pointer", fontSize:"15px",color:"red"}}/>
                            <FlagFilled onClick={() => this.userFlagChange("flag_2", id_of_content)} style={{cursor:"pointer", fontSize:"15px",color:"orange"}}/>
                            <FlagFilled onClick={() => this.userFlagChange("flag_3", id_of_content)} style={{cursor:"pointer", fontSize:"15px",color:"yello"}}/>
                            <FlagFilled onClick={() => this.userFlagChange("flag_4", id_of_content)} style={{cursor:"pointer", fontSize:"15px",color:"green"}}/>
                            <FlagFilled onClick={() => this.userFlagChange("flag_5", id_of_content)} style={{cursor:"pointer", fontSize:"15px",color:"blue"}}/>
                            <SettingOutlined style={{cursor:"pointer", fontSize:"15px",color:"black"}}/>
                          </div>]}
                trigger="click"
                placement="bottom"
                // visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <div style={{border:"1px solid lightgrey", 
                            cursor:"pointer",height:"30px", width:'30px',
                            lineHeight:"30px", borderRadius:"5px"}} 
                            type="primary">{user_flag}</div>
              </Popover>
          </div>
          
          </div>
          <div style={{width:"1000px", border:"1px solid lightgrey", borderRadius:"10px"}}>
            <div onClick={this.onClickPage} style={{ height:"600px", backgroundColor:"white", padding:"10px", borderRadius:"10px 10px 0 0", display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{position:"relative", height:"50%", width:"100%", border:"1px dashed lightgrey", borderRadius:"5px"}}>
                <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>{first_face_data}</div>
              </div>
              <div style={{position:"relative", height:"50%", width:"100%", border:"1px dashed lightgrey", borderRadius:"5px"}}>
                <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>{this.state.page_toggle? second_face_data : null}</div>
              </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"70px", alignItems:"center", backgroundColor:"#e9e9e9", padding:"10px 90px", borderRadius:"0 0 10px 10px"}}>
              {card_status === "hold" && <DefaultButton size="large" onClick={()=>this.reStateHold(id_of_content)} style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", flex:1, marginRight:"20px"}}>학습중카드로 복구하기</DefaultButton>}
              {card_status === "completed" && <DefaultButton size="large" onClick={()=>this.reStateCompleted(id_of_content)} style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", flex:1, marginRight:"20px"}}>학습중카드로 복구하기</DefaultButton>}
              {card_status === "hold" ? '' : card_status === "completed" ? '' : <>
              <DefaultButton size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi1", id_of_content,book_id, interval[0], time_unit[0], level_revealed)}>{nicks[0]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[0]}{time_unit[0]})</div></DefaultButton>
              <DefaultButton size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi2", id_of_content,book_id, interval[1], time_unit[1], level_revealed)}>{nicks[1]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[1]}{time_unit[1]})</div></DefaultButton>
              <DefaultButton size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi3", id_of_content,book_id, interval[2], time_unit[2], level_revealed)}>{nicks[2]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[2]}{time_unit[2]})</div></DefaultButton>
              <DefaultButton size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi4", id_of_content,book_id, interval[3], time_unit[3], level_revealed)}>{nicks[3]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[3]}{time_unit[3]})</div></DefaultButton>
              <DefaultButton size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi5", id_of_content,book_id, interval[4], time_unit[4], level_revealed)}>{nicks[4]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[4]}{time_unit[4]})</div></DefaultButton>
              </>} 
              <DefaultButton size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px", backgroundColor:"#7dbde1"}}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>패스 <DownOutlined /></span>
                </Dropdown>
              </DefaultButton>
            </div>
          </div>
          <div style={{width:"200px", border:"1px solid lightgrey", borderRadius:"10px"}}>side 영역</div>
        </div>
      </div>
    );
  }
}

export default FlipMode;