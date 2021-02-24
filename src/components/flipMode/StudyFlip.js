import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Study.css'
import FlipMode from './FlipMode';
import Button from '../styledComponents/defaultButton'

const { Header, Content } = Layout;
const { SubMenu } = Menu;

class StudyFlip extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  componentDidMount(){
    document.getElementById("nav_bar").classList.add('nav_bar_hidden');
  }
  onMenuClick = () => {
    

    const cardlist_to_send = JSON.parse(sessionStorage.getItem('cardlist_to_send'))
    console.log('cardlist_to_send',cardlist_to_send)

    if(cardlist_to_send){
      console.log("서버에 학습데이타를 전송할 시간이다!!!!")
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

    document.getElementById("nav_bar").classList.remove('nav_bar_hidden');
    document.getElementById("nav_bar").classList.add('nav_bar');
  }
  onClick = () => {
    axios('api/user/logout')
       .then(res => {
         console.log('logout from location study:',res.data)
        document.getElementById("nav_bar").classList.remove('nav_bar_hidden');
        document.getElementById("nav_bar").classList.add('nav_bar');
        
       });
       window.location.href = '/'
  }
  render() {
    const menu_0 = (
      <Menu>
        <Menu.ItemGroup>
          <Menu.Item><NavLink to="/" exact onClick={this.onMenuClick}>메인</NavLink></Menu.Item>
          <Menu.Item><NavLink to="/write" exact onClick={this.onMenuClick}>만들기</NavLink></Menu.Item>
          <Menu.Item><NavLink to="/store" exact onClick={this.onMenuClick}>서점</NavLink></Menu.Item>
          <Button onClick={this.onClick}>로그아웃</Button>
        </Menu.ItemGroup>
      </Menu>
    );
    const menu_1 = (
      <Menu>
        <SubMenu title="카드 보기 모드"  trigger={['click']}>
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <Menu.ItemGroup>
          <Menu.Item>전체보기</Menu.Item>
          <Menu.Divider />
          <Menu.Item>앞/뒷면 바꾸기</Menu.Item>
          <Menu.Divider />
          <Menu.Item>보이기/순기기 설정</Menu.Item>
          <Menu.Divider />
          <Menu.Item>읽어주기 설정</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const menu_2 = (
      <Menu>
        <Menu.ItemGroup>
          <Menu.Item>앞/뒷면 서식 설정</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const menu_3 = (
      <Menu>
        <Menu.ItemGroup>
          <Menu.Item>ooooo</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    return (
      <div className="study_page_container" style={{height:"800px"}}>
          <header style={{background:'#4e4e4e', borderBottom:"1px solid #d3d3d3"}}>
            <div style={{display:'flex', width:"1440px", margin:"auto", flexDirection:'row', justifyContent:'space-between'}}>
              <Dropdown overlay={menu_0} >
                <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <MenuOutlined style={{marginRight:'100px', color:"white"}}/>
                </a>
              </Dropdown>
              <div style={{display:'flex', width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:"center"}}>
                <Space size='large'>
                  <Dropdown overlay={menu_1} >
                    <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:"white", fontSize:"11px", fontWeight:"700"}}>
                      보기
                    </a>
                  </Dropdown>
                  <Dropdown overlay={menu_2} >
                    <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:"white", fontSize:"11px", fontWeight:"700"}}>
                      서식
                    </a>
                  </Dropdown>
                  <Dropdown overlay={menu_3} >
                    <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:"white", fontSize:"11px", fontWeight:"700"}}>
                      학습
                    </a>
                  </Dropdown>
                </Space>
                <Button size="small" width="90px" onClick={this.onMenuClick}>세션종료</Button>
              </div>
            </div>
          </header>
          <div style={{ paddingTop:"10px", background:"white" }}>
            <FlipMode/>
          </div>
      </div>
    );
  }
}

export default StudyFlip;
