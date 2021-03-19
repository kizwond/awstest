import React, { Component } from "react";
import axios from "axios";
import LeftDrawer from "./BookWritingLeftDrawer";
import "./BookWriting.css";
import { Select, Modal, Space, Divider, Spin } from "antd";
import SettingTabs from "./SettingTabs";
import EditorTry from "./EditorTry";
import { StarTwoTone } from "@ant-design/icons";

import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/plugins.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/languages/ko";
// import 'froala-editor//css/themes/gray.min.css'

// import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import BookRelocate from "./BookRelocate";
import NewCardTemplete from "./NewCardTemplete";
import NewPageTemplete from "./NewPageTemplete";
import CardTempleteEditing from "./CardTempleteEditing";
import CardDelete from "./CardDelete";
import CardEditing from "./CardEditing";
import ImportModal from "./ImportModal";
import Button from "../../styledComponents/defaultButton";

// import FroalaEditor from 'react-froala-wysiwyg';

const { Option } = Select;

export class BookWriting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      bookTitle: "",
      bookId: "",
      category: "",
      userEmail: "",
      user: "",
      table_of_contents: [],
      hide_show_toggle: false,
      left_drawer_toggle: true,
      card_type: [],
      card_add: false,
      contents: [],
      card_selected: "",
      arrayForEditor: [],
      current_card: {},
      current_card_type: "",
      card_type_name: "",
      card_selected_detailsetting: "",
      index_id: "",
      file: "",
      menu_position: 10,
      loading: false,
      card_selected_id: "",
      locationY: "",
      scrollTop: 0,
      child_card_add: false,
      current_card_name: "",
      parent_card_id: "",
      card_selected_props: "",
      face_selected_props: "",
      editor_style: "",
    };
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.getIndexList();
    this.getCardTypeList();
    this.getPageSetting();
  }

  handleScroll = (e) => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    this.setState({
      scrollTop,
    });
  };

  getPageSetting = () => {
    const value = sessionStorage.getItem("book_id");
    axios
      .post("api/pagetype/get-pagetype", {
        book_id: value,
      })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          page_type: res.data.pagetype,
        });
      });
  };

  getIndexList = () => {
    const value = sessionStorage.getItem("book_id");
    axios
      .post("api/index/get-indexlist", {
        book_id: value,
      })
      .then((res) => {
        // console.log(res.data);
        sessionStorage.setItem("firstIndex", res.data.indexList[0]._id);
        this.setState({
          table_of_contents: res.data.indexList,
        });
        const getfirstIndex = sessionStorage.getItem("firstIndex");
        const value = { node: { index_id: getfirstIndex } };
        this.onSelect([0], value);
        this.props.updatedLoginState(res.data.isloggedIn);
      });
  };
  getCardTypeList = () => {
    const value = sessionStorage.getItem("book_id");
    axios
      .post("api/cardtype/get-cardtype", {
        book_id: value,
      })
      .then((res) => {
        // console.log(res.data)
        this.setState({
          card_type: res.data.cardtypes,
        });
      });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  updateContentsTable = (value) => {
    console.log("updateContentsTable :", value);
    this.setState({
      table_of_contents: value,
    });
  };

  updateCardTypeState = (value) => {
    console.log("cardtype update state", value);
    this.setState({
      card_type: value,
    });
  };
  updateCardListState = (value) => {
    this.setState({
      contents: value,
    });
  };

  handleClick = (key) => {
    if (key === "1") {
      this.setState({
        hide_show_toggle: true,
      });
    } else if (key === "2") {
      this.setState({
        hide_show_toggle: true,
      });
    } else if (key === "3") {
      this.setState({
        hide_show_toggle: true,
      });
    } else if (key === "4") {
      this.setState({
        hide_show_toggle: true,
      });
    } else if (key === "5") {
      this.setState({
        hide_show_toggle: true,
      });
    } else if (key === "0") {
      this.setState({
        hide_show_toggle: false,
      });
    }
  };
  leftDrawerHandleClick = (key) => {
    if (key === "none") {
      this.setState({
        left_drawer_toggle: false,
      });
    } else if (key === "목차") {
      this.setState({
        left_drawer_toggle: true,
      });
    }
  };
  selectCardTypeHandler = (key) => {
    if (key === "카드선택") {
      this.setState({
        card_selected: "none",
      });
    } else {
      this.setState({
        card_selected: key,
      });
    }
  };

  updateCardSelectedState = (key) => {
    if (this.state.index_id) {
      this.setState({
        card_selected: key,
      });
      this.addCardHandler(key);
    } else {
      alert("목차를 선택후 카드추가를 시작하세요!!!");
    }
  };

  addCardHandler = (key) => {
    // console.log("------------------->", key);
    // console.log("check 1", this.state.card_type);
    const contentsList = this.state.card_type.map((content) => {
      //   console.log(content);

      //   console.log(content.name);
      if (content.name === key) {
        // console.log("here", content);
        const cardType = content.type;
        const selectionLength = content.num_of_row.selection;
        // console.log(cardType);
        if (cardType === "read") {
          const faceLength_1 = content.num_of_row.face1;
          const annotLength = content.num_of_row.annotation;
          const face_array = [];
          for (var i = 1; i < faceLength_1 + 1; i++) {
            face_array.push(content.nick_of_row.face1[i - 1]);
          }
          for (i = 1; i < annotLength + 1; i++) {
            face_array.push(content.nick_of_row.annotation[i - 1]);
          }
          //   console.log(face_array);
          //   console.log(content);
          this.setState({
            current_card: { face1: faceLength_1, annot: annotLength },
            current_card_type: content._id,
            card_type_name: content.type,
            editor_style: content,
          });
          return face_array;
        } else if (cardType === "flip-normal") {
          if (selectionLength > 0) {
            const faceLength_1 = content.num_of_row.face1;
            const faceLength_2 = content.num_of_row.face2;
            const annotLength = content.num_of_row.annotation;
            const face_array = [];
            for (i = 1; i < faceLength_1 + 1; i++) {
              face_array.push(content.nick_of_row.face1[i - 1]);
            }
            for (i = 1; i < selectionLength + 1; i++) {
              face_array.push(content.nick_of_row.selection[i - 1]);
            }
            for (i = 1; i < faceLength_2 + 1; i++) {
              face_array.push(content.nick_of_row.face2[i - 1]);
            }
            for (i = 1; i < annotLength + 1; i++) {
              face_array.push(content.nick_of_row.annotation[i - 1]);
            }
            // console.log(face_array);
            this.setState({
              current_card: {
                face1: faceLength_1,
                selection: selectionLength,
                face2: faceLength_2,
                annot: annotLength,
              },
              current_card_type: content._id,
              card_type_name: content.type,
              editor_style: content,
            });
            return face_array;
          } else {
            const faceLength_1 = content.num_of_row.face1;
            const faceLength_2 = content.num_of_row.face2;
            const annotLength = content.num_of_row.annotation;
            const face_array = [];
            for (i = 1; i < faceLength_1 + 1; i++) {
              face_array.push(content.nick_of_row.face1[i - 1]);
            }
            for (i = 1; i < faceLength_2 + 1; i++) {
              face_array.push(content.nick_of_row.face2[i - 1]);
            }
            for (i = 1; i < annotLength + 1; i++) {
              face_array.push(content.nick_of_row.annotation[i - 1]);
            }
            // console.log(face_array);
            this.setState({
              current_card: {
                face1: faceLength_1,
                face2: faceLength_2,
                annot: annotLength,
              },
              current_card_type: content._id,
              card_type_name: content.type,
              editor_style: content,
            });
            return face_array;
          }
        } else if (cardType === "share") {
          const faceLength_1 = content.num_of_row.face1;
          const annotLength = content.num_of_row.annotation;
          const face_array = [];
          for (i = 1; i < faceLength_1 + 1; i++) {
            face_array.push(content.nick_of_row.face1[i - 1]);
          }
          for (i = 1; i < annotLength + 1; i++) {
            face_array.push(content.nick_of_row.annotation[i - 1]);
          }
          //   console.log(face_array);
          this.setState({
            current_card: { face1: faceLength_1, annot: annotLength },
            current_card_type: content._id,
            card_type_name: content.type,
            editor_style: content,
          });
          return face_array;
        } else if (cardType === "none") {
          const faceLength_1 = content.num_of_row.face1;
          const annotLength = content.num_of_row.annotation;
          const face_array = [];
          for (i = 1; i < faceLength_1 + 1; i++) {
            face_array.push(content.nick_of_row.face1[i - 1]);
          }
          for (i = 1; i < annotLength + 1; i++) {
            face_array.push(content.nick_of_row.annotation[i - 1]);
          }
          //   console.log(face_array);
          this.setState({
            current_card: { face1: faceLength_1, annot: annotLength },
            current_card_type: content._id,
            card_type_name: content.type,
            editor_style: content,
          });
          return face_array;
        }
      }
    });

    var filtered = contentsList.filter(function (x) {
      return x !== undefined;
    });
    const finalArray = filtered[0];
    // console.log("finalArray: ", finalArray);
    this.setState({
      card_add: true,
      arrayForEditor: finalArray,
    });
  };

  cardAddStateHandler = () => {
    this.setState({
      card_add: false,
    });
  };

  updateContentsState = (value) => {
    // console.log("updateContentsState", value);
    this.setState({
      contents: value,
      editor1: "",
      editor2: "",
      editor3: "",
      editor4: "",
      editor5: "",
      editor6: "",
      editor7: "",
      editor8: "",
      editor9: "",
      editor10: "",
      editor11: "",
      editor12: "",
      editor13: "",
      editor14: "",
      editor15: "",
    });
    this.setState({ card_add: false });

    const sortValue = value.slice();
    sortValue.sort(function (a, b) {
      return a.time_created > b.time_created ? -1 : a.time_created < b.time_created ? 1 : 0;
    });
    const card_id = sortValue[0]._id;
    const seq = sortValue[0].seq_in_index;
    this.onClickCardHandler(card_id, seq);
  };
  updateContentsListState = () => {
    this.setState({
      contents: [],
    });
    axios
      .post("api/card/get-cardlist", {
        index_id: this.state.index_id,
      })
      .then((res) => {
        // console.log("what", res.data);
        this.setState({
          contents: res.data.cardlist,
        });
      });
  };

  async onSelect(selectedKeys, info) {
    this.setState({
      index_id: info.node.index_id,
      loading: true,
      card_selected_id: "",
    });
    await axios
      .post("api/card/get-cardlist", {
        index_id: info.node.index_id,
      })
      .then((res) => {
        // console.log(res.data)
        this.setState({
          contents: res.data.cardlist,
          loading: false,
        });
      });
  }

  onClickCardHandler = (value, seq) => {
    var elemClass = document.getElementsByClassName("card_class");
    var elemBtnsClass = document.getElementsByClassName("card_edit_btns");

    for (var i = 0; i < elemClass.length; i++) {
      elemClass[i].style.transform = "none";
      elemClass[i].style.transition = "all ease 0.7s";
      elemClass[i].style.boxShadow = "none";
    }

    for (var i = 0; i < elemClass.length; i++) {
      elemBtnsClass[i].style.display = "none";
    }

    var elem = document.getElementById(value);
    var elem_btn = document.getElementById(value + "_btn");
    elem.style.transform = "scale( 1.01 )";
    elem.style.transition = "all ease 0.7s";
    elem.style.boxShadow = "0px 0px 6px 0px rgba(112,112,112,1)";

    elem_btn.style.display = "flex";
    elem_btn.style.flexDirection = "row";
    elem_btn.style.justifyContent = "space-between";

    let offsetTop = elem.getBoundingClientRect().top;
    this.setState({
      menu_position: offsetTop + this.state.scrollTop - 95,
      selected_card_seq: seq,
      card_selected_id: value,
    });
  };
  onMouseOverCardHandler = (value, seq) => {
    // var elem = document.getElementById(value);
    // var elem_btn = document.getElementById(value+"_btn");
    // elem.style.transform = "scale( 1.01 )";
    // elem.style.transition = "all ease 0.7s";
    // elem.style.border = "1px solid lightgrey";
    // elem.style.borderRadius = "10px";
    // elem.style.boxShadow = "5px 5px 5px -3px rgba(112,112,112,1)";
    // elem_btn.style.display = "flex";
    // elem_btn.style.flexDirection = "row";
    // elem_btn.style.justifyContent = "space-between";
    // let offsetTop  = elem.getBoundingClientRect().top;
    // this.setState({
    //   menu_position:offsetTop-95,
    //   selected_card_seq:seq
    // })
  };
  onLeaveCardHandler = (value) => {
    // var elem = document.getElementById(value);
    // var elem_btn = document.getElementById(value+"_btn");
    // elem.style.transform = "none";
    // elem.style.transition = "all ease 0.7s";
    // elem.style.border = "none";
    // elem.style.borderRadius = "0px";
    // elem.style.boxShadow ="none";
    // elem_btn.style.display = "none";
  };
  addChildCard = () => {
    // console.log("add ChildCard Clicked!!!");
    this.setState({
      child_card_add: true,
      card_add: true,
      parent_card_id: this.state.card_selected_id,
    });
    this.addCardHandler(this.state.current_card_name);
  };
  addSiblingCard = (parent) => {
    // console.log("add SiblingCard Clicked!!!");
    // console.log(parent);
    this.setState({
      child_card_add: true,
      card_add: true,
      parent_card_id: parent,
    });
    this.addCardHandler(this.state.current_card_name);
  };

  handleShareChildAddChange = (value) => {
    // console.log(`selected ${value}`);
    this.setState({
      current_card_name: value,
    });
  };

  onCardChangeHandler = (e) => {
    // console.log("onCardChangeHandler : ", e.target.value);
    this.setState({
      card_selected_props: e.target.value,
    });
  };

  onFaceChangeHandler = (e) => {
    // console.log("onFaceChangeHandler : ", e.target.value);
    this.setState({
      face_selected_props: e.target.value,
    });
  };
  cardEditing = (value) => {
    // console.log(value);
    return (
      <>
        <CardEditing
          arrayForEditor={this.state.arrayForEditor}
          cardTypeDetail={value.cardTypeDetail}
          updateContentsListState={this.updateContentsListState}
          index_id={this.state.index_id}
          card_type={value.type}
          card_id={value.card_id}
          content={value.content}
          handleSubmit={this.handleSubmit}
          updateContentsState={this.updateContentsState}
        />
        <CardDelete updateCardListState={this.updateCardListState} card_id={value.card_id} index_id={this.state.index_id} seq_in_index={value.seq_in_index} />
      </>
    );
  };

  editorTry1 = () => {
    return (
      <>
        <EditorTry
          arrayForEditor={this.state.arrayForEditor}
          editor_style={this.state.editor_style}
          selected_card_seq={this.state.selected_card_seq}
          handleSubmit={this.handleSubmit}
          cardAddStateHandler={this.cardAddStateHandler}
          card_type_name={this.state.card_type_name}
          updateContentsState={this.updateContentsState}
          current_card_type={this.state.current_card_type}
          contents={this.state.contents}
          index_id={this.state.index_id}
          current_card={this.state.current_card}
        />
      </>
    );
  };
  editorTry2 = () => {
    return (
      <>
        <EditorTry
          arrayForEditor={this.state.arrayForEditor}
          editor_style={this.state.editor_style}
          selected_card_seq={this.state.selected_card_seq}
          handleSubmit={this.handleSubmit}
          cardAddStateHandler={this.cardAddStateHandler}
          card_type_name={this.state.card_type_name}
          updateContentsState={this.updateContentsState}
          current_card_type={this.state.current_card_type}
          contents={this.state.contents}
          index_id={this.state.index_id}
          current_card={this.state.current_card}
          child_card_add={this.state.child_card_add}
          parent_card_id={this.state.parent_card_id}
        />
      </>
    );
  };
  render() {
    if (this.state.hide_show_toggle === false) {
      var toggle = "-308px";
      var main = "0px";
    } else {
      toggle = "0px";
      main = "-308px";
    }
    if (this.state.left_drawer_toggle === false) {
      var toggleLeft = "-31px";
    } else {
      toggleLeft = "0px";
    }

    if (this.state.contents) {
      //   console.log(this.state.contents);
      var contentsList = this.state.contents.map((content) => {
        // console.log(content);
        // console.log(this.state.card_type);
        const cardTypeChosen = this.state.card_type.find((element) => element._id === content.cardtype_id);
        // console.log(cardTypeChosen);
        const flag_column_num = cardTypeChosen.num_of_row.maker_flag;
        const face1_column_num = cardTypeChosen.num_of_row.face1;
        const selection_column_num = cardTypeChosen.num_of_row.selection;
        const face2_column_num = cardTypeChosen.num_of_row.face2;
        const annot_column_num = cardTypeChosen.num_of_row.annotation;
        const none_column_num = cardTypeChosen.num_of_row.none;
        const share_column_num = cardTypeChosen.num_of_row.share;

        const direction = cardTypeChosen.card_style.card_direction;
        // const annotation_on = cardTypeChosen.annotation;

        // 읽기카드
        if (cardTypeChosen.type === "read") {
          const flag = [];
          for (var i = 0; i < flag_column_num; i++) {
            flag.push(content.contents.maker_flag[i]);
          }
          const face1 = [];
          for (i = 0; i < face1_column_num; i++) {
            face1.push(<FroalaEditorView model={content.contents.face1[i]} />);
          }
          const annotation_contents = [];
          for (i = 0; i < annot_column_num; i++) {
            annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]} />);
          }
          const total = [];
          total.push({
            cardTypeDetail: cardTypeChosen,
            content: content,
            face1: face1,
            annotation_contents: annotation_contents,
            type: cardTypeChosen.type,
            flag: flag,
            card_id: content._id,
            seq_in_index: content.seq_in_index,
          });
          return total;
        } else if (cardTypeChosen.type === "flip-normal") {
          if (selection_column_num > 0) {
            const flag = [];
            for (i = 0; i < flag_column_num; i++) {
              flag.push(content.contents.maker_flag[i]);
            }
            const face1 = [];
            for (i = 0; i < face1_column_num; i++) {
              face1.push(<FroalaEditorView model={content.contents.face1[i]} />);
            }
            const selection_contents = [];
            for (i = 0; i < selection_column_num; i++) {
              selection_contents.push(<FroalaEditorView model={content.contents.selection[i]} />);
            }
            const face2 = [];
            for (i = 0; i < face2_column_num; i++) {
              face2.push(<FroalaEditorView model={content.contents.face2[i]} />);
            }
            const annotation_contents = [];
            for (i = 0; i < annot_column_num; i++) {
              annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]} />);
            }
            const total = [];
            total.push({
              cardTypeDetail: cardTypeChosen,
              content: content,
              face1: face1,
              selection_contents: selection_contents,
              face2: face2,
              annotation_contents: annotation_contents,
              type: cardTypeChosen.type,
              direction: direction,
              flag: flag,
              card_id: content._id,
              seq_in_index: content.seq_in_index,
            });
            return total;
          } else {
            const flag = [];
            for (i = 0; i < flag_column_num; i++) {
              flag.push(content.contents.maker_flag[i]);
            }
            const face1 = [];
            for (i = 0; i < face1_column_num; i++) {
              face1.push(<FroalaEditorView model={content.contents.face1[i]} />);
            }
            const face2 = [];
            for (i = 0; i < face2_column_num; i++) {
              face2.push(<FroalaEditorView model={content.contents.face2[i]} />);
            }
            const annotation_contents = [];
            for (i = 0; i < annot_column_num; i++) {
              annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]} />);
            }
            const total = [];
            total.push({
              cardTypeDetail: cardTypeChosen,
              content: content,
              face1: face1,
              face2: face2,
              annotation_contents: annotation_contents,
              type: cardTypeChosen.type,
              direction: direction,
              flag: flag,
              card_id: content._id,
              seq_in_index: content.seq_in_index,
            });
            return total;
          }
        } else if (cardTypeChosen.type === "none") {
          const face1 = [];
          for (i = 0; i < face1_column_num; i++) {
            face1.push(<FroalaEditorView model={content.contents.face1[i]} />);
          }
          const annotation_contents = [];
          for (i = 0; i < annot_column_num; i++) {
            annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]} />);
          }
          const total = [];
          total.push({
            cardTypeDetail: cardTypeChosen,
            content: content,
            face1: face1,
            annotation_contents: annotation_contents,
            type: cardTypeChosen.type,
            card_id: content._id,
            seq_in_index: content.seq_in_index,
          });
          return total;
        } else if (cardTypeChosen.type === "share") {
          const face1 = [];
          for (i = 0; i < face1_column_num; i++) {
            face1.push(<FroalaEditorView model={content.contents.face1[i]} />);
          }
          const annotation_contents = [];
          for (i = 0; i < annot_column_num; i++) {
            annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]} />);
          }
          const total = [];
          total.push({
            cardTypeDetail: cardTypeChosen,
            content: content,
            face1: face1,
            annotation_contents: annotation_contents,
            type: cardTypeChosen.type,
            card_id: content._id,
            seq_in_index: content.seq_in_index,
          });
          return total;
        }
      });
    }

    if (this.state.card_type) {
      var optionList = this.state.card_type.map((type) => (
        <Button size="small" onClick={() => this.updateCardSelectedState(type.name)} style={{ cursor: "pointer", marginBottom: "5px", fontSize: "10px" }} key={type._id}>
          {" "}
          {type.name}
        </Button>
      ));
      var optionShareList = this.state.card_type.map((type, index) => {
        if (type.type === "flip-normal") {
          return (
            <Option size="small" style={{ fontSize: "10px" }} key={index} value={type.name}>
              {" "}
              {type.name}
            </Option>
          );
        }
      });
    }

    if (contentsList) {
      var list = contentsList.map((content) => {
        // console.log(content)
        const contentPath = content[0].cardTypeDetail;
        // console.log(contentPath.card_style.left_right_ratio)

        var cardLeftRatio = contentPath.card_style.left_right_ratio.face1;
        var cardRightRatio = contentPath.card_style.left_right_ratio.face2;
        const borderTopType = contentPath.card_style.border.package.type;
        const borderTopThickness = contentPath.card_style.border.package.thickness;
        const borderTopColor = contentPath.card_style.border.package.color;
        const cardBackgroundColor = contentPath.card_style.background_color;
        const cardInnerMarginTop = contentPath.card_style.outer_margin.top;
        const cardInnerMarginRight = contentPath.card_style.outer_margin.right;
        const cardInnerMarginBottom = contentPath.card_style.outer_margin.bottom;
        const cardInnerMarginLeft = contentPath.card_style.outer_margin.left;
        const cardInnerPaddingTop = contentPath.card_style.inner_padding.top;
        const cardInnerPaddingRight = contentPath.card_style.inner_padding.right;
        const cardInnerPaddingBottom = contentPath.card_style.inner_padding.bottom;
        const cardInnerPaddingLeft = contentPath.card_style.inner_padding.left;

        if (contentPath.face_style.length > 0) {
          var face1borderTopType = contentPath.face_style[0].border.package.type;
          var face1borderTopThickness = contentPath.face_style[0].border.package.thickness;
          var face1borderTopColor = contentPath.face_style[0].border.package.color;
          var face1BackgroundColor = contentPath.face_style[0].background_color;
          var face1InnerMarginTop = contentPath.face_style[0].outer_margin.top;
          var face1InnerMarginRight = contentPath.face_style[0].outer_margin.right;
          var face1InnerMarginBottom = contentPath.face_style[0].outer_margin.bottom;
          var face1InnerMarginLeft = contentPath.face_style[0].outer_margin.left;
          var face1InnerPaddingTop = contentPath.face_style[0].inner_padding.top;
          var face1InnerPaddingRight = contentPath.face_style[0].inner_padding.right;
          var face1InnerPaddingBottom = contentPath.face_style[0].inner_padding.bottom;
          var face1InnerPaddingLeft = contentPath.face_style[0].inner_padding.left;

          var face2borderTopType = contentPath.face_style[1].border.package.type;
          var face2borderTopThickness = contentPath.face_style[1].border.package.thickness;
          var face2borderTopColor = contentPath.face_style[1].border.package.color;
          var face2BackgroundColor = contentPath.face_style[1].background_color;
          var face2InnerMarginTop = contentPath.face_style[1].outer_margin.top;
          var face2InnerMarginRight = contentPath.face_style[1].outer_margin.right;
          var face2InnerMarginBottom = contentPath.face_style[1].outer_margin.bottom;
          var face2InnerMarginLeft = contentPath.face_style[1].outer_margin.left;
          var face2InnerPaddingTop = contentPath.face_style[1].inner_padding.top;
          var face2InnerPaddingRight = contentPath.face_style[1].inner_padding.right;
          var face2InnerPaddingBottom = contentPath.face_style[1].inner_padding.bottom;
          var face2InnerPaddingLeft = contentPath.face_style[1].inner_padding.left;
        }

        if (content[0].flag == "1") {
          var star = <StarTwoTone />;
        } else if (content[0].flag == "2") {
          star = (
            <>
              <StarTwoTone />
              <StarTwoTone />
            </>
          );
        } else if (content[0].flag == "3") {
          star = (
            <>
              <StarTwoTone />
              <StarTwoTone />
              <StarTwoTone />
            </>
          );
        } else if (content[0].flag == "4") {
          star = (
            <>
              <StarTwoTone />
              <StarTwoTone />
              <StarTwoTone />
              <StarTwoTone />
            </>
          );
        } else if (content[0].flag == "5") {
          star = (
            <>
              <StarTwoTone />
              <StarTwoTone />
              <StarTwoTone />
              <StarTwoTone />
              <StarTwoTone />
            </>
          );
        } else {
          star = "";
        }
        const cardStyle = {
          cursor: "pointer",
          backgroundColor: `${cardBackgroundColor}`,
          margin: `${cardInnerMarginTop}px ${cardInnerMarginRight}px ${cardInnerMarginBottom}px ${cardInnerMarginLeft}px`,
          padding: `${cardInnerPaddingTop}px ${cardInnerPaddingLeft}px ${cardInnerPaddingRight}px ${cardInnerPaddingBottom}px`,
          border: `${borderTopType} ${borderTopThickness}px ${borderTopColor}`,
        };
        const face1Style = {
          width: "100%",
          backgroundColor: `${face1BackgroundColor}`,
          margin: `${face1InnerMarginTop}px ${face1InnerMarginRight}px ${face1InnerMarginBottom}px ${face1InnerMarginLeft}px`,
          padding: `${face1InnerPaddingTop}px ${face1InnerPaddingLeft}px ${face1InnerPaddingRight}px ${face1InnerPaddingBottom}px`,
          border: `${face1borderTopType} ${face1borderTopThickness}px ${face1borderTopColor}`,
        };
        const face2Style = {
          width: "100%",
          backgroundColor: `${face2BackgroundColor}`,
          margin: `${face2InnerMarginTop}px ${face2InnerMarginRight}px ${face2InnerMarginBottom}px ${face2InnerMarginLeft}px`,
          padding: `${face2InnerPaddingTop}px ${face2InnerPaddingLeft}px ${face2InnerPaddingRight}px ${face2InnerPaddingBottom}px`,
          border: `${face2borderTopType} ${face2borderTopThickness}px ${face2borderTopColor}`,
        };
        // console.log("handle this:", content[0])

        const face1Contents = content[0].face1.map((item, contentsIndex) => {
          let borderTopType;
          let borderTopThickness;
          let borderTopColor;
          let BackgroundColor;
          let InnerMarginTop;
          let InnerMarginRight;
          let InnerMarginBottom;
          let InnerMarginLeft;
          let InnerPaddingTop;
          let InnerPaddingRight;
          let InnerPaddingBottom;
          let InnerPaddingLeft;
          let rowStyle;
          content[0].cardTypeDetail.row_style.face1.map((style, styleIndex) => {
            if (styleIndex === contentsIndex) {
              borderTopType = style.border.package.type;
              borderTopThickness = style.border.package.thickness;
              borderTopColor = style.border.package.color;
              BackgroundColor = style.background_color;
              InnerMarginTop = style.outer_margin.top;
              InnerMarginRight = style.outer_margin.right;
              InnerMarginBottom = style.outer_margin.bottom;
              InnerMarginLeft = style.outer_margin.left;
              InnerPaddingTop = style.inner_padding.top;
              InnerPaddingRight = style.inner_padding.right;
              InnerPaddingBottom = style.inner_padding.bottom;
              InnerPaddingLeft = style.inner_padding.left;
            }
          });

          let align;
          let bold;
          let color;
          let fontType;
          let fontStyle;
          let size;
          let underline;
          content[0].cardTypeDetail.font.face1.map((font, fontIndex) => {
            if (fontIndex === contentsIndex) {
              //   console.log(font)
              if (font.bold === "on") {
                var font_weight = "700";
              } else {
                font_weight = "400";
              }
              if (font.italic === "on") {
                var font_style = "italic";
              } else {
                font_style = "none";
              }
              if (font.underline === "on") {
                var text_decoration = "underline ";
              } else {
                text_decoration = "none";
              }
              align = font.align;
              bold = font_weight;
              color = font.color;
              fontType = font.font;
              fontStyle = font_style;
              size = font.size;
              underline = text_decoration;
            }
          });
          rowStyle = {
            width: "100%",
            backgroundColor: `${BackgroundColor}`,
            margin: `${InnerMarginTop}px ${InnerMarginRight}px ${InnerMarginBottom}px ${InnerMarginLeft}px `,
            padding: `${InnerPaddingTop}px ${InnerPaddingRight}px ${InnerPaddingBottom}px ${InnerPaddingLeft}px`,
            border: `${borderTopType} ${borderTopThickness}px ${borderTopColor}`,
            textAlign: `${align}`,
            fontWeight: `${bold}`,
            color: `${color}`,
            textAlign: `${align}`,
            fontStyle: `${fontStyle}`,
            fontSize: `${size}px`,
            textDecoration: `${underline}`,
          };
          //   console.log(rowStyle)
          return <div style={rowStyle}>{item}</div>;
        });

        if (content[0].face2) {
          var face2Contents = content[0].face2.map((item, contentsIndex) => {
            let borderTopType;
            let borderTopThickness;
            let borderTopColor;
            let BackgroundColor;
            let InnerMarginTop;
            let InnerMarginRight;
            let InnerMarginBottom;
            let InnerMarginLeft;
            let InnerPaddingTop;
            let InnerPaddingRight;
            let InnerPaddingBottom;
            let InnerPaddingLeft;
            let rowStyle;
            content[0].cardTypeDetail.row_style.face2.map((style, styleIndex) => {
              if (styleIndex === contentsIndex) {
                borderTopType = style.border.package.type;
                borderTopThickness = style.border.package.thickness;
                borderTopColor = style.border.package.color;
                BackgroundColor = style.background_color;
                InnerMarginTop = style.outer_margin.top;
                InnerMarginRight = style.outer_margin.right;
                InnerMarginBottom = style.outer_margin.bottom;
                InnerMarginLeft = style.outer_margin.left;
                InnerPaddingTop = style.inner_padding.top;
                InnerPaddingRight = style.inner_padding.right;
                InnerPaddingBottom = style.inner_padding.bottom;
                InnerPaddingLeft = style.inner_padding.left;
              }
            });
            let align;
            let bold;
            let color;
            let fontType;
            let fontStyle;
            let size;
            let underline;
            content[0].cardTypeDetail.font.face2.map((font, fontIndex) => {
              if (fontIndex === contentsIndex) {
                // console.log(font)
                if (font.bold === "on") {
                  var font_weight = "700";
                } else {
                  font_weight = "400";
                }
                if (font.italic === "on") {
                  var font_style = "italic";
                } else {
                  font_style = "none";
                }
                if (font.underline === "on") {
                  var text_decoration = "underline ";
                } else {
                  text_decoration = "none";
                }
                align = font.align;
                bold = font_weight;
                color = font.color;
                fontType = font.font;
                fontStyle = font_style;
                size = font.size;
                underline = text_decoration;
              }
            });
            rowStyle = {
              width: "100%",
              backgroundColor: `${BackgroundColor}`,
              margin: `${InnerMarginTop}px ${InnerMarginRight}px ${InnerMarginBottom}px ${InnerMarginLeft}px `,
              padding: `${InnerPaddingTop}px ${InnerPaddingRight}px ${InnerPaddingBottom}px ${InnerPaddingLeft}px`,
              border: `${borderTopType} ${borderTopThickness}px ${borderTopColor}`,
              textAlign: `${align}`,
              fontWeight: `${bold}`,
              color: `${color}`,
              textAlign: `${align}`,
              fontStyle: `${fontStyle}`,
              fontSize: `${size}px`,
              textDecoration: `${underline}`,
            };
            return <div style={rowStyle}>{item}</div>;
          });
        }

        if (content[0].selection_contents) {
          var selectionContents = content[0].selection_contents.map((item, contentsIndex) => {
            // console.log(content[0].cardTypeDetail)
            const selectionStyle = content[0].cardTypeDetail.row_style.selection[0];

            let borderTopType = selectionStyle.border.package.type;
            let borderTopThickness = selectionStyle.border.package.thickness;
            let borderTopColor = selectionStyle.border.package.color;
            let BackgroundColor = selectionStyle.background_color;
            let InnerMarginTop = selectionStyle.outer_margin.top;
            let InnerMarginRight = selectionStyle.outer_margin.right;
            let InnerMarginBottom = selectionStyle.outer_margin.bottom;
            let InnerMarginLeft = selectionStyle.outer_margin.left;
            let InnerPaddingTop = selectionStyle.inner_padding.top;
            let InnerPaddingRight = selectionStyle.inner_padding.right;
            let InnerPaddingBottom = selectionStyle.inner_padding.bottom;
            let InnerPaddingLeft = selectionStyle.inner_padding.left;

            const selectionFont = content[0].cardTypeDetail.font.selection[0];

            if (selectionFont.bold === "on") {
              var font_weight = "700";
            } else {
              font_weight = "400";
            }
            if (selectionFont.italic === "on") {
              var font_style = "italic";
            } else {
              font_style = "none";
            }
            if (selectionFont.underline === "on") {
              var text_decoration = "underline ";
            } else {
              text_decoration = "none";
            }
            let align = selectionFont.align;
            let bold = font_weight;
            let color = selectionFont.color;
            let fontType = selectionFont.font;
            let fontStyle = font_style;
            let size = selectionFont.size;
            let underline = text_decoration;

            let rowStyle = {
              width: "100%",
              backgroundColor: `${BackgroundColor}`,
              margin: `${InnerMarginTop}px ${InnerMarginRight}px ${InnerMarginBottom}px ${InnerMarginLeft}px `,
              padding: `${InnerPaddingTop}px ${InnerPaddingRight}px ${InnerPaddingBottom}px ${InnerPaddingLeft}px`,
              border: `${borderTopType} ${borderTopThickness}px ${borderTopColor}`,
              textAlign: `${align}`,
              fontWeight: `${bold}`,
              color: `${color}`,
              textAlign: `${align}`,
              fontStyle: `${fontStyle}`,
              fontSize: `${size}px`,
              textDecoration: `${underline}`,
            };
            return <div style={rowStyle}>{item}</div>;
          });
        }
        if (this.state.page_type) {
          // console.log(this.state.page_type);
          const pageType = this.state.page_type[0].pagetype;
          var annot_ratio = pageType.annot_ratio;
          var face_ratio = 100 - annot_ratio;
        }
        if (content[0].type === "read") {
          return (
            <>
              {" "}
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div>{star}</div>
                <div
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ ...face1Style, width: `${face_ratio}%` }}>{face1Contents}</div>
                  <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id ? this.editorTry1() : ""}
            </>
          );
        } else if (content[0].type === "flip-normal" && !content[0].selection_contents && content[0].direction === "left-right") {
          return (
            <>
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div>{star}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row", width: `${face_ratio}%` }}>
                    <div style={{ ...face1Style, width: `${cardLeftRatio}%` }}>{face1Contents}</div>
                    <div style={{ ...face2Style, width: `${cardRightRatio}%` }}>{face2Contents}</div>
                  </div>
                  <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    {content[0].content.parent_card_id && (
                      <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <Button size="small" onClick={() => this.addSiblingCard(content[0].content.parent_card_id)}>
                          형제카드추가
                        </Button>
                      </>
                    )}
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? this.editorTry1() : ""}
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? this.editorTry2() : ""}
            </>
          );
        } else if (content[0].type === "flip-normal" && content[0].selection_contents && content[0].direction === "left-right") {
          return (
            <>
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div>{star}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", width: `${face_ratio}%` }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: `${cardLeftRatio}%`,
                      }}
                    >
                      <div style={face1Style}>{face1Contents}</div>
                      <div style={face1Style}>{selectionContents}</div>
                    </div>
                    <div style={{ ...face2Style, width: `${cardRightRatio}%` }}>{face2Contents}</div>
                  </div>
                  <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    {content[0].content.parent_card_id && (
                      <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <Button size="small" style={{ fontSize: "10px" }} onClick={() => this.addSiblingCard(content[0].content.parent_card_id)}>
                          형제카드추가
                        </Button>
                      </>
                    )}
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? this.editorTry1() : ""}
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? this.editorTry2() : ""}
            </>
          );
        } else if (content[0].type === "flip-normal" && !content[0].selection_contents && content[0].direction === "top-bottom") {
          return (
            <>
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div>{star}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: `${face_ratio}%`,
                      }}
                    >
                      <div style={face1Style}>{face1Contents}</div>
                      <div style={face2Style}>{face2Contents}</div>
                    </div>
                    <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                  </div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    {content[0].content.parent_card_id && (
                      <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <Button size="small" style={{ fontSize: "10px" }} onClick={() => this.addSiblingCard(content[0].content.parent_card_id)}>
                          형제카드추가
                        </Button>
                      </>
                    )}
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? this.editorTry1() : ""}
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? this.editorTry2() : ""}
            </>
          );
        } else if (content[0].type === "flip-normal" && content[0].selection_contents && content[0].direction === "top-bottom") {
          return (
            <>
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div>{star}</div>
                <div
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: `${face_ratio}%` }}>
                    <div
                      style={{
                        marginBottom: "5px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={face1Style}>{face1Contents}</div>
                      <div>{selectionContents}</div>
                      <div style={face2Style}>{face2Contents}</div>
                    </div>
                  </div>
                  <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    {content[0].content.parent_card_id && (
                      <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <Button size="small" style={{ fontSize: "10px" }} onClick={() => this.addSiblingCard(content[0].content.parent_card_id)}>
                          형제카드추가
                        </Button>
                      </>
                    )}
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? this.editorTry1() : ""}
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? this.editorTry2() : ""}
            </>
          );
        } else if (content[0].type === "none") {
          console.log("none card should be appeared!!!!!!!!!!!!!!!!!!!!!");
          return (
            <>
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ ...face1Style, width: `${face_ratio}%` }}>{face1Contents}</div>
                  <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id ? this.editorTry1() : ""}
            </>
          );
        } else if (content[0].type === "share") {
          return (
            <>
              <div
                style={cardStyle}
                id={content[0].card_id}
                className="card_class"
                onClick={() => this.onClickCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id, content[0].seq_in_index)}
                onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)}
              >
                <div style={{ fontSize: "11px", color: "blue" }}>참고 : {content[0].cardTypeDetail.name}</div>
                <div
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ ...face1Style, width: `${face_ratio}%` }}>{face1Contents}</div>
                  <div style={{ width: `${annot_ratio}%` }}>{content[0].annotation_contents}</div>
                </div>
                <div id={content[0].card_id + "_btn"} className="card_edit_btns" style={{ display: "none" }}>
                  <div>
                    <Button onClick={() => this.addCardHandler(content[0].cardTypeDetail.name)} size="small">
                      다음카드추가
                    </Button>
                  </div>
                  <div>
                    <Select size="small" defaultValue="default" style={{ width: 120, fontSize: "11px" }} onChange={this.handleShareChildAddChange}>
                      <Option value="default">카드타입선택</Option>
                      {optionShareList}
                    </Select>
                    <Button size="small" onClick={this.addChildCard}>
                      자식카드추가
                    </Button>
                  </div>
                  <div>
                    <Space>{this.cardEditing(content[0])}</Space>
                  </div>
                </div>
              </div>
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? this.editorTry1() : ""}
              {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? this.editorTry2() : ""}
            </>
          );
        }
      });
    }

    if (this.state.page_type) {
      //   console.log(this.state.page_type);
      const pageType = this.state.page_type[0].pagetype;
      var annot_ratio = pageType.annot_ratio;
      var page_width = pageType.size.width;
      var page_height = pageType.size.height;
      var page_background_color = pageType.color;
      var page_innerPadding_top = pageType.inner_padding.top;
      var page_innerPadding_bottom = pageType.inner_padding.bottom;
      var page_innerPadding_left = pageType.inner_padding.left;
      var page_innerPadding_right = pageType.inner_padding.right;
    }

    const a4Page = {
      width: `${page_width}px`,
      minHeight: `${page_height}px`,
      padding: `${page_innerPadding_top}px ${page_innerPadding_right}px ${page_innerPadding_bottom}px ${page_innerPadding_left}px`,
      border: "1px #D3D3D3 solid",
      borderRadius: "5px",
      background: `${page_background_color}`,
      boxShadow: " 0 0 5px rgba(0, 0, 0, 0.1)",
    };
    return (
      <>
        <div className="book_writing_container" style={{ overflowY: "hidden" }}>
          <div className="left_side_container" style={{ marginLeft: toggleLeft }}>
            <LeftDrawer
              updateContentsTable={this.updateContentsTable}
              table_of_contents={this.state.table_of_contents}
              toggle={this.state.left_drawer_toggle}
              onClick={this.leftDrawerHandleClick}
              onSelect={this.onSelect}
            />
          </div>
          <div className="editor_container" style={{ marginRight: main }}>
            <div className="editor_container_templete"></div>
          </div>
          <div className="editor_container_templete_position_absolute">
            <div className="editor_top_menu">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Space>
                  <NewPageTemplete updateCardTypeState={this.updateCardTypeState} />
                  <NewCardTemplete updateCardTypeState={this.updateCardTypeState} />
                  <CardTempleteEditing updateCardTypeState={this.updateCardTypeState} card_type={this.state.card_type} />
                  <Button size="small" onClick={this.showModal}>
                    카드 이동/삭제
                  </Button>
                </Space>
                <Modal title="카드 이동 및 삭제" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                  <BookRelocate />
                </Modal>
              </div>
            </div>
            <div className="editor_panel" id="editor_panel" onScroll={this.handleScroll} style={{ ...a4Page, position: "relative" }}>
              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  width: "120px",
                  padding: "10px",
                  //  height:"100px",
                  position: "absolute",
                  right: "-130px",
                  fontSize: "11px",
                  top: `${this.state.menu_position}px`,
                  boxShadow: "3px 2px 4px -2px rgba(138,138,138,1)",
                  transition: "all ease 0.4s",
                }}
              >
                <Space direction="vertical">
                  <h3>카드추가</h3>
                  <ul
                    style={{
                      marginLeft: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {optionList}
                  </ul>
                </Space>
                <Divider style={{ margin: "5px 0" }} />
                <ImportModal index_id={this.state.index_id} />
              </div>
              {/* 카드 뿌려지는 영역 */}
              {list ? list : ""}
              {this.state.loading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "(50%,50%)",
                  }}
                >
                  <Spin tip="Loading..." />
                </div>
              )}

              <div className="a4">
                {this.state.card_add === true && this.state.card_selected_id === "" ? (
                  <EditorTry
                    arrayForEditor={this.state.arrayForEditor}
                    selected_card_seq={this.state.selected_card_seq}
                    handleSubmit={this.handleSubmit}
                    cardAddStateHandler={this.cardAddStateHandler}
                    card_type_name={this.state.card_type_name}
                    updateContentsState={this.updateContentsState}
                    current_card_type={this.state.current_card_type}
                    contents={this.state.contents}
                    index_id={this.state.index_id}
                    current_card={this.state.current_card}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="right_side_container" style={{ marginRight: toggle }}>
            <SettingTabs
              onFaceChangeHandler={this.onFaceChangeHandler}
              onCardChangeHandler={this.onCardChangeHandler}
              faceSetting_selected={this.state.face_selected_props}
              cardSetting_selected={this.state.card_selected_props}
              getCardTypeList={this.getCardTypeList}
              card_selected={this.state.card_selected_detailsetting}
              initialValues={this.state.initialValues}
              cardType={this.state.card_type}
              toggle={this.state.hide_show_toggle}
              onClick={this.handleClick}
            />
          </div>
        </div>
      </>
    );
  }
}

export default BookWriting;
