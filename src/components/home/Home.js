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
          console.log(res.data)
          this.props.updatedLoginState(res.data.isLoggedIn)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
    render() { 
        console.log('home에서 다시 받은',this.props.isLoggedIn)
        if(this.props.isLoggedIn === true){
            var loggedin = "로그인상태입니다"
        } else {
            loggedin = "로그아웃상태입니다."
        }
        return (
            <div>HomePage {loggedin} </div>
          );
    }
}
 
export default Home;
