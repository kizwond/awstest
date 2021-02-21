import React, { Component } from 'react';
import { Layout } from 'antd';
import axios from 'axios'
import Button from '../styledComponents/defaultButton'

const { Sider, Content } = Layout;

class StudyDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {    
        this.showTitle()
    }

    showTitle() {
        axios.get('api/book/get-booklist')
        .then(res => {
            console.log("get-booklist:",res.data)
            this.setState({
                category:res.data.categorybooklist
            })
        })
    }

    render() { 
        return (
            <div className="study_data_list_container">

            </div>
          );
    }
}
 
export default StudyDataPage;

