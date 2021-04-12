import React, { Component } from "react";
import { Avatar, Menu, Dropdown, Modal, Popover, Select } from "antd";
import { UserOutlined, DownOutlined, FlagFilled, SettingOutlined, LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import ProgressBar from "./progressBar";
import axios from "axios";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Timer from "./Timer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "../styledComponents/defaultButton";
import FlipSide from "./FlipSide";
const { confirm } = Modal;
const { Option } = Select;

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
      backContents: [],
      contentsList: [],
      getKnowTime: "",
      confirmOn:"ask"
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

    const now_mili_convert = Date.parse(now);
    var hours = now_mili_convert / (1000 * 60 * 60);

    const level_config = JSON.parse(sessionStorage.getItem("level_config"));

    const sensitivity = level_config[0].sensitivity / 100;
    const current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times;
    // const current_lev_accu_study_time = card_details_session[selectedIndex].detail_status.current_lev_accu_study_time;
    const current_lev_accu_study_time = card_details_session[selectedIndex].detail_status.current_lev_accu_study_time + now_mili_convert;
    const level = card_details_session[selectedIndex].detail_status.level;
    const recent_know_time_tmp = card_details_session[selectedIndex].detail_status.recent_know_time;
    const recent_know_time = Date.parse(recent_know_time_tmp);

    if (card_details_session[selectedIndex].detail_status.current_lev_study_times <= 20) {
      var modified_retention = level_config[0].retention["t" + (card_details_session[selectedIndex].detail_status.current_lev_study_times + 1)];
    } else {
      modified_retention = level_config[0].retention["t20"];
    }

    if (card_details_session[selectedIndex].detail_status.recent_know_time === null) {
      var level_next = level + sensitivity * (Math.log((24 * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
    } else {
      // let time_avg = ((now_mili_convert - current_lev_accu_study_time) /3600000) / (current_lev_study_times+1);
      let time_avg = (current_lev_accu_study_time / (current_lev_study_times + 1) - recent_know_time) / 3600000;
      // 경과시간이 30분보다 작으면, 30분으로 맞춰준다.
      if (time_avg < 0.5) {
        time_avg = 0.5;
      }

      level_next = level + sensitivity * (Math.log((time_avg * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
      // 1번만에 알겠음을 하는 경우는 레벨 하락은 막아준다.
      if (current_lev_study_times == 0) {
        if (level_next < level) {
          level_next = level;
        }
      }
      // 레벨이 너무 낮거나 높으면 보정해준다.
      if (level_next < 0) {
        level_next = 0;
      } else if (level_next > 10) {
        level_next = 10;
      }
    }

    const time_next = (Math.pow(2, level_next - 1) * Math.log(0.8)) / Math.log(0.8);

    if (time_next > 24) {
      var time = time_next / 24;
      var unit = "days";
    } else {
      time = time_next;
      unit = "hours";
    }
    return this.setState({
      getKnowTime: { time: time, unit: unit },
    });
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
    this.getContentsList();
  };

  getContents = async () => {
    const current_seq = sessionStorage.getItem("current_seq");
    console.log(current_seq);
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    console.log(card_details_session);
    const now = new Date();

    //복습대상 카드를 찾자
    const reviewCards = card_details_session.filter((item) => item.detail_status.need_study_time_tmp !== null && new Date(item.detail_status.need_study_time_tmp) < now);

    console.log(reviewCards);
    if (reviewCards.length > 0) {
      console.log("here-----------------------------------------");
      //복습대상 카드의 아이디를 배열로
      const reviewCardIds = reviewCards.map((item) => item._id);
      console.log(reviewCardIds);
      //서버에 해당 아이디들로 컨텐츠를 요청해라.
      await axios
        .post("api/studyexecute/get-studying-cards", {
          card_ids: reviewCardIds,
        })
        .then((res) => {
          console.log("첫번째 카드 컨텐츠 res : ", res.data);
          const contents = this.state.contentsList.concat(res.data.cards);
          this.setState({
            contentsList: contents,
          });
        });

      const card_id1 = reviewCardIds[0];
      console.log(card_id1);
      const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
      const selected_status = card_details_session.find((item, index) => {
        return item._id === card_id1;
      });
      const status = selected_status.detail_status.recent_study_result;
      const contentForNow = this.state.contentsList.find((item) => item._id === card_id1);
      console.log(contentForNow);
      this.setState(
        {
          contents: [contentForNow],
          cardStatus: status,
        },
        function () {
          this.getKnowTime();
          this.stopTimerTotal();
          this.resetTimer();
        }
      );
    } else {
      //복습대상이 없을때는
      //const readyToStudyCardId = card_details_session[current_seq]._id;
      if (card_details_session[Number(current_seq)]) {
        var card_id1 = card_details_session[Number(current_seq)]._id;
      } else {
        card_id1 = undefined;
      }

      //위에 카드아이디가 없다면, 워쩔것이냐.
      if (card_details_session[Number(current_seq) + 1]) {
        var card_id2 = card_details_session[Number(current_seq) + 1]._id;
      } else {
        card_id2 = undefined;
      }

      if (card_details_session[Number(current_seq) + 2]) {
        var card_id3 = card_details_session[Number(current_seq) + 2]._id;
      } else {
        card_id3 = undefined;
      }

      if (card_id1 !== undefined && card_id2 !== undefined && card_id3 === undefined) {
        var length_of = 2;
        var cardIdsArray = [card_id1, card_id2];
      } else if (card_id1 !== undefined && card_id2 === undefined && card_id3 === undefined) {
        length_of = 1;
        cardIdsArray = [card_id1];
      } else if (card_id1 === undefined && card_id2 === undefined && card_id3 === undefined) {
        return alert("학습할 카드가 없습니다.");
      } else {
        length_of = 3;
        cardIdsArray = [card_id1, card_id2, card_id3];
      }

      const contentsToCompare = this.state.contentsList;

      const existing = contentsToCompare.map((item) => {
        return item._id;
      });

      let difference = existing.filter((id) => cardIdsArray.includes(id));

      console.log(difference);

      if (difference.length === length_of) {
        sessionStorage.setItem("current_seq", Number(current_seq) + 1);

        const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
        const selected_status = card_details_session.find((item, index) => {
          return item._id === card_id1;
        });
        const status = selected_status.detail_status.recent_study_result;

        const contentForNow = this.state.contentsList.find((item) => item._id === card_id1);
        console.log(contentForNow);
        this.setState(
          {
            contents: [contentForNow],
            cardStatus: status,
          },
          function () {
            this.getKnowTime();
            this.stopTimerTotal();
            this.resetTimer();
          }
        );
      } else {
        sessionStorage.setItem("current_seq", Number(current_seq) + 1);
        const willStudyCards = card_details_session.filter((item) => item.detail_status.status_in_session === "on" && item.detail_status.need_study_time_tmp === null);
        //현재순서부터 10개의 카드를 다시 요청해라.
        let temp = [];
        const seqArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        console.log(willStudyCards)
        if (willStudyCards.length < 10) {
          const willStudyIds = [];
          for (var i = 0; i < willStudyCards.length; i++) {
            willStudyIds.push(willStudyCards[i]._id);
          }
          console.log(willStudyIds)
          temp = temp.concat(willStudyIds);
          console.log(temp)
        } else {
          const new_temp = seqArray.map((item) => {
            return willStudyCards[item]._id;
          });
          temp = temp.concat(new_temp);
        }
        console.log(temp)

        const ids = temp;
        console.log(ids)
        await axios
          .post("api/studyexecute/get-studying-cards", {
            card_ids: ids,
          })
          .then((res) => {
            console.log("첫번째 카드 컨텐츠 res : ", res.data);
            this.setState({
              contentsList: res.data.cards,
            });
          });

        const card_id1 = card_details_session[Number(current_seq)]._id;

        const selected_status = card_details_session.find((item, index) => {
          return item._id === card_id1;
        });
        const status = selected_status.detail_status.recent_study_result;

        const contentForNow = this.state.contentsList.find((item) => item._id === card_id1);
        console.log(contentForNow);
        this.setState(
          {
            contents: [contentForNow],
            cardStatus: status,
          },
          function () {
            this.getKnowTime();
            this.stopTimerTotal();
            this.resetTimer();
          }
        );
      }
    }
  };

  //최초 카드컨텐츠 리스트를 받아옴.
  getContentsList = async () => {
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));

    //이어하기시 필요한 컨텐츠를 미리 불러온다.
    const on_study_times_none_zero = card_details_session.filter((item) => item.detail_status.session_study_times > 0 && item.detail_status.status_in_session === "on");

    console.log(on_study_times_none_zero);
    if (on_study_times_none_zero.length === 0) {
      console.log("이어하기가 아니다.");
      // 새로운 seq정보를 찾기
      const willStudyCards = card_details_session.filter((item) => item.detail_status.status_in_session === "on" && item.detail_status.need_study_time_tmp === null);
      console.log(willStudyCards);
      const firstCardId = willStudyCards[0]._id;

      const firstSeq = card_details_session.findIndex((item) => item._id === firstCardId);
      console.log(firstSeq);
      sessionStorage.setItem("current_seq", firstSeq);
      // part. 2 finished ( 시퀀스를 찾아서 최종적으로 세션스토리지에 current_seq정보를 넣어줌. )

      // 5개의 카드를 받아옴. 상위에서 willStudyCards로 찾아준 학습대상카드에서 5개의 카드id를 찾음.
      const seqArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      if (willStudyCards.length < 10) {
        var temp = [];
        for (var i = 0; i < willStudyCards.length; i++) {
          temp.push(willStudyCards[i]._id);
        }
      } else {
        temp = seqArray.map((item) => {
          return willStudyCards[item]._id;
        });
      }

      console.log(temp);
      var ids = temp;
      // 5개의 아이디 생성완료.
    } else {
      console.log("이어하기다.");

      const willStudyCards = card_details_session.filter((item) => item.detail_status.status_in_session === "on" && item.detail_status.need_study_time_tmp === null);
      console.log(willStudyCards);
      const firstCardId = willStudyCards[0]._id;

      const firstSeq = card_details_session.findIndex((item) => item._id === firstCardId);
      console.log(firstSeq);
      sessionStorage.setItem("current_seq", firstSeq);
      // part. 2 finished ( 시퀀스를 찾아서 최종적으로 세션스토리지에 current_seq정보를 넣어줌. )

      // 신규 10개의 카드를 받아옴. 상위에서 willStudyCards로 찾아준 학습대상카드에서 10개의 카드id를 찾음.
      temp = [];
      for (i = 0; i < on_study_times_none_zero.length; i++) {
        temp.push(on_study_times_none_zero[i]._id);
      }

      const seqArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      if (willStudyCards.length < 10) {
        const willStudyIds = [];
        for (i = 0; i < willStudyCards.length; i++) {
          willStudyIds.push(willStudyCards[i]._id);
        }
        temp.concat(willStudyIds);
      } else {
        const new_temp = seqArray.map((item) => {
          return willStudyCards[item]._id;
        });
        temp.concat(new_temp);
      }

      console.log(temp);
      ids = temp;
      // 이어하기에 이미학습한 컨텐츠 전부 컨텐츠 리스트에 추가.
    }
    // part. 1 finished

    await axios
      .post("api/studyexecute/get-studying-cards", {
        card_ids: ids,
      })
      .then((res) => {
        console.log("첫번째 카드 컨텐츠 res : ", res.data);
        this.setState({
          contentsList: res.data.cards,
        });
      });

    this.getContents();
  };

  milliseconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000;


  backRestore = (id, selectedIndex) => {
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));

    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    const now = new Date();

    card_details_session[selectedIndex].detail_status.recent_selection = "restore";
    if (card_details_session[selectedIndex].detail_status.recent_study_time === null) {
      card_details_session[selectedIndex].status = "yet";
    } else {
      card_details_session[selectedIndex].status = "ing";
    }
    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].detail_status.recent_study_result;
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.recent_study_result = "restore";
    card_details_session[selectedIndex].detail_status.status_in_session = "on";
    card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
    card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    
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

    const get_backContent = this.state.contentsList.find((item) => item._id === id);
    console.log(get_backContent);
    this.setState(
      {
        backContents: [get_backContent],
        currentCardId: id,
      },
      function () {
        this.stopTimerTotal();
        this.resetTimer();
      }
    );

  }

  backHoldOrCompleted = (id, selectedIndex, status) => {
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));

    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    const now = new Date();
    const now_mili_convert = Date.parse(now);

    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].status = status;
    card_details_session[selectedIndex].detail_status.recent_study_result = status;
    card_details_session[selectedIndex].detail_status.recent_study_time = now;
    card_details_session[selectedIndex].detail_status.recent_selection = status;
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.status_in_session = "off";
    card_details_session[selectedIndex].detail_status.session_study_times = card_details_session[selectedIndex].detail_status.session_study_times + 1;
    card_details_session[selectedIndex].detail_status.current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times + 1;
    card_details_session[selectedIndex].detail_status.current_lev_accu_study_time =
      card_details_session[selectedIndex].detail_status.current_lev_accu_study_time + now_mili_convert;
    card_details_session[selectedIndex].detail_status.total_study_times = card_details_session[selectedIndex].detail_status.total_study_times + 1;
    card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
    card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    
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

    const get_backContent = this.state.contentsList.find((item) => item._id === id);
    console.log(get_backContent);
    this.setState(
      {
        backContents: [get_backContent],
        currentCardId: id,
      },
      function () {
        this.stopTimerTotal();
        this.resetTimer();
      }
    );

  }


  onClickInterval = (status, interval) => {
    const current_seq = sessionStorage.getItem("current_seq");
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
    } else if (status === "veryshort") {
      next_review_time = interval;
    } else if (status === "verylong") {
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
    if (status === "back") {
      console.log("back clicked!!!");
    } else {
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
    }

    //학습정보 업데이트
    if (status === "short" || status === "long" || status === "veryshort" || status === "verylong") {
      card_details_session[selectedIndex].detail_status.recent_study_time = now;
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.need_study_time = review_date;
      card_details_session[selectedIndex].detail_status.need_study_time_tmp = review_date;
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
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    } else if (status === "pass") {
      card_details_session[selectedIndex].detail_status.recent_selection = status;
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.status_in_session = "off";
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    } else if (status === "hold") {
      card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
      card_details_session[selectedIndex].status = "hold";
      card_details_session[selectedIndex].detail_status.recent_study_result = status;
      card_details_session[selectedIndex].detail_status.recent_study_time = now;
      card_details_session[selectedIndex].detail_status.recent_selection = status;
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.status_in_session = "off";
      card_details_session[selectedIndex].detail_status.session_study_times = card_details_session[selectedIndex].detail_status.session_study_times + 1;
      card_details_session[selectedIndex].detail_status.current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times + 1;
      card_details_session[selectedIndex].detail_status.current_lev_accu_study_time =
        card_details_session[selectedIndex].detail_status.current_lev_accu_study_time + now_mili_convert;
      card_details_session[selectedIndex].detail_status.total_study_times = card_details_session[selectedIndex].detail_status.total_study_times + 1;
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    } else if (status === "completed") {
      card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
      card_details_session[selectedIndex].status = "completed";
      card_details_session[selectedIndex].detail_status.recent_study_result = status;
      card_details_session[selectedIndex].detail_status.recent_study_time = now;
      card_details_session[selectedIndex].detail_status.recent_selection = status;
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.status_in_session = "off";
      card_details_session[selectedIndex].detail_status.session_study_times = card_details_session[selectedIndex].detail_status.session_study_times + 1;
      card_details_session[selectedIndex].detail_status.current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times + 1;
      card_details_session[selectedIndex].detail_status.current_lev_accu_study_time =
        card_details_session[selectedIndex].detail_status.current_lev_accu_study_time + now_mili_convert;
      card_details_session[selectedIndex].detail_status.total_study_times = card_details_session[selectedIndex].detail_status.total_study_times + 1;
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
      card_details_session[selectedIndex].detail_status.former_level = card_details_session[selectedIndex].detail_status.level;
      card_details_session[selectedIndex].detail_status.level = 10;
    } else if (status === "back") {
      card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
      card_details_session[selectedIndex].detail_status.recent_selection = status;
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    } else if (status === "restore") {
      card_details_session[selectedIndex].detail_status.recent_selection = status;
      if (card_details_session[selectedIndex].detail_status.recent_study_time === null) {
        card_details_session[selectedIndex].status = "yet";
      } else {
        card_details_session[selectedIndex].status = "ing";
      }
      card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].detail_status.recent_study_result;
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.status_in_session = "on";
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;
    }

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
    this.sendStudyData();
    //학습데이터 처리 후 새카드 불러오기
    if (status === "back") {
      if (this.state.pageStatus === "normal") {
        var mode = "back";
      } else {
        mode = "normal";
      }
      this.setState({
        pageStatus: mode,
      });

      if (mode === "back") {
        console.log("back side open, get contents from study_log in sessionstorage");
        this.getBackContents();
      }
    } else {
      if (status === "restore") {
        console.log("restore");
        this.setState({
          cardStatus: "restore",
        });
      } else {
        if (card_details_session.length === Number(current_seq)) {

          if(this.state.confirmOn === "ask"){
           this.showConfirm(this.confirmOn, this.getContinueContents)
          } else if(this.state.confirmOn === "more"){
              console.log("more to come")
              this.getContinueContents()
          } else {
            this.finishStudy();
          }

        } else {
          this.getContents();
        }
      }
    }
  };
  confirmOn = () => {
    this.setState({
      confirmOn : "more"
    })
  }
  showConfirm = (confirmOn, getContinueContents) => {
    confirm({
      title: '학습대상 카드가 모두 소진되었습니다. 복습시점이 도래하지 않은 카드를 계속해서 공부하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        console.log('OK');
        confirmOn()
        getContinueContents()
      },
      onCancel() {
        this.finishStudy();
      },
    });
  }

  getContinueContents = async () => {
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    console.log(card_details_session);
    const now = new Date();

    //복습대상 카드를 찾자
    const reviewCards = card_details_session.filter((item) => item.detail_status.need_study_time_tmp !== null && new Date(item.detail_status.need_study_time_tmp) > now);

    console.log(reviewCards);
    if (reviewCards) {
      reviewCards.sort(function (a, b) {
        return a.detail_status.need_study_time_tmp > b.detail_status.need_study_time_tmp
          ? 1
          : a.detail_status.need_study_time_tmp < b.detail_status.need_study_time_tmp
          ? -1
          : 0;
      });
      console.log("after sort:", reviewCards);
    }
    if (reviewCards.length > 0) {
      console.log("here-----------------------------------------");
      //복습대상 카드의 아이디를 배열로
      const reviewCardIds = reviewCards.map((item) => item._id);
      console.log(reviewCardIds);
      //서버에 해당 아이디들로 컨텐츠를 요청해라.
      await axios
        .post("api/studyexecute/get-studying-cards", {
          card_ids: reviewCardIds,
        })
        .then((res) => {
          console.log("첫번째 카드 컨텐츠 res : ", res.data);
          const contents = this.state.contentsList.concat(res.data.cards);
          this.setState({
            contentsList: contents,
          });
        });

      const card_id1 = reviewCardIds[0];
      console.log(card_id1);
      const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
      const selected_status = card_details_session.find((item, index) => {
        return item._id === card_id1;
      });
      const status = selected_status.detail_status.recent_study_result;
      const contentForNow = this.state.contentsList.find((item) => item._id === card_id1);
      console.log(contentForNow);
      this.setState(
        {
          contents: [contentForNow],
          cardStatus: status,
        },
        function () {
          this.getKnowTime();
          this.stopTimerTotal();
          this.resetTimer();
        }
      );
    } else {
      alert("세션내에 복습예정인 카드들도 없구먼~ 학습결과 화면으로 가는구먼")
      this.finishStudy();
    }
  };

  onClickRemembered = () => {
    const current_seq = sessionStorage.getItem("current_seq");

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

    const sensitivity = level_config[0].sensitivity / 100;
    const current_lev_study_times = card_details_session[selectedIndex].detail_status.current_lev_study_times;
    const current_lev_accu_study_time = card_details_session[selectedIndex].detail_status.current_lev_accu_study_time + now_mili_convert;
    const level = card_details_session[selectedIndex].detail_status.level;
    const recent_know_time_tmp = card_details_session[selectedIndex].detail_status.recent_know_time;
    const recent_know_time = Date.parse(recent_know_time_tmp);

    if (card_details_session[selectedIndex].detail_status.current_lev_study_times <= 20) {
      var modified_retention = level_config[0].retention["t" + (card_details_session[selectedIndex].detail_status.current_lev_study_times + 1)];
    } else {
      modified_retention = level_config[0].retention["t20"];
    }

    if (card_details_session[selectedIndex].detail_status.recent_know_time === null) {
      var level_next = level + sensitivity * (Math.log((24 * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
    } else {
      // const time_avg = (now_mili_convert - current_lev_accu_study_time) / current_lev_study_times;
      let time_avg = (current_lev_accu_study_time / (current_lev_study_times + 1) - recent_know_time) / 3600000;
      // 경과시간이 30분보다 작으면, 30분으로 맞춰준다.
      if (time_avg < 0.5) {
        time_avg = 0.5;
      }

      level_next = level + sensitivity * (Math.log((time_avg * Math.log(0.8)) / Math.log(modified_retention)) / Math.log(2) + 1 - level);
      if (current_lev_study_times == 0) {
        if (level_next < level) {
          level_next = level;
        }
      }
      // 레벨이 너무 낮거나 높으면 보정해준다.
      if (level_next < 0) {
        level_next = 0;
      } else if (level_next > 10) {
        level_next = 10;
      }
    }

    console.log(level_next);
    const time_next = (Math.pow(2, level_next - 1) * Math.log(0.8)) / Math.log(0.8);
    console.log(time_next); //hours값이다
    const addTime = this.milliseconds(time_next, 0, 0);
    const need_study_time = new Date(now_mili_convert + addTime);
    console.log(need_study_time);
    card_details_session[selectedIndex].detail_status.recent_study_time = now;
    card_details_session[selectedIndex].detail_status.recent_selection = "know";
    card_details_session[selectedIndex].detail_status.recent_study_result = "know";
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.total_study_times = card_details_session[selectedIndex].detail_status.total_study_times + 1;
    card_details_session[selectedIndex].detail_status.session_study_times = card_details_session[selectedIndex].detail_status.session_study_times + 1;
    card_details_session[selectedIndex].detail_status.studytimes_for_regression = card_details_session[selectedIndex].detail_status.current_lev_study_times + 1;
    card_details_session[selectedIndex].detail_status.retention_for_regression = modified_retention;
    card_details_session[selectedIndex].detail_status.current_lev_study_times = 0;
    card_details_session[selectedIndex].detail_status.current_lev_accu_study_time = 0;
    card_details_session[selectedIndex].detail_status.former_level = level;
    card_details_session[selectedIndex].detail_status.level = level_next;
    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].status = "ing";
    card_details_session[selectedIndex].detail_status.recent_know_time = now;
    card_details_session[selectedIndex].detail_status.need_study_time = need_study_time;
    card_details_session[selectedIndex].detail_status.need_study_time_tmp = null;
    card_details_session[selectedIndex].detail_status.former_status_in_session = card_details_session[selectedIndex].detail_status.status_in_session;
    card_details_session[selectedIndex].detail_status.status_in_session = "off";
    card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
    card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;

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
    this.sendStudyData();
    //학습데이터 처리 후 새카드 불러오기
    if (card_details_session.length === Number(current_seq)) {

       if(this.state.confirmOn === "ask"){
           this.showConfirm(this.confirmOn, this.getContinueContents)
          } else if(this.state.confirmOn === "more"){
              console.log("more to come")
              this.getContinueContents()
          } else {
            this.finishStudy();
          }

    } else {
      this.getContents();
    }
  };

  sendStudyData = async () => {
    const cardlist_to_send = JSON.parse(sessionStorage.getItem("cardlist_to_send"));

    if (cardlist_to_send) {
      if (cardlist_to_send.length > 3) {
        console.log("공부중 학습데이터 전송!!!!");
        const sessionId = sessionStorage.getItem("sessionId");
        await axios
          .post("api/studyresult/create-studyresult", {
            cardlist_studied: cardlist_to_send,
            session_id: sessionId,
            status: "studying",
          })
          .then((res) => {
            console.log("학습정보 전송완료!!!", res.data);
            sessionStorage.removeItem("cardlist_to_send");
          });
      } else {
        console.log("cardlist to send under 3 items");
      }
    } else {
      console.log("studying");
    }
  };

  finishStudy = async () => {
    alert("학습할 카드가 없습니다. 학습결과 화면으로 이동합니다.");
    const cardlist_to_send = JSON.parse(sessionStorage.getItem("cardlist_to_send"));
    if (cardlist_to_send) {
      console.log("서버에 학습데이타를 전송할 시간이다!!!!");
      sessionStorage.setItem("current_seq", 0);
      const sessionId = sessionStorage.getItem("sessionId");
      await axios
        .post("api/studyresult/create-studyresult", {
          cardlist_studied: cardlist_to_send,
          session_id: sessionId,
          status: "finished",
        })
        .then((res) => {
          console.log("학습정보 전송완료!!!", res.data);
          sessionStorage.removeItem("cardlist_to_send");
          window.location.href = "/study-result";
        });
    } else {
      window.location.href = "/study-result";
    }
  };

  //오늘은 여기작업하자 & backCardIds에서 마지막 id값을 불러와서 컨텐츠 리스트에서 조회해보고, 있으면 뿌려주고, 없으면 받아오고
  //back클릭시 현재카드에대한 학습시간을 cardlist to send 에다가 갱신해줘야함.
  onClickBack = (card_id) => {
    if (this.state.pageStatus === "normal") {
      var status = "back";
    } else {
      status = "normal";
    }
    this.setState({
      pageStatus: status,
    });

    if (status === "back") {
      console.log("back side open, get contents from study_log in sessionstorage");
      this.getBackContents();
    } else {
      const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
      const now = new Date();

      const selectedIndex = card_details_session.findIndex((item, index) => {
        return item._id === card_id;
      });

      card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
      card_details_session[selectedIndex].detail_status.recent_selection = "move";
      card_details_session[selectedIndex].detail_status.recent_select_time = now;
      card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
      card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;

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
    }
  };

  getBackContents = async () => {
    const backCardIds = JSON.parse(sessionStorage.getItem("study_log"));
    console.log(backCardIds);
    const idList = backCardIds.map((item) => {
      return item.card_id;
    });
    console.log(idList);
    const last_id = idList[idList.length - 1];

    console.log(last_id);
    const get_backContent = this.state.contentsList.find((item) => item._id === last_id);
    console.log(get_backContent);
    this.setState(
      {
        backContents: [get_backContent],
        prevIdIndex: backCardIds.length - 2,
        nextIdIndex: backCardIds.length,
        currentCardId: last_id,
      },
      function () {
        this.stopTimerTotal();
        this.resetTimer();
      }
    );
  };
  prevCardClick = () => {
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    const now = new Date();

    console.log("prev card click");
    const backCardIds = JSON.parse(sessionStorage.getItem("study_log"));
    const prevIdIndex = this.state.prevIdIndex;
    if (backCardIds[prevIdIndex] === undefined) {
      return alert("이전모드 이전 카드가 없습니다.");
    } else {
      var prevId = backCardIds[prevIdIndex].card_id;
      var currentId = backCardIds[prevIdIndex + 1].card_id;
    }
    console.log(prevIdIndex);
    console.log(prevId);

    const selectedIndex = card_details_session.findIndex((item, index) => {
      return item._id === currentId;
    });

    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].detail_status.recent_selection = "move";
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
    card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;

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

    const get_backContent = this.state.contentsList.find((item) => item._id === prevId);
    console.log(get_backContent);
    this.setState(
      {
        backContents: [get_backContent],
        prevIdIndex: this.state.prevIdIndex - 1,
        nextIdIndex: this.state.nextIdIndex - 1,
        currentCardId: prevId,
      },
      function () {
        this.stopTimerTotal();
        this.resetTimer();
      }
    );
  };
  nextCardClick = () => {
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    const now = new Date();

    console.log("next card click");
    const backCardIds = JSON.parse(sessionStorage.getItem("study_log"));
    const nextIdIndex = this.state.nextIdIndex;
    if (backCardIds[nextIdIndex] === undefined) {
      return alert("이전모드 다음 카드가 없습니다.");
    } else {
      var nextId = backCardIds[nextIdIndex].card_id;
      var currentId = backCardIds[nextIdIndex - 1].card_id;
    }

    console.log(nextIdIndex);
    console.log(nextId);

    const selectedIndex = card_details_session.findIndex((item, index) => {
      return item._id === currentId;
    });

    card_details_session[selectedIndex].former_status = card_details_session[selectedIndex].status;
    card_details_session[selectedIndex].detail_status.recent_selection = "move";
    card_details_session[selectedIndex].detail_status.recent_select_time = now;
    card_details_session[selectedIndex].detail_status.recent_stay_hour = this.state.time;
    card_details_session[selectedIndex].detail_status.total_stay_hour = card_details_session[selectedIndex].detail_status.total_stay_hour + this.state.time;

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

    const get_backContent = this.state.contentsList.find((item) => item._id === nextId);
    console.log(get_backContent);
    this.setState(
      {
        backContents: [get_backContent],
        prevIdIndex: this.state.prevIdIndex + 1,
        nextIdIndex: this.state.nextIdIndex + 1,
        currentCardId: nextId,
      },
      function () {
        this.stopTimerTotal();
        this.resetTimer();
      }
    );
  };
  shuffleCards = () => {
    console.log("카드섞기~")
    const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
    for (let i = card_details_session.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스(0 이상 i 미만)  
      [card_details_session[i], card_details_session[j]] = [card_details_session[j], card_details_session[i]];
    }
    for(var i = 0; i < card_details_session.length; i++) {
      card_details_session[i].detail_status.need_study_time_tmp = null
    }
    
    sessionStorage.setItem("cardlist_studying", JSON.stringify(card_details_session));
    sessionStorage.setItem("current_seq", -1);

    this.getContentsList();

  }
  render() {
    //일반모드에서 드랍다운메뉴 => 일반모드에서는 카드의 상태에 따라 드랍다운이 비활성화 되고, 난이도선택버튼의 메뉴를 달리함.
    if (this.state.pageStatus) {
      if (this.state.pageStatus === "normal") {
        var content = (
          <div style={{ fontSize: "11px", height: "120px", fontFamily: `"Noto Sans KR", sans-serif`, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <Button width="150px" onClick={() => this.onClickInterval("pass", 0)} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
              <span style={{ fontSize: "15px" }}>통과</span>
              <span style={{ fontSize: "10px" }}> 이번세션에서제외</span>
            </Button>
            <Button width="150px" onClick={() => this.onClickInterval("hold", 0)} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
              <span style={{ fontSize: "15px" }}>보류</span>
              <span style={{ fontSize: "10px" }}> 복구시까지향후학습제외</span>
            </Button>
            <Button width="150px" onClick={() => this.onClickInterval("completed", 0)} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
              <span style={{ fontSize: "15px" }}>졸업</span>
              <span style={{ fontSize: "10px" }}> 만랩찍고향후학습제외</span>
            </Button>
          </div>
        );
      } else if (this.state.pageStatus === "back") {
        if (this.state.currentCardId) {
          //이전모드에서 드랍다운메뉴 => 이전모드에서는 카드의 상태에 따라 메뉴를 달리함. 카드가  학습중일때는 보류, 졸업. 카드가 보류, 완료 일때는 복원.
          const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
          const selectedInfo= card_details_session.find((item, index) => {
            return item._id === this.state.currentCardId;
          });
          const selectedIndex= card_details_session.findIndex((item, index) => {
            return item._id === this.state.currentCardId;
          });

          const thisStatus = selectedInfo.status
          if(thisStatus === "hold" || thisStatus === "completed"){
            content = (
              <div style={{ fontSize: "11px", height: "120px", fontFamily: `"Noto Sans KR", sans-serif`, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                <Button width="150px" onClick={() => this.backRestore(this.state.currentCardId,selectedIndex)} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
                  <span style={{ fontSize: "15px" }}>복원</span>
                  <span style={{ fontSize: "10px" }}> 미학습 또는 학습중으로</span>
                </Button>
              </div>
            );
          } else {
            content = (
              <div style={{ fontSize: "11px", height: "120px", fontFamily: `"Noto Sans KR", sans-serif`, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                <Button width="150px" onClick={() => this.backHoldOrCompleted(this.state.currentCardId,selectedIndex,"hold")} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
                  <span style={{ fontSize: "15px" }}>보류</span>
                  <span style={{ fontSize: "10px" }}> 복구시까지향후학습제외</span>
                </Button>
                <Button width="150px" onClick={() => this.backHoldOrCompleted(this.state.currentCardId,selectedIndex,"completed")} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
                  <span style={{ fontSize: "15px" }}>졸업</span>
                  <span style={{ fontSize: "10px" }}> 만랩찍고향후학습제외</span>
                </Button>
              </div>
            );
          }
          

          
        }
      }
    }

    if (this.state.backContents.length > 0) {
      const contents = this.state.backContents[0];
      var content_id = contents._id;
      var back_first_face_data = contents.contents.face1.map((item) => <FroalaEditorView key={this.getKey()} model={item} />);
      var back_second_face_data = contents.contents.face2.map((item) => <FroalaEditorView key={this.getKey()} model={item} />);
    }

    if (this.state.contents.length > 0) {
      // const card_details_session = JSON.parse(sessionStorage.getItem("cardlist_studying"));
      const contents = this.state.contents[0];
      // const content_id = contents._id
      // const card_status = card_details_session.find((item, index) => {
      //   return item._id === content_id;
      // });
      // const status = card_status.detail_status.recent_study_result
      // console.log(status)
      // console.log(this.state.cardStatus)
      var restore_buttons = (
        <>
          <Button width="150px" onClick={() => this.onClickInterval("restore", 0)} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
            <span style={{ fontSize: "15px" }}>복원</span>
            <span style={{ fontSize: "10px" }}> 미학습 또는 학습중으로</span>
          </Button>
          <Button width="150px" onClick={() => this.onClickInterval("pass", 0)} style={{ ...buttonDefault, padding: 0, textAlign: "left", paddingLeft: "10px" }}>
            <span style={{ fontSize: "15px" }}>통과</span>
            <span style={{ fontSize: "10px" }}> 이번 세션에서 제외</span>
          </Button>
        </>
      );
      var thisStatus = this.state.cardStatus;

      var first_face_data = contents.contents.face1.map((item) => <FroalaEditorView key={this.getKey()} model={item} />);
      var second_face_data = contents.contents.face2.map((item) => <FroalaEditorView key={this.getKey()} model={item} />);
      if (this.state.level_config) {
        const level_config = this.state.level_config[0];
        var short_period = level_config.restudy_option.short.period;
        var long_period = level_config.restudy_option.long.period;
        var very_short_period = level_config.restudy_option.veryshort.period;
        var very_long_period = level_config.restudy_option.verylong.period;
        var short_nick = level_config.restudy_option.short.nick;
        var long_nick = level_config.restudy_option.long.nick;
        var very_short_nick = level_config.restudy_option.veryshort.nick;
        var very_long_nick = level_config.restudy_option.verylong.nick;
        var short_on_off = level_config.restudy_option.short.on_off;
        var long_on_off = level_config.restudy_option.long.on_off;
        var very_short_on_off = level_config.restudy_option.veryshort.on_off;
        var very_long_on_off = level_config.restudy_option.verylong.on_off;
        if (this.state.getKnowTime) {
          var knowTimeValue = this.state.getKnowTime;
          var time_next = knowTimeValue.time.toFixed(2);
          var time_unit = knowTimeValue.unit;
        }
      }
    }
    const selectionButtons = (
      <>
        {very_short_on_off === "on" && (
          <Button onClick={() => this.onClickInterval("veryshort", short_period)} width="140px" style={{ ...buttonDefault }}>
            {very_short_nick}({very_short_period})
          </Button>
        )}
        {short_on_off === "on" && (
          <Button onClick={() => this.onClickInterval("short", short_period)} width="140px" style={{ ...buttonDefault }}>
            {short_nick}({short_period})
          </Button>
        )}
        {long_on_off === "on" && (
          <Button onClick={() => this.onClickInterval("long", long_period)} width="140px" style={{ ...buttonDefault }}>
            {long_nick}({long_period})
          </Button>
        )}
        {very_long_on_off === "on" && (
          <Button onClick={() => this.onClickInterval("verylong", long_period)} width="140px" style={{ ...buttonDefault }}>
            {very_long_nick}({very_long_period})
          </Button>
        )}
      </>
    )
    const rememberedButtons = (
      <>
        <Button onClick={this.onClickRemembered} width="140px" style={{ ...buttonDefault }}>
          ok!이제그만/{time_next}
          {time_unit}
        </Button>
      </>
    )
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
              {thisStatus}
            </li>
          </ul>
          <div style={clickCount}>{this.state.clickCount}</div>
          <div style={style_study_layout_top_right}>
            <Timer
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
            />
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
                <Button width="35px" onClick={() => this.onClickInterval("back", 0)} style={{ ...buttonDefault, padding: 0, lineHeight: "13px" }}>
                  이전
                  <br />
                  카드
                </Button>

                {this.state.cardStatus === null && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}

                {this.state.cardStatus === "short" && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}

                {this.state.cardStatus === "long" && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}
                {this.state.cardStatus === "veryshort" && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}
                {this.state.cardStatus === "verylong" && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}

                {this.state.cardStatus === "know" && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}

                {this.state.cardStatus === "restore" && (
                  <>
                    {selectionButtons}
                    {rememberedButtons}
                  </>
                )}
                {this.state.cardStatus === "hold" && <>{restore_buttons}</>}
                {this.state.cardStatus === "completed" && <>{restore_buttons}</>}

                <Popover placement="bottomLeft" content={content} trigger="click">
                  <Button size="small" width="35px" style={{ ...buttonDefault, height: "32px" }}>
                    ...
                  </Button>
                </Popover>
                <Button size="small" width="35px" onClick={this.shuffleCards} style={{ ...buttonDefault, height: "32px",lineHeight: "13px" }}>
                카드
                  <br />
                  섞기
                  </Button>
              </div>
            </div>
          ) : (
            <div style={{ width: "1000px", border: "1px solid lightgrey", borderRadius: "10px" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                <LeftSquareOutlined onClick={this.prevCardClick} style={{ fontSize: "30px", color: "lightgrey", cusor: "pointer" }} />
                <div style={contentsDisplay}>
                  <div style={{ position: "relative", height: "50%", width: "910px", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>이전모드 {back_first_face_data}</div>
                  </div>
                  <div style={{ position: "relative", height: "50%", width: "910px", border: "1px dashed lightgrey", borderRadius: "5px" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>이전모드 {back_second_face_data}</div>
                  </div>
                </div>
                <RightSquareOutlined onClick={this.nextCardClick} style={{ fontSize: "30px", color: "lightgrey", cusor: "pointer" }} />
              </div>
              <div style={buttonDiv}>
                <Button width="35px" style={{ ...buttonDefault, padding: 0, overflow: "hidden", lineHeight: "13px", color: "lightgrey", cursor: "text" }}>
                  이전
                  <br />
                  카드
                </Button>
                <Button onClick={() => this.onClickBack(content_id)} width="200px" style={{ ...buttonDefault }}>
                  원 위치에서 학습 이어하기
                </Button>
                <Popover placement="bottomLeft" content={content} title="..." trigger="click">
                  <Button size="small" width="35px" style={{ ...buttonDefault, height: "32px" }}>
                    ...
                  </Button>
                </Popover>
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
  padding: "10px 60px",
  borderRadius: "0 0 10px 10px",
};
