import React, { Component } from 'react';
import axios from "axios"
import {Row, Col, Tabs } from 'antd';
import BookTitleList from './BookTitleList/BookTitleList'
import "./ChooseIndex.css"
import ReadModeTab from './StudyModeTab/ReadModeTab';
import FlipModeTab from './StudyModeTab/FlipModeTab';
import ExamModeTab from './StudyModeTab/ExamModeTab';

const { TabPane } = Tabs;

class ChooseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books:[],
      book_and_index_ids:[],
      num_new:0,
      num_need_study:0,
      num_total:0,
      selected_index_num : 0,
      mode: "normal",
      order:"normal",
      reviewDetail:"all",
      reviewDetailDetail:"now",
      reviewToggle:true,
      newToggle:true,
      newCardNum:0,
      reviewCardNum:0,
      visible: false,
      hold:false,
      completed:false,
      holdCardNum:0,
      completedCardNum:0,
      tab_mode: 'left',
      key:'read',
      expand:true,
      selected_index:[],
      study_config:'',
      advanced_filter:''
     }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    console.log("ok clicked")
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    sessionStorage.removeItem('sessionId')
    sessionStorage.removeItem('selectedIndex')
    sessionStorage.removeItem('cardlist_to_send')
    sessionStorage.removeItem('exp_gained')
    sessionStorage.removeItem('exp_gained_card_count')
    sessionStorage.removeItem('cardlist_studying')
    sessionStorage.removeItem('diffi5_stacked');
    sessionStorage.removeItem('cardlist_progress');
    sessionStorage.removeItem('study_log')
    sessionStorage.removeItem('back_seq');
    this.getIndex()
    this.getStudyConfig()
  }


  getIndex = () =>{
    const value = JSON.parse(sessionStorage.getItem("book_ids"))
    value.forEach((item) => {
       axios.post('api/studysetup/get-index',{
        selected_books:item
      }).then(res => {
        console.log('IndexData:', res.data)
        this.setState({
          books:[...this.state.books, res.data.single_book_info]
        })
        console.log("this fire-----------------------------", res.data.isloggedIn)
        this.props.updatedLoginState(res.data.isloggedIn)
      })
    })
  }

  getStudyConfig = () => {
    const value = JSON.parse(sessionStorage.getItem("book_ids"))
    axios.post('api/studysetup/get-study-config',{
      selected_books:value
    }).then(res => {
      console.log('StudyConfigData:', res.data)
      sessionStorage.setItem('advanced_filter_axios', JSON.stringify(res.data.advanced_filter))
      sessionStorage.setItem('study_config_axios', JSON.stringify(res.data.study_config))
      this.setState({
        study_config:res.data.study_config,
        advanced_filter:res.data.advanced_filter
      })
    })
  }
  
  onChangeNewCardNum = (e) =>{
    console.log(e.target.value)
    this.setState({
      newCardNum : e.target.value
    })
  }
  onChangeReviewCardNum = (e) =>{
    console.log(e.target.value)
    this.setState({
      reviewCardNum : e.target.value
    })
  }

  onChangeMode = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      mode: e.target.value,
    });
  };

  onChangeOrder = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      order: e.target.value,
    });
  };

  onClickUp = (value) => {
    console.log(value)
    const session_id = sessionStorage.getItem("session_id")
    axios.post('api/studysetup/click-up',{
      book_id: value,
      session_id: session_id,
      status: 'up'
    }).then(res=>{
      console.log(res)
      this.setState( {
        books:res.data.booksnindexes
        }
      )
    })
  }
  onClickDown = (value) => {
    console.log(value)
    const session_id = sessionStorage.getItem("session_id")
    axios.post('api/studysetup/click-down',{
      book_id: value,
      session_id: session_id,
      status: 'down'
    }).then(res=>{
      console.log(res)
      this.setState( {
        books:res.data.booksnindexes
        }
      )
    })
  }
  
  onChangeNew = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      newToggle:checked
    })
  }
  onChangeReview = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      reviewToggle:checked
    })
  }
  onChangeHold = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      hold:checked
    })
  }
  onChangeCompleted = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      completed:checked
    })
  }
  onChangeReviewDetail = (checked) => {
    console.log(`switch to ${checked}`);
    console.log(checked.target.value)
    this.setState({
      reviewDetail:checked.target.value
    })
  }
  onChangeReviewDetailDetail = (checked) => {
    console.log(`switch to ${checked}`);
    console.log(checked.target.value)
    this.setState({
      reviewDetailDetail:checked.target.value
    })
  }
  onChangeHoldCardNum = (e) => {
    this.setState({
      holdCardNum:e.target.value
    })
  }
  onChangeCompletedCardNum = (e) => {
    this.setState({
      completedCardNum:e.target.value
    })
  }
  handleTabChange =(key) => {
    this.setState({
      key:key
    })
  }

  onFinish = (values) => {
    sessionStorage.setItem('current_seq',0);
    sessionStorage.removeItem('cardlist_studying');
    console.log('Success:', values);
    const rangeValue = values['ing_card_self_setting'];
    console.log('rangeValue', rangeValue)
    if(rangeValue === undefined){
      var low = undefined
      var high = undefined
    } else {
      low = rangeValue[0].format('YYYY-MM-DD')
      high = rangeValue[1].format('YYYY-MM-DD')
    }

    if(values.read_card === true){
      var read_card = "on"
    } else {
      read_card = "off"
    }
    if(values.flip_card === true){
      var flip_card = "on"
    } else {
      flip_card = "off"
    }
    if(values.yet === true){
      var yet = "on"
    } else {
      yet = "off"
    }
    if(values.ing === true){
      var ing = "on"
      var collect_criteria = values.collect_criteria
    } else {
      ing = "off"
      collect_criteria = undefined
    }
    if(values.hold === true){
      var hold = "on"
    } else {
      hold = "off"
    }
    if(values.completed === true){
      var completed = "on"
    } else {
      completed = "off"
    }
    if(values.study_quantity_use_switch === true){
      var study_quantity_use_switch = "on"
    } else {
      study_quantity_use_switch = "off"
    }

    // if(values.advanced_filter_mode === true){
    //   var advanced_filter_mode = "on"
    // } else {
    //   advanced_filter_mode = "off"
    // }

    const study_config = {            
      sort_option : values.sort_option,   //standard, time, random     
      card_on_off : {
          read_card : read_card,
          flip_card : flip_card,
      },
      status_on_off : {
          yet : yet,
          ing : ing,            
          hold : hold,
          completed : completed,
      },
      collect_criteria : collect_criteria, //all, by_now, by_today
      needstudytime_filter : {
          low : low,
          high : high
      },
      num_cards : {            
          on_off : study_quantity_use_switch,
          yet : values.yet_card_num,
          ing : values.ing_card_num,
          hold : values.hold_card_num,
          completed : values.completed_card_num,
      },
    }
    console.log('study_config',study_config)

    const books = this.state.books
    console.log('books',books)
    const indexes = JSON.parse(sessionStorage.getItem("selectedIndex"))
    const booksSlice = JSON.parse(JSON.stringify( books ))
    console.log('indexes',indexes)
    console.log('booksSlice',booksSlice)
    if(indexes === null){
      return alert("목차를 선택하여 주십시오.")
    }
    if(indexes.length === 0){
      return alert("목차를 선택하여 주십시오.")
    }
    indexes.forEach(index => {
      booksSlice.forEach(book => {
          book.index_info.forEach(item =>{
            if(item._id === index){
              book.index_info.push(index)
              book.index_info.filter(function (el) {
                return el._id !== index;
              })
            }
          })
      })
    })
    booksSlice.forEach(book=>{
        const indexGet = []
        book.index_info.forEach((element)=>{
          if(typeof(element) === 'object'){
            const index = book.index_info.indexOf(element)
            indexGet.push(index)
          }
        })
        book.index_info.splice(indexGet[0], indexGet.length);
      })
    console.log('books:',booksSlice)

    var output = booksSlice.map( s => {
      if ( s.hasOwnProperty("index_info") )
      {
         s.index_ids = s.index_info;
         delete s.index_info;   
      }
      return s;
    })
    console.log('output',output)
    const filter = JSON.parse(sessionStorage.getItem("advanced_filter_axios"))
    console.log('befor axios advanced filter',filter)
    axios.post('api/studysetup/create-session',{
      booksnindexes: output,
      study_mode: this.state.key,
      study_config:study_config,
      advanced_filter_on_off:values.advanced_filter_mode,
      advanced_filter:filter
    }).then(res=>{
      console.log(res.data)
      sessionStorage.setItem('sessionId', res.data.session_id)
      window.location.href="/start-study"
    })

  };

  applyAdvancedFilter = () => {
    const filter = JSON.parse(sessionStorage.getItem("advanced_filter"))
    // const rangeValueAdvanced = filter['recent_study_time'];
    // console.log('rangeValue', rangeValueAdvanced)

    // console.log('result',low, high)

    console.log('filter',filter)

    if(filter.user_flag_group === undefined){
      var user_flag_group = false
    } else {
      user_flag_group = true
    }
    if(filter.maker_flag_group === undefined){
      var maker_flag_group = false
    } else {
      maker_flag_group = true
    }
    if(filter.recent_study_time_group === undefined){
      var recent_study_time_group = false
    } else {
      recent_study_time_group = true
    }
    if(filter.level_group === undefined){
      var level_group = false
    } else {
      level_group = true
    }
    if(filter.study_times_group === undefined){
      var study_times_group = false
    } else {
      study_times_group = true
    }
    if(filter.difficulty_group === undefined){
      var difficulty_group = false
    } else {
      difficulty_group = true
    }
    if(filter.test_result_group === undefined){
      var test_result_group = false
    } else {
      test_result_group = true
    }

    const advanced_filter = {
      mode : filter.mode,

      user_flag_on_off : filter.user_flag_on_off,
      user_flag_group : user_flag_group,
      user_flag_value : filter.user_flag_value,
  
      maker_flag_on_off : filter.maker_flag_on_off,
      maker_flag_group : maker_flag_group,
      maker_flag_value : filter.maker_flag_value,
  
      recent_study_time_on_off : filter.recent_study_time_on_off,
      recent_study_time_group : recent_study_time_group,
      recent_study_time_value : filter.recent_study_time_value,
      recent_study_time_gap : filter.recent_study_time_gap,
  
      level_on_off : filter.level_on_off,
      level_group : level_group,
      level_value : [filter.level_from, filter.level_to],
  
      study_times_on_off : filter.study_times_on_off,
      study_times_group : study_times_group,
      study_times_value : [filter.study_times_from, filter.study_times_to],
  
      difficulty_on_off : filter.difficulty_on_off,
      difficulty_group : difficulty_group,
      difficulty_value : filter.difficulty_value,
  
      test_result_on_off : filter.test_result_on_off,
      test_result_group : test_result_group,
      test_result_value : filter.test_result_value,

      writer_on_off : false,
      writer_group : null,
      writer_value : null,
    }

    console.log(advanced_filter)
    sessionStorage.setItem('advanced_filter_axios', JSON.stringify(advanced_filter))

    this.setState({
      books:[]
    })
    const value = JSON.parse(sessionStorage.getItem("book_ids"))
    value.forEach((item) => {
       axios.post('api/studysetup/apply-advanced-filter',{
        selected_books:item,
        advanced_filter:advanced_filter
      }).then(res => {
        console.log('IndexData:', res.data)
        this.setState({
          books:[...this.state.books, res.data.single_book_info]
        })
      })
    })

  }


  updateExpandState = () => {
    this.setState((prevState)=>({expand:!prevState.expand}))
    console.log(this.state.expand)
  }
  render() { 
    return (
      <>      
        <div style={{display:"flex", flexDirection:"row"}}>
          <div>
            <div style={{height:"26px", lineHeight:"26px", backgroundColor:"#b1c6ec", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>책이름 및 목차선택</div>
            <BookTitleList onClickUp={this.onClickUp} 
                            onClickDown={this.onClickDown} 
                            books={this.state.books}
                            expand={this.state.expand}
                            updateExpandState={this.updateExpandState}/>
          </div>
          <div>
            <Tabs className="study_mode_class" defaultActiveKey={this.state.key} onChange={this.handleTabChange} type="card" size='small' tabPosition={this.state.tab_mode} >
              <TabPane tab="책모드" key="read" style={{textAlign:"left", padding:"10px"}}>
                <ReadModeTab applyAdvancedFilter={this.applyAdvancedFilter} study_config={this.state.study_config} advanced_filter={this.state.advanced_filter} onFinish={this.onFinish}/>
              </TabPane>
              <TabPane tab="카드모드" key="flip" style={{textAlign:"left", padding:"10px"}}>
                <FlipModeTab applyAdvancedFilter={this.applyAdvancedFilter} study_config={this.state.study_config} advanced_filter={this.state.advanced_filter} onFinish={this.onFinish}/>
              </TabPane>
              <TabPane tab="시험모드" key="exam" style={{textAlign:"left", padding:"10px"}}>
                <ExamModeTab applyAdvancedFilter={this.applyAdvancedFilter} study_config={this.state.study_config} advanced_filter={this.state.advanced_filter} onFinish={this.onFinish}/>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}

export default ChooseIndex;