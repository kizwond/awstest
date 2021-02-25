import React, { Component } from 'react';
import './LikeSectionContent.css'
import { StarTwoTone,StarOutlined,EyeOutlined,EyeInvisibleOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import CategoryMoveModal from './CategoryMoveModal'
import DeleteBook from './DeleteBookModal'
import ChangeBookTitle from './ChangeBookTitle'
import { Empty } from 'antd';
import axios from 'axios'

class LikeListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }

  render() { 
    return ( 
      <ul className="like_list_columns">
        <li>카테고리</li>
        <li>책제목</li>
        <li>제목변경</li>
        <li>구분</li>
        <li>저자</li>
        <li>총페이지</li>
        <li>최근30일작성카드</li>
        <li>카드종류</li>
        <li>생성일</li>
        <li>최근작성일</li>
        <li>카테고리 이동</li>
        <li>즐겨찾기</li>
        <li>순서이동</li>
        <li>보기</li>
        <li>삭제</li>
      </ul> 
    );
  }
}

class LikeListContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editBookTitle:false,
     }
  }

  editBookTitleHandler = () =>{
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  titleChangeHandleClick = ()=> {
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }

  // saveBookIdSession = (value)=> {
  //   console.log(value)
  //   axios.post('api/book/start-write',{
  //     book_id:value.book_id
  //   }).then(res => {
  //     console.log(res)
  //     window.location.href ="/editing"
  //   })
  // }

  saveBookIdSession = (value)=> {
    sessionStorage.setItem('book_id',value.book_id);
    window.location.href ="/editing"
    // console.log(value)
    // axios.post('api/book/start-write',{
    //   book_id:value.book_id
    // }).then(res => {
    //   console.log(res)
    //   window.location.href ="/editing"
    // })
  }

  eyeClickHandler = (value) =>{
    console.log('hide_or_show : ',value)
    axios.post('api/book/change-hide-or-show',{
      book_id : value.bookId,
      hide_or_show: value.value,
      seq_in_category: value.seq_in_category,
      seq_in_like: value.seq_in_like,
      category_id: value.category_id
    }).then(res => {
      this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
    })
  }

  listOrderHandler = (value) => {
    console.log(value)
    if(value.from === "list"){
      axios.post('api/book/change-book-order',{
        book_id : value.bookId,
        action : value.action,
        seq_in_category:value.seq_in_category,
        category_id: value.category_id
      }).then(res => {
        console.log('순서조정후 res:', res.data)
        this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
      })
    } else {
      axios.post('api/book/change-likebook-order',{
        book_id : value.bookId,
        action : value.action,
        seq_in_like:value.seq_in_like,
      }).then(res => {
        console.log('순서조정후 res:', res.data)
        this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
      })
    }
    
  }

  onClickLike = (value) => {
    console.log("like clicked!!! ")
    if (value.value === 'true') {
      var like = 'false'
    } else {
      like = 'true'
    }
    console.log("book_id :",value.bookId)
    console.log("like :",like)
    axios.post('api/book/apply-likebook',{
      book_id : value.bookId,
      like: like
    }).then(res => {
      this.props.updateState({value1: res.data.categorybooklist, value2: res.data.likebooklist})
    })
  }
  render() { 
    const info = this.props.bookInfo;
    const toggleProps = this.props.hideOrShowToggleState;
    const date = info.time_created.slice(0,10)
    const update_date = info.time_created.slice(0,10)

    const renderLike = () => {
      if(info.hide_or_show === true){
          if(info.like === true) {
            return <StarTwoTone onClick={()=>this.onClickLike({value:'true',bookId:this.props.bookInfo._id})} 
                                twoToneColor="#52c41a" 
                                style={{fontSize:'14px'}}/>
          }else {
            return <StarOutlined onClick={()=>this.onClickLike({value:'false',bookId:this.props.bookInfo._id})} 
                                 style={{fontSize:'14px'}}/>
          } 
        } else{
          return 
        }
      }
    return ( 
      <>
        {toggleProps === true ? 
          <>
          {info.like === true ? 
            <div className='like_list_contents'>
            <ul>
              <li>{info.category_id.name}</li>
              <li>
                {this.state.editBookTitle ? <ChangeBookTitle updateState={this.props.updateState}
                                                             bookTitle={info} 
                                                             onClick={this.titleChangeHandleClick}/> : 
                                            <><span onClick={()=>this.saveBookIdSession({book_id:info._id})} >{info.title}/순서 : {info.seq_in_like}</span></>}
              </li>
              <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
              <li>{info.type}</li>
              <li>{info.author}</li>
              <li>{info.num_pages}</li>
              <li>{info.num_cards.read.total}</li>
              <li>read {info.num_cards.read.total}장<br/>flip {info.num_cards.flip.total}장</li>
              <li>{date}</li>
              <li>{update_date}</li>
              <li><CategoryMoveModal updateState={this.props.updateState} category={this.props.category} bookTitle={info} /></li>
              <li>{renderLike()} </li>
              <li>{info.hide_or_show === true ? <><ArrowUpOutlined onClick={()=>this.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
                                                    <ArrowDownOutlined onClick={()=>this.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></> : ''}
                </li>
              <li>{info.hide_or_show === false ? <EyeInvisibleOutlined onClick={()=>this.eyeClickHandler({value:true,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>:
                                                  <EyeOutlined onClick={()=>this.eyeClickHandler({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>}</li>
              <li><DeleteBook bookTitle={info} updateState={this.props.updateState}  /></li>
            </ul>
          </div> 
          : ''} 
        </> 
          : <>
          {info.like === true  & info.hide_or_show === true? 
            <div className='like_list_contents'>
            <ul>
              <li>{info.category_id.name}</li>
              <li>
                {this.state.editBookTitle ? 
                    <ChangeBookTitle bookTitle={info} 
                      updateState={this.props.updateState}
                      onClick={this.titleChangeHandleClick}/> : 
                      <><span onClick={()=>this.saveBookIdSession({book_id:info._id})} >{info.title}/순서 : {info.seq_in_like}</span></>}
              </li>
              <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
              <li>{info.type}</li>
              <li>{info.author}</li>
              <li>{info.num_pages}</li>
              <li>{info.num_cards.read.total}</li>
              <li>read {info.num_cards.read.total}장<br/>flip {info.num_cards.flip.total}장</li>
              <li>{date}</li>
              <li>{update_date}</li>
              <li><CategoryMoveModal updateState={this.props.updateState} category={this.props.category} bookTitle={info} /></li>
              <li>{renderLike()} </li>
              <li>{info.hide_or_show === true ? <><ArrowUpOutlined onClick={()=>this.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
                                                    <ArrowDownOutlined onClick={()=>this.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></> : ''}
                </li>
              <li>{info.hide_or_show === false ? <EyeInvisibleOutlined onClick={()=>this.eyeClickHandler({value:true,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>:
                                                  <EyeOutlined onClick={()=>this.eyeClickHandler({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>}</li>
              <li><DeleteBook bookTitle={info} updateState={this.props.updateState}  /></li>
            </ul>
          </div> 
          : ''} 
        </> 
        }
      </>
     );
  }
}



class LikeSectionContent extends Component {
  render() { 
    if(this.props.bookTitle.length > 0){
      var bookList = this.props.bookTitle.map((book_title)=>(
        <LikeListContent key={book_title._id} 
                        updateState={this.props.updateState}
                        category={this.props.category}
                        bookInfo={book_title}/>
      ))
    } else {
      bookList = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    
    
    return ( 
      <div className="like_list_container">
        <LikeListColumns />
        <div className="like_list_container_div">
          {bookList}
        </div>
      </div>
     );
  }
}
 
export default LikeSectionContent;