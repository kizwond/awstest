import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Affix } from "antd";
import NavbarContainer from "./components/navbar/NavbarContainer";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import StudyMain from "./components/study/StudyMain";
import MyInfoMain from "./components/account/myInfo/MyInfoMain";
import WritingMain from "./components/Write/Write";
import BookStoreMain from "./components/bookStore/BookStoreMain";
import MentoringMain from "./components/mentoring/MentoringMain";
import ChooseIndex from "./components/chooseIndex/ChooseIndex";
import StudyFlip from "./components/flipMode/StudyFlip";
import FinishStudy from "./components/studyResult/FinishStudy";
import BookEditing from "./components/Write/BookEditing/BookEditing";
import BookNaming from "./components/Write/BookEditing/BookNaming";
import DetailBook from "./components/bookStore/DetailBook";
import LinkCategory from "./components/bookStore/LinkCategory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  updatedLoginState = (value) => {
    this.setState({
      isLoggedIn: value,
    });
  };
  render() {
    return (
      <div className="App">
        <Affix offsetTop={0}>
          <NavbarContainer isLoggedIn={this.state.isLoggedIn} />
        </Affix>
        <div style={main_container}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  updatedLoginState={this.updatedLoginState}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/study" component={StudyMain} />
            <Route exact path="/myinfo" component={MyInfoMain} />
            <Route
              exact
              path="/write"
              render={() => (
                <WritingMain updatedLoginState={this.updatedLoginState} />
              )}
            />
            <Route exact path="/store" component={BookStoreMain} />
            <Route exact path="/detail-book" component={DetailBook} />
            <Route exact path="/link-category" component={LinkCategory} />
            <Route exact path="/mentoring" component={MentoringMain} />
            <Route exact path="/start-study" component={StudyFlip} />
            <Route exact path="/study-result" component={FinishStudy} />
            <Route
              exact
              path="/session-setting"
              render={() => (
                <ChooseIndex updatedLoginState={this.updatedLoginState} />
              )}
            />
            <Route
              exact
              path="/editing"
              render={() => (
                <BookEditing updatedLoginState={this.updatedLoginState} />
              )}
            />
            <Route exact path="/naming" component={BookNaming} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

const main_container = {
  fontSize: "12px",
  fontWeight: "400",
  fontFamily: `"Noto Sans KR", sans-serif`,
};
