import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import axios from 'axios'

import { HomeOutlined, ReadOutlined, FormOutlined, ShopOutlined,ShoppingCartOutlined,ApiOutlined } from '@ant-design/icons';

class NavbarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    logout = async () => {
        await axios.get('api/user/logout')
        .then(res => {
            console.log('logout', res.data)
        })
        window.location.href = '/'
    }
    render() { 
        return (
            <header style={header_style}>
                <div style={navbar_container}>
                    <h1 style={logo_container}><NavLink to="/" exact><img src="img/logo.png" width="90px" alt="logo"/></NavLink></h1>
                    <h2 style={navbar_total}>
                        <ul style={navbar_account_menus}>
                            {this.props.isLoggedIn === true ? <li style={{...navbar_account_menues_margin, cursor:"pointer"}} onClick={this.logout}>로그아웃</li>:
                                <>
                                    <li style={navbar_account_menues_margin}><NavLink to="/login" exact>로그인</NavLink></li>
                                    <li style={navbar_account_menues_margin}><NavLink to="/register" exact>회원가입</NavLink></li>
                                </>}
                            
                            <li style={navbar_account_menues_margin}><NavLink to="/basket" exact><ShoppingCartOutlined /></NavLink></li>
                            <li><NavLink to="/myinfo" exact>내정보</NavLink></li>
                        </ul>
                        <ul style={navbar_main_menus}>
                            <li><NavLink to="/" exact><HomeOutlined/> 메인</NavLink></li>
                            <li><NavLink to="/study" exact><ReadOutlined/> 학습</NavLink></li>
                            <li><NavLink to="/write" exact><FormOutlined/> 만들기</NavLink></li>
                            <li><NavLink to="/mentoring" exact><ApiOutlined /> 멘토링</NavLink></li>
                            <li><NavLink to="/store" exact><ShopOutlined /> 서점</NavLink></li>
                        </ul>
                    </h2>
                </div>
            </header>
          );
    }
}
 
export default NavbarContainer;

const header_style ={
    background:"white",
    borderBottom:"1px solid #efefef",
    fontWeight: "400",
    fontSize:"11px",
    fontFamily:`"Noto Sans KR", sans-serif`,
}
const navbar_container = {
    display : "flex",
    justifyContent : "space-between",
    width:"1440px",
    margin:"auto",
    alignItems:"center"
}
const navbar_total = {
    height:"56px",
    display : "flex",
    flexDirection : "column",
    justifyContent : "space-around",
    alignItems:"flex-end"
}
const navbar_account_menus = {
    display : "flex",
    justifyContent : "start",
}
const navbar_main_menus = {
    display : "flex",
    justifyContent : "space-between",
    fontSize:"13px",
    fontWeight: "500",
    width:"360px"
}
const logo_container ={
    width:"50%"
}
const navbar_account_menues_margin = {
    marginRight:"10px"
}