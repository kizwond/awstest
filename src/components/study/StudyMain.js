import React, { Component } from 'react';
import StudyDataPage from './StudyDataPage';

class StudyMain extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div style={{width:"1440px", margin:"auto"}} className="study_main_container">
        <StudyDataPage/>
      </div>
    );
  }
}

export default StudyMain;