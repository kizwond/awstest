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
      toggle:false
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
          <div style={{padding:'10px', fontSize:"11px", backgroundColor:"#5c89cf", borderBottom:"10px solid #b1c6ec"}}>
            <div style={{display:"flex", justifyContent:"space-between", color:"white"}}>
              <span>선택 영역에 포함된 카드의 학습정보</span>
              <span>※ 괄호안 숫자는 현재시각 기준으로 산출한 복습 필요 카드 수량입니다.</span>
            </div>
            <div style={{float:"right", marginBottom:"10px"}}>
              {this.state.toggle === true ? <Button size="small" onClick={this.onClickDetailHide}>간략보기</Button>: <Button size="small" onClick={this.onClickDetailHide}>상세보기</Button>}
            </div>
            <SelectedIndexCardCount books={this.props.books} />
          </div>
          <IndexTree book_id={book.book_id} 
                     book={book.index_info}
                     expand={this.props.expand}
                     updateExpandState={this.props.updateExpandState}/>
      </TabPane>
      )
    return (
        <Tabs style={{height:"100%",paddingLeft:"10px"}} className="study_next_page_tabs" tabPosition="left">
          {bookList}
        </Tabs>
    );
  }
}

export default BookTitleList;