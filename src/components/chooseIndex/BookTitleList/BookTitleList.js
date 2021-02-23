import React, { Component } from 'react';
import { Space, Tabs } from 'antd';
import "./BookTitleList.css"
import IndexTree from "./IndexTree/IndexTree"
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';
import SelectedIndexCardCount from './SelectedIndexCardCount'
import Button from '../../styledComponents/defaultButton'

const { TabPane } = Tabs;

class BookTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      toggle:false,
      checkedIndex:[]
     };
  }
  onClickDetailHide = () => {
    const element = document.getElementsByClassName("detail_info")
    for( var i = 0; i<element.length; i++){
      if(this.state.toggle === true){
        element[i].style.display = "none"
      } else {
        element[i].style.display = "block"
      }
    }
    this.setState({toggle:!this.state.toggle})
  }
  onCheckIndex = (value) =>{
    console.log('get_value---------------------------', value)
    this.setState({
      checkedIndex:value
    })
  }
  render() {
    const bookList = this.props.books.map((book)=> 
      <TabPane tab={
        <span>
          <Space>
          {book.title}
          <ArrowUpOutlined onClick={()=>this.props.onClickUp(book.book_id)}/>
          <ArrowDownOutlined onClick={()=>this.props.onClickDown(book.book_id)}/>
          </Space>
        </span>
        } key={book.book_id}>
          <div style={{padding:'10px', fontSize:"11px", }}>
            <div style={{display:"flex", justifyContent:"space-between", color:"black"}}>
              <span>선택 영역에 포함된 카드의 학습정보</span>
              <span>※ 괄호안 숫자는 현재시각 기준으로 산출한 복습 필요 카드 수량입니다.</span>
            </div>
            <div style={{float:"right", marginBottom:"10px"}}>
              {this.state.toggle === true ? <Button size="small" onClick={this.onClickDetailHide}>간략보기</Button>: <Button size="small" onClick={this.onClickDetailHide}>상세보기</Button>}
            </div>
            <SelectedIndexCardCount checkedIndex={this.state.checkedIndex} books={this.props.books} />
          </div>
          <IndexTree book_id={book.book_id} 
                     book={book.index_info}
                     expand={this.props.expand}
                     updateExpandState={this.props.updateExpandState}
                     onCheckIndex={this.onCheckIndex}/>
      </TabPane>
      )
    return (
      <>
        {/* <SelectedIndexCardCount checkedIndex={this.state.checkedIndex} books={this.props.books} /> */}
        <Tabs className="study_next_page_tabs" tabPosition="left">
          {bookList}
        </Tabs>
      </>
    );
  }
}

export default BookTitleList;