import React, { Component } from "react";
import { Avatar, Menu, Dropdown, Modal, Popover } from "antd";
import { UserOutlined, DownOutlined, FlagFilled, SettingOutlined, LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
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
      time: 0,
      start: 0,
      time_total: 0,
      isOn_total: false,
      start_total: 0,
      average_completed: 0,
      clickCount: 0,
      flag: "white",
      pageStatus: "normal",
      cardlist_studying: [],
      contents: [],
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey() {
    return this.keyCount++;
  }


  getKnowTime = () => {
    const card_id = this.state.contents[0]._id;
    const now = new Date();
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));

    const selectedIndex = card_details_session.findIndex((item, index) => {
      return item._id === card_id;
    });
    console.log(card_details_session[selectedIndex]);

    const now_mili_convert = Date.parse(now);
    var hours = now_mili_convert / (1000 * 60 * 60);
    console.log(now_mili_convert);
    console.log(hours);
    const level_config = JSON.parse(sessionStorage.getItem("level_config"));
    console.log(level_config[0]);
    const retention_count_curve_type = level_config[0].retention_count_curve.type;
    const retention_count_curve_a = level_config[0].retention_count_curve.a;
    const retention_count_curve_b = level_config[0].retention_count_curve.b;
    const sensitivity = level_config[0].sensitivity / 100;
    const current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times;
    const current_lev_accu_study_time = card_details_session[selectedIndex].detail_status.current_lev_accu_study_time;
    const level = card_details_session[selectedIndex].detail_status.level;

    if (retention_count_curve_type === "linear") {
      var modified_retention = (current_lev_study_times + 1 - retention_count_curve_b) / retention_count_curve_a;
    } else if (retention_count_curve_type === "log") {
      modified_retention = Math.exp((current_lev_study_times + 1 - retention_count_curve_b) / retention_count_curve_a);
    } else if (retention_count_curve_type === "exp") {
      modified_retention = Math.log((current_lev_study_times + 1 - retention_count_curve_b) / retention_count_curve_a);
    }

    if (card_details_session[selectedIndex].detail_status.recent_know_time === null) {
      var level_next = level + sensitivity * (Math.log((24 * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
    } else {
      const time_avg = (now_mili_convert - current_lev_accu_study_time) / current_lev_study_times;
      level_next = level + sensitivity * (Math.log((time_avg * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
    }

    console.log(level_next);
    const time_next = (Math.pow(2, level_next - 1) * Math.log(0.8)) / Math.log(0.8);
    console.log(time_next); //hours값이다
    if (time_next > 24) {
      var time = time_next / 24;
      var unit = "days";
    } else {
      time = time_next;
      unit = "hours";
    }
    return { time: time, unit: unit };
  };


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
  onMouseOver = () => {
    document.getElementById("user_flag").style.visibility = "visible";
  };
  onMouseOut = () => {
    document.getElementById("user_flag").style.visibility = "hidden";
  };

  userFlagChange = (flag) => {
    console.log(flag);
    if (flag === "flag_1") {
      var flag_color = "red";
    } else if (flag === "flag_2") {
      flag_color = "orange";
    } else if (flag === "flag_3") {
      flag_color = "yellow";
    } else if (flag === "flag_4") {
      flag_color = "green";
    } else if (flag === "flag_5") {
      flag_color = "blue";
    }
    this.setState({
      flag: flag_color,
    });
  };

  onClickBack = () => {
    if (this.state.pageStatus === "normal") {
      var status = "back";
    } else {
      status = "normal";
    }
    this.setState({
      pageStatus: status,
    });
  };

  componentDidMount() {
    this.getCardList();
  }

  getCardList = async () => {
    await axios
      .post("api/studyexecute/get-cardlist", {
        session_id: session_id,
      })
      .then((res) => {
        console.log("뒤집기모드 최초 res : ", res.data);
        sessionStorage.setItem("cardlist_studying", JSON.stringify(res.data.cardlist_studying));
        sessionStorage.setItem("level_config", JSON.stringify(res.data.level_config));
        this.setState({
          cardlist_studying: res.data.cardlist_studying,
          level_config: res.data.level_config,
        });
      });
    this.getContents();
  };

  getContents = async () => {
    const current_seq = sessionStorage.getItem("current_seq");
    console.log(current_seq)
    await axios
      .post("api/studyexecute/get-studying-cards", {
        card_ids: [this.state.cardlist_studying[Number(current_seq)]._id],
      })
      .then((res) => {
        console.log("첫번째 카드 컨텐츠 res : ", res.data);
        this.setState({
          contents: res.data.cards,
        });
      });
  };

  milliseconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000;

  onClickInterval = (status, interval) => {
    const current_seq = sessionStorage.getItem("current_seq");
    sessionStorage.setItem("current_seq", Number(current_seq)+1);
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));


    console.log("onClickInterval clicked!!");
    console.log(this.state.contents[0]._id);
    const card_id = this.state.contents[0]._id;
    const now = new Date();
    if (status === "short") {
      var next_review_time = interval;
    } else if (status === "long") {
      next_review_time = interval;
    }
    const now_mili_convert = Date.parse(now);

    var result = this.milliseconds(0, next_review_time, 0);
    const need_review_time = now_mili_convert + result;
    const review_date = new Date(need_review_time);

    //세션스토리지에서 카드리스트 정보 가져오기
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));

    //해당 카드 인텍스 찾기
    const selectedIndex = card_details_session.findIndex((item, index) => {
      return item._id === card_id;
    });


    //이전카드보기를 위한 학습로그 저장.
    const study_log_session = JSON.parse(sessionStorage.getItem("study_log"));
    const study_log = { card_id: card_id };
    if (study_log_session) {
      study_log_session.push(study_log);
      sessionStorage.setItem("study_log", JSON.stringify(study_log_session));
    } else {
      sessionStorage.setItem("study_log", JSON.stringify([]));
      const study_log_session = JSON.parse(sessionStorage.getItem("study_log"));
      study_log_session.push(study_log);
      sessionStorage.setItem("study_log", JSON.stringify(study_log_session));
    }



    //학습정보 업데이트
    card_details_session[selectedIndex].detail_status.recent_study_time = now;
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.need_study_time = review_date;
    card_details_session[selectedIndex].detail_status.recent_selection = status;
    card_details_session[selectedIndex].detail_status.recent_study_result = status;
    card_details_session[selectedIndex].detail_status.session_study_times = card_details_session[selectedIndex].detail_status.session_study_times + 1;
    card_details_session[selectedIndex].detail_status.total_study_times = card_details_session[selectedIndex].detail_status.total_study_times + 1;
    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].detail_status.current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times + 1;
    card_details_session[selectedIndex].detail_status.current_lev_accu_study_time =
      card_details_session[selectedIndex].detail_status.current_lev_accu_study_time + now_mili_convert; 
    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].status = "ing";
    card_details_session[selectedIndex].detail_status.recent_stay_hour = now;
    card_details_session[selectedIndex].detail_status.total_stay_hour = now;
    console.log(card_details_session);

    //업데이트된 학습정보 세션스토리지에 다시 저장
    sessionStorage.setItem("cardlist_studying", JSON.stringify(card_details_session));

    //서버에 보내기 위한 학습정보 리스트 생성
    const updateThis = card_details_session[selectedIndex];
    const getUpdateThis = JSON.parse(sessionStorage.getItem("cardlist_to_send"));

    if (getUpdateThis) {
      var finalUpdate = getUpdateThis.concat(updateThis);
    } else {
      finalUpdate = [updateThis];
    }

    sessionStorage.setItem("cardlist_to_send", JSON.stringify(finalUpdate));
    const cardlist_to_send = JSON.parse(sessionStorage.getItem("cardlist_to_send"));
    console.log("cardlist_to_send", cardlist_to_send);

    //학습데이터 처리 후 새카드 불러오기
    if(card_details_session.length === Number(current_seq)+1){
      alert("학습할 카드가 없어")
    } else {
      this.getContents()
    }

    
  };



  onClickRemembered = () => {
    const current_seq = sessionStorage.getItem("current_seq");
    sessionStorage.setItem("current_seq", Number(current_seq)+1);

    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));

    console.log("onClick Remembered!!!");
    const card_id = this.state.contents[0]._id;
    const now = new Date();
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));

    const selectedIndex = card_details_session.findIndex((item, index) => {
      return item._id === card_id;
    });
    console.log(card_details_session[selectedIndex]);

    //이전카드보기를 위한 학습로그 저장.
    const study_log_session = JSON.parse(sessionStorage.getItem("study_log"));
    const study_log = { card_id: card_id };
    if (study_log_session) {
      study_log_session.push(study_log);
      sessionStorage.setItem("study_log", JSON.stringify(study_log_session));
    } else {
      sessionStorage.setItem("study_log", JSON.stringify([]));
      const study_log_session = JSON.parse(sessionStorage.getItem("study_log"));
      study_log_session.push(study_log);
      sessionStorage.setItem("study_log", JSON.stringify(study_log_session));
    }


    const now_mili_convert = Date.parse(now);
    var hours = now_mili_convert / (1000 * 60 * 60);
    console.log(now_mili_convert);
    console.log(hours);
    const level_config = JSON.parse(sessionStorage.getItem("level_config"));
    console.log(level_config[0]);
    const retention_count_curve_type = level_config[0].retention_count_curve.type;
    const retention_count_curve_a = level_config[0].retention_count_curve.a;
    const retention_count_curve_b = level_config[0].retention_count_curve.b;
    const sensitivity = level_config[0].sensitivity / 100;
    const current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times;
    const current_lev_accu_study_time = card_details_session[selectedIndex].detail_status.current_lev_accu_study_time;
    const level = card_details_session[selectedIndex].detail_status.level;

    if (retention_count_curve_type === "linear") {
      var modified_retention = (current_lev_study_times + 1 - retention_count_curve_b) / retention_count_curve_a;
    } else if (retention_count_curve_type === "log") {
      modified_retention = Math.exp((current_lev_study_times + 1 - retention_count_curve_b) / retention_count_curve_a);
    } else if (retention_count_curve_type === "exp") {
      modified_retention = Math.log((current_lev_study_times + 1 - retention_count_curve_b) / retention_count_curve_a);
    }

    if (card_details_session[selectedIndex].detail_status.recent_know_time === null) {
      var level_next = level + sensitivity * (Math.log((24 * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
    } else {
      const time_avg = (now_mili_convert - current_lev_accu_study_time) / current_lev_study_times;
      level_next = level + sensitivity * (Math.log((time_avg * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
    }

    console.log(level_next);
    const time_next = (Math.pow(2, level_next - 1) * Math.log(0.8)) / Math.log(0.8);
    console.log(time_next); //hours값이다
    const addTime = this.milliseconds(time_next, 0, 0);
    const need_study_time = new Date(now_mili_convert + addTime);
    console.log(need_study_time);
    card_details_session[selectedIndex].detail_status.recent_study_time = now;
    card_details_session[selectedIndex].detail_status.recent_selection = "know";
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.total_study_times = card_details_session[selectedIndex].detail_status.total_study_times + 1;
    card_details_session[selectedIndex].detail_status.session_study_times = card_details_session[selectedIndex].detail_status.session_study_times + 1;
    card_details_session[selectedIndex].detail_status.studytimes_for_regression = card_details_session[selectedIndex].detail_status.current_lev_study_times;
    card_details_session[selectedIndex].detail_status.retention_for_regression = modified_retention;
    card_details_session[selectedIndex].detail_status.current_lev_study_times = 0;
    card_details_session[selectedIndex].detail_status.current_lev_accu_study_time = 0;
    card_details_session[selectedIndex].detail_status.former_level = level;
    card_details_session[selectedIndex].detail_status.level = level_next;
    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].status = "ing";
    card_details_session[selectedIndex].detail_status.recent_know_time = now;
    card_details_session[selectedIndex].detail_status.need_study_time = need_study_time;
    card_details_session[selectedIndex].detail_status.status_in_session = "off";
    card_details_session[selectedIndex].detail_status.recent_stay_hour = now;
    card_details_session[selectedIndex].detail_status.total_stay_hour = now;

    //업데이트된 학습정보 세션스토리지에 다시 저장
    sessionStorage.setItem("cardlist_studying", JSON.stringify(card_details_session));


    //서버에 보내기 위한 학습정보 리스트 생성
    const updateThis = card_details_session[selectedIndex];
    const getUpdateThis = JSON.parse(sessionStorage.getItem("cardlist_to_send"));

    if (getUpdateThis) {
      var finalUpdate = getUpdateThis.concat(updateThis);
    } else {
      finalUpdate = [updateThis];
    }

    sessionStorage.setItem("cardlist_to_send", JSON.stringify(finalUpdate));
    const cardlist_to_send = JSON.parse(sessionStorage.getItem("cardlist_to_send"));
    console.log("cardlist_to_send", cardlist_to_send);

    this.getContents()
  };


  render() {
    if (this.state.contents.length > 0) {
      const contents = this.state.contents[0];
      console.log(contents);
      var first_face_data = contents.contents.face1.map((item) => <FroalaEditorView key={this.getKey()} model={item} />);
      var second_face_data = contents.contents.face2.map((item) => <FroalaEditorView key={this.getKey()} model={item} />);
      if (this.state.level_config) {
        const level_config = this.state.level_config[0];
        var short_period = level_config.restudy_period.short.period;
        var long_period = level_config.restudy_period.long.period;
        var short_nick = level_config.restudy_period.short.nick;
        var long_nick = level_config.restudy_period.long.nick;
        var short_on_off = level_config.restudy_period.short.on_off;
        var long_on_off = level_config.restudy_period.long.on_off;
        var knowTimeValue = this.getKnowTime();

        var time_next = knowTimeValue.time.toFixed(2);
        var time_unit = knowTimeValue.unit;
      }
    }

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
            <div
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "30px", height: "672px", textAlign: "center" }}
            >
              <FlagFilled style={{ cursor: "pointer", fontSize: "15px", color: `${this.state.flag}`, marginBottom: "20px" }} />
              <div
                id="user_flag"
                style={{ visibility: "hidden", display: "flex", flexDirection: "column", width: "30px", height: "100%", textAlign: "center", border: "1px dashed lightgrey" }}
              >
                <FlagFilled onClick={() => this.userFlagChange("flag_1")} style={{ cursor: "pointer", fontSize: "15px", color: "red" }} />
                <FlagFilled onClick={() => this.userFlagChange("flag_2")} style={{ cursor: "pointer", fontSize: "15px", color: "orange" }} />
                <FlagFilled onClick={() => this.userFlagChange("flag_3")} style={{ cursor: "pointer", fontSize: "15px", color: "yellow" }} />
                <FlagFilled onClick={() => this.userFlagChange("flag_4")} style={{ cursor: "pointer", fontSize: "15px", color: "green" }} />
                <FlagFilled onClick={() => this.userFlagChange("flag_5")} style={{ cursor: "pointer", fontSize: "15px", color: "blue" }} />
              </div>
            </div>
          </div>

          {this.state.pageStatus === "normal" ? (
            <div style={{ width: "1000px", border: "1px solid lightgrey", borderRadius: "10px" }}>
              <div style={contentsDisplay}>
                <div style={{ position: "relative", height: "50%", width: "100%", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{first_face_data}</div>
                </div>
                <div style={{ position: "relative", height: "50%", width: "100%", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{second_face_data}</div>
                </div>
              </div>
              <div style={buttonDiv}>
                <Button width="35px" onClick={this.onClickBack} style={{ ...buttonDefault, padding: 0, overflow: "hidden", lineHeight: "13px" }}>
                  이전
                  <br />
                  카드
                </Button>
                {short_on_off === "on" && (
                  <Button onClick={() => this.onClickInterval("short", short_period)} width="200px" style={{ ...buttonDefault }}>
                    {short_nick}({short_period})
                  </Button>
                )}
                {long_on_off === "on" && (
                  <Button onClick={() => this.onClickInterval("long", long_period)} width="200px" style={{ ...buttonDefault }}>
                    {long_nick}({long_period})
                  </Button>
                )}

                <Button onClick={this.onClickRemembered} width="200px" style={{ ...buttonDefault }}>
                  ok!이제그만/{time_next}
                  {time_unit}
                </Button>
                <Button width="35px" style={{ ...buttonDefault, padding: 0 }}>
                  ...
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ width: "1000px", border: "1px solid lightgrey", borderRadius: "10px" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                <LeftSquareOutlined style={{ fontSize: "30px", color: "lightgrey", cusor: "pointer" }} />
                <div style={contentsDisplay}>
                  <div style={{ position: "relative", height: "50%", width: "910px", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>앞면</div>
                  </div>
                  <div style={{ position: "relative", height: "50%", width: "910px", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>뒷면</div>
                  </div>
                </div>
                <RightSquareOutlined style={{ fontSize: "30px", color: "lightgrey", cusor: "pointer" }} />
              </div>
              <div style={buttonDiv}>
                <Button width="35px" style={{ ...buttonDefault, padding: 0, overflow: "hidden", lineHeight: "13px", color: "lightgrey", cursor: "text" }}>
                  이전
                  <br />
                  카드
                </Button>
                <Button onClick={this.onClickBack} width="200px" style={{ ...buttonDefault }}>
                  원 위치에서 학습 이어하기
                </Button>
                <Button width="35px" style={{ ...buttonDefault, padding: 0 }}>
                  ...
                </Button>
              </div>
            </div>
          )}

          <div style={{ width: "200px" }}>
            <FlipSide />
          </div>
        </div>
      </div>
    );
  }
}

export default FlipMode;
const buttonDefault = {
  boxShadow: "1px 1px 1px 0px rgba(128,128,128,1)",
  borderRadius: "5px",
};
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
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "70px",
  alignItems: "center",
  backgroundColor: "#e9e9e9",
  padding: "10px 90px",
  borderRadius: "0 0 10px 10px",
};
