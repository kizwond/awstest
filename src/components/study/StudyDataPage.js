import React, { Component } from 'react';
import { Layout,message } from 'antd';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'
import StudyDataDefaultList from './StudyDataDefaultList'

const { Sider, Content } = Layout;

class StudyDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            book_list:[]
         }
    }
    componentDidMount() {    
        this.showTitle()
    }

    showTitle() {
        axios.get('api/book/get-booklist')
        .then(res => {
            console.log("get-booklist:",res.data)
            this.setState({
                book_list:res.data.categorybooklist
            })
        })
    }

    sessionSaveBookIds = () => {
        if(this.state.selected_book === undefined){
            return this.warning()
        }
        sessionStorage.setItem("book_ids", JSON.stringify(this.state.selected_book));
        window.location.href ="/session-setting"    
    }
    warning = () => {
        message.warning({
            content: '학습할 책을 선택해 주세요!!!',
            duration: 1,
            style: {
              marginTop: '10vh',
            },
        });
      };

    selectBook = (value)=> {
        console.log(value)
        const json = value.book_info
        this.setState({
            selected_book:json
        })
    }


    render() { 
        return (
            <>
                <div style={book_select_page_top}>
                    <h1 style={{fontFamily: `'Jua', sans-serif`,color:"#565656", fontSize:"14px"}}>학습할 책을 선택후 다음을 눌러주세요!!!</h1>
                    <Button size="small" width="100px" fontSize="14px" style={{marginBottom:"5px"}} onClick={this.sessionSaveBookIds}>다음</Button>
                </div>
                <StudyDataDefaultList selectBook={this.selectBook} book_list={this.state.book_list}/>
            </>
          );
    }
}
 
export default StudyDataPage;

const book_select_page_top = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:"10px",
    alignItems:"center"
}