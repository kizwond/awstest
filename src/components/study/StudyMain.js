import React, { Component } from 'react';
import StudyDataPage from './StudyDataPage';

class StudyMain extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className="study_main_container">
        <StudyDataPage/>
      </div>
    );
  }
}

export default StudyMain;