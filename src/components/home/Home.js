import axios from 'axios';
import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    componentDidMount() {
        axios.get('api/user/user-auth')
        .then(res => {
          this.props.updatedLoginState(res.data.isLoggedIn)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
    render() { 
        if(this.props.isLoggedIn === true){
            var loggedin = "로그인상태입니다"
        } else {
            loggedin = "로그아웃상태입니다."
        }
        return (
            <div style={{width:"1440px", margin:"auto",marginTop:"10px"}} >HomePage {loggedin} </div>
          );
    }
}
 
export default Home;
