import React, { Component } from "react";
import { Avatar, Menu, Dropdown, Modal, Popover } from "antd";
import { UserOutlined, DownOutlined, FlagFilled, SettingOutlined } from "@ant-design/icons";
import ProgressBar from "./progressBar";
import axios from "axios";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Timer from "./Timer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "../styledComponents/defaultButton";
import FlipSide from "./FlipSide";
const { confirm } = Modal;

const session_id = sessionStorage.getItem("sessionId");

class FlipMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      time: 0,
      start: 0,
      time_total: 0,
      isOn_total: false,
      start_total: 0,
      page_toggle: false,
      level_config: [],
      cardlist_studying: [],
      continue_study: false,
      average_completed: 0,
      study_ratio: 0,
      clickCount: 1,
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey() {
    return this.keyCount++;
  }
  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start,
        }),
      1
    );
  };

  startTimerTotal = () => {
    this.setState({
      isOn_total: true,
      time_total: this.state.time_total,
      start_total: Date.now() - this.state.time_total,
    });
    this.timer_total = setInterval(
      () =>
        this.setState({
          time_total: Date.now() - this.state.start_total,
        }),
      1
    );
  };
  stopTimerTotal = () => {
    this.setState({ isOn_total: false });
    clearInterval(this.timer_total);
    clearInterval(this.timer);
  };

  startTimerResume = () => {
    this.startTimer();
    this.startTimerTotal();
  };

  resetTimer = () => {
    this.setState({ time: 0, start: 0 }, function () {
      this.startTimer();
      this.startTimerTotal();
    });
  };

  render() {
    return (
      <div style={style_study_layout_container}>
        <div style={style_study_layout_top}>
          <ul style={style_study_layout_top_left}>
            <li style={{ marginRight: "10px" }}>
              <Avatar size="large" icon={<UserOutlined />} />
            </li>
            <li style={{ marginRight: "10px", width: "320px" }}>
              <ul>
                <li style={{ display: "flex", alignItems: "center", marginBottom: "3px" }}>
                  <span style={{ marginRight: "10px", width: "40px", fontSize: "11px" }}>완료율</span>
                  <ProgressBar bgcolor={"#32c41e"} completed={this.state.average_completed} />
                </li>
              </ul>
            </li>
            <li>
              <Button style={{ height: "45px", borderRadius: "10px" }}>학습카드추가</Button>
            </li>
          </ul>
          <div style={clickCount}>{this.state.clickCount}</div>
          <div style={style_study_layout_top_right}>
            {/* <Timer
              startTimer={this.startTimer}
              startTimerTotal={this.startTimerTotal}
              stopTimerTotal={this.stopTimerTotal}
              startTimerResume={this.startTimerResume}
              time={this.state.time}
              isOn={this.state.isOn}
              start={this.state.start}
              time_total={this.state.time_total}
              isOn_total={this.state.isOn_total}
              start_total={this.state.start_total}
            /> */}
          </div>
        </div>
        <div style={style_study_layout_bottom}>
          <div style={{ width: "200px", textAlign: "right", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ width: "30px", height: "30px", textAlign: "center" }}>
              <Popover
                content={[
                  <div style={{ display: "flex", flexDirection: "column", height: "200px", justifyContent: "space-around" }}>
                    <FlagFilled style={{ cursor: "pointer", fontSize: "15px", color: "red" }} />
                    <FlagFilled style={{ cursor: "pointer", fontSize: "15px", color: "orange" }} />
                    <FlagFilled style={{ cursor: "pointer", fontSize: "15px", color: "yello" }} />
                    <FlagFilled style={{ cursor: "pointer", fontSize: "15px", color: "green" }} />
                    <FlagFilled style={{ cursor: "pointer", fontSize: "15px", color: "blue" }} />
                    <SettingOutlined style={{ cursor: "pointer", fontSize: "15px", color: "black" }} />
                  </div>,
                ]}
                trigger="click"
                placement="bottom"
                // visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <div style={{ border: "1px solid lightgrey", cursor: "pointer", height: "30px", width: "30px", lineHeight: "30px", borderRadius: "5px" }} type="primary">
                  user_flag
                </div>
              </Popover>
            </div>
          </div>
          <div style={{ width: "1000px", border: "1px solid lightgrey", borderRadius: "10px" }}>
            <div style={contentsDisplay}>
              <div style={{ position: "relative", height: "50%", width: "100%", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>앞면</div>
              </div>
              <div style={{ position: "relative", height: "50%", width: "100%", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>뒷면</div>
              </div>
            </div>
            <div style={buttonDiv}></div>
          </div>
          <div style={{ width: "200px" }}>
            <FlipSide />
          </div>
        </div>
      </div>
    );
  }
}

export default FlipMode;

const style_study_layout_container = {
  display: "flex",
  flexDirection: "column",
  height: "45px",
};
const style_study_layout_top = {
  display: "flex",
  flexDirection: "row",
  width: "1000px",
  margin: "auto",
};
const style_study_layout_top_left = {
  display: "flex",
  flexDirection: "row",
  width: "50%",
  alignItems: "center",
  justifyContent: "space-between",
  marginRight: "15px",
};
const style_study_layout_top_right = {
  display: "flex",
  flexDirection: "row",
  width: "40%",
  justifyContent: "space-between",
  border: "1px solid lightgrey",
  borderRadius: "10px",
  backgroundColor: "white",
  padding: 5,
  paddingBottom: 0,
  fontSize: "12px",
};
const style_study_layout_bottom = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "1410px",
  margin: "auto",
  marginTop: "10px",
};
const clickCount = {
  flex: 1,
  border: "1px solid lightgrey",
  marginRight: "10px",
  borderRadius: "10px",
  lineHeight: "45px",
  textAlign: "center",
  fontSize: "30px",
  backgroundColor: "white",
};
const contentsDisplay = {
  height: "600px",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "10px 10px 0 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};
const buttonDiv = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "70px",
  alignItems: "center",
  backgroundColor: "#e9e9e9",
  padding: "10px 90px",
  borderRadius: "0 0 10px 10px",
};
