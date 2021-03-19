import React, { Component } from "react";
import { Affix, Collapse, Form, Checkbox, Select, Input, InputNumber } from "antd";
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from "@ant-design/icons";
import Button from "../../styledComponents/defaultButton";
import axios from "axios";

const { Panel } = Collapse;
const { Option } = Select;

class FontSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_selected: "",
      fontAlign: "",
      fontType: "",
      fontColor: "",
      fontSize: "",
      fontBold: "",
      fontItalic: "",
      fontUnderLine: "",
      face_selected: "",
      face_selected_index: "",
      row_selected: "",
      row_selected_index: "",
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey() {
    return this.keyCount++;
  }

  onFinish = () => {
    console.log(this.state.prev_font_style);
    const prev_font_style = this.state.prev_font_style;

    if (this.state.fontItalic === true) {
      var fontItalic = "on";
    } else {
      fontItalic = "off";
    }
    if (this.state.fontBold === true) {
      var fontBold = "on";
    } else {
      fontBold = "off";
    }
    if (this.state.fontUnderLine === true) {
      var fontUnderLine = "on";
    } else {
      fontUnderLine = "off";
    }

    if (this.state.face_selected_index === 1) {
      //여기다가 if 문을 작성해야함 row 일때랑 selections일때
      if (this.state.row_selected_optionName === "row") {
        const update_font_style = prev_font_style.face1.map((style, font_index) => {
          if (this.state.row_selected_index === font_index + 1) {
            style.font = this.state.fontType;
            style.bold = fontBold;
            style.size = this.state.fontSize;
            style.italic = fontItalic;
            style.underline = fontUnderLine;
            style.color = this.state.fontColor;
          }
        });
      } else if (this.state.row_selected_optionName === "selection") {
        const update_font_style = prev_font_style.selection[0];
        update_font_style.font = this.state.fontType;
        update_font_style.bold = fontBold;
        update_font_style.size = this.state.fontSize;
        update_font_style.italic = fontItalic;
        update_font_style.underline = fontUnderLine;
        update_font_style.color = this.state.fontColor;
      }
    } else if (this.state.face_selected_index === 1) {
      const update_font_style = prev_font_style.face2.map((style, font_index) => {
        if (this.state.row_selected_index === font_index + 1) {
          style.font = this.state.fontType;
          style.bold = fontBold;
          style.size = this.state.fontSize;
          style.italic = fontItalic;
          style.color = this.state.fontColor;
        }
      });
    } else {
      const update_font_style = prev_font_style.face1.map((style, font_index) => {
        if (this.state.row_selected_index === font_index + 1) {
          style.font = this.state.fontType;
          style.bold = fontBold;
          style.size = this.state.fontSize;
          style.italic = fontItalic;
          style.underline = fontUnderLine;
          style.color = this.state.fontColor;
        }
      });
    }
    console.log("final : ", prev_font_style);

    axios
      .post("api/cardtype/update-font", {
        cardtype_id: this.props.cardSetting_selected,
        updated_font: prev_font_style,
        book_id: this.props.cardType[0].book_id,
      })
      .then((res) => {
        console.log(res.data);
        this.props.getCardTypeList();
      });
  };

  onChangeFontType = (fontType) => {
    console.log(fontType);
    this.setState({
      fontType: fontType,
    });
  };
  onChangeFontColor = (e) => {
    console.log(e);
    console.log(e.target.value);
    this.setState({
      fontColor: e.target.value,
    });
  };
  onChangeFontSize = (fontSize) => {
    console.log(fontSize);
    this.setState({
      fontSize: fontSize,
    });
  };
  onChangeFontBold = (fontBold) => {
    console.log(fontBold);
    this.setState((prevState) => ({
      fontBold: !prevState.fontBold,
    }));
  };
  onChangeFontItalic = (fontItalic) => {
    console.log(fontItalic);
    this.setState((prevState) => ({
      fontItalic: !prevState.fontItalic,
    }));
  };
  onChangeFontUnderLine = (fontUnderLine) => {
    console.log(fontUnderLine);
    this.setState((prevState) => ({
      fontUnderLine: !prevState.fontUnderLine,
    }));
  };

  componentDidMount() {
    this.getCardTypeList();
  }

  getCardTypeList = () => {
    const value = sessionStorage.getItem("book_id");
    axios
      .post("api/cardtype/get-cardtype", {
        book_id: value,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          card_type: res.data.cardtypes,
        });
      });
  };

  onCardChangeHandler = (e) => {
    console.log("onCardChangeHandler : ", e.target.value);
    this.setState({
      card_selected: e.target.value,
    });
    this.props.onCardChangeHandler(e);
  };

  onFaceChangeHandler = (e) => {
    console.log("onFaceChangeHandler : ", e.target.value);
    console.log("onFaceChangeHandler : ", e.target.selectedIndex);
    this.setState({
      face_selected: e.target.value,
      face_selected_index: e.target.selectedIndex,
    });
    this.props.onFaceChangeHandler(e);
  };

  onRowChangeHandler = (e) => {
    console.log("onRowChangeHandler : ", e.target.value);
    console.log("onRowChangeHandler : ", e.target.selectedIndex);
    this.setState({
      row_selected: e.target.value,
      row_selected_index: e.target.selectedIndex,
      row_selected_optionName: e.target.selectedOptions[0].attributes[0].nodeValue,
    });
    this.getInitialValues(this.props.cardSetting_selected, e.target.selectedIndex, e.target.selectedOptions[0].attributes[0].nodeValue);
  };

  getInitialValues = (id, index, optionName) => {
    console.log("11111111111111111111111111", id);
    const align = [];
    const bold = [];
    const font = [];
    const italic = [];
    const size = [];
    const underline = [];
    const color = [];

    console.log("22222222222222222222222222222");
    this.state.card_type.map((value) => {
      if (value._id === id) {
        console.log(value);
        if (value.type === "read" || value.type === "share" || value.type === "none") {
          align.push(value.font.face1[index - 1].align);
          bold.push(value.font.face1[index - 1].bold);
          font.push(value.font.face1[index - 1].font);
          italic.push(value.font.face1[index - 1].italic);
          size.push(value.font.face1[index - 1].size);
          underline.push(value.font.face1[index - 1].underline);
          color.push(value.font.face1[index - 1].color);
        } else {
          if (this.state.face_selected_index === 1) {
            if (optionName === "row") {
              align.push(value.font.face1[index - 1].align);
              bold.push(value.font.face1[index - 1].bold);
              font.push(value.font.face1[index - 1].font);
              italic.push(value.font.face1[index - 1].italic);
              size.push(value.font.face1[index - 1].size);
              underline.push(value.font.face1[index - 1].underline);
              color.push(value.font.face1[index - 1].color);
            } else if (optionName === "selection") {
              align.push(value.font.selection[0].align);
              bold.push(value.font.selection[0].bold);
              font.push(value.font.selection[0].font);
              italic.push(value.font.selection[0].italic);
              size.push(value.font.selection[0].size);
              underline.push(value.font.selection[0].underline);
              color.push(value.font.selection[0].color);
            }
          } else {
            align.push(value.font.face2[index - 1].align);
            bold.push(value.font.face2[index - 1].bold);
            font.push(value.font.face2[index - 1].font);
            italic.push(value.font.face2[index - 1].italic);
            size.push(value.font.face2[index - 1].size);
            underline.push(value.font.face2[index - 1].underline);
            color.push(value.font.face2[index - 1].color);
          }
        }

        this.setState({
          prev_font_style: value.font,
        });
      }
    });

    const initialValues = {
      align: align[0],
      bold: bold[0],
      font: font[0],
      italic: italic[0],
      size: size[0],
      underline: underline[0],
      color: color[0],
    };

    if (bold[0] === "off") {
      var boldCheck = false;
    } else {
      boldCheck = true;
    }

    if (italic[0] === "off") {
      var italicCheck = false;
    } else {
      italicCheck = true;
    }

    if (underline[0] === "off") {
      var underlineCheck = false;
    } else {
      underlineCheck = true;
    }

    console.log("선택한 카드타입의 기본값 :", initialValues);

    this.setState({
      fontAlign: initialValues.align,
    });
    this.setState({
      fontBold: boldCheck,
    });
    this.setState({
      fontType: initialValues.font,
    });
    this.setState({
      fontItalic: italicCheck,
    });
    this.setState({
      fontSize: initialValues.size,
    });
    this.setState({
      fontUnderLine: underlineCheck,
    });
    this.setState({
      fontColor: initialValues.color,
    });
  };

  render() {
    if (this.props.cardType) {
      var cardTypeListOption = this.props.cardType.map((card_type) => {
        // if(card_type._id === this.props.cardSetting_selected) {
        return (
          <option key={this.getKey()} value={card_type._id}>
            {card_type.name} - ({card_type.type} 카드)
          </option>
        );
        // }
      });
      var cardFaceListOption = this.props.cardType.map((card_type) => {
        if (card_type._id === this.props.cardSetting_selected) {
          if (card_type.type === "read" || "share" || "none") {
            return;
          } else if (card_type.type === "flip-normal") {
            return (
              <>
                <option value={card_type.face_style[0]._id}>1면</option>
                <option value={card_type.face_style[1]._id}>2면</option>
              </>
            );
          }
        }
      });
      console.log(cardFaceListOption);

      var cardRowListOption = this.props.cardType.map((card_type) => {
        if (card_type._id === this.props.cardSetting_selected) {
          console.log("---------------------------------", card_type);
          if (this.state.face_selected_index === 1) {
            const row_options = card_type.row_style.face1.map((row, index) => {
              console.log(row, index);
              return (
                <>
                  <option name="row" value={row._id}>
                    {index + 1}행
                  </option>
                </>
              );
            });
            return row_options;
          } else if (this.state.face_selected_index === 2) {
            const row_options = card_type.row_style.face2.map((row, index) => {
              console.log(row, index);
              return (
                <>
                  <option name="row" value={row._id}>
                    {index + 1}행
                  </option>
                </>
              );
            });
            return row_options;
          } else if (card_type.type === "read" || "share" || "none") {
            const row_options = card_type.row_style.face1.map((row, index) => {
              console.log(row, index);
              return (
                <>
                  <option name="row" value={row._id}>
                    {index + 1}행
                  </option>
                </>
              );
            });
            return row_options;
          }
        }
      });
      console.log(cardRowListOption);

      var cardSelectionOption = this.props.cardType.map((card_type) => {
        if (card_type._id === this.props.cardSetting_selected) {
          console.log("---------------------------------", card_type);
          if (this.state.face_selected_index === 1) {
            if (card_type.row_style.selection.length > 0) {
              const selection = card_type.row_style.selection[0];
              return (
                <>
                  <option name="selection" value={selection._id}>
                    보기
                  </option>
                </>
              );
            } else {
              return;
            }
          } else if (this.state.face_selected_index === 2) {
            return;
          }
        }
      });
    }

    return (
      <>
        <div className="page_setting_container">
          <Collapse defaultActiveKey={["1", "3", "4", "5", "6"]}>
            <Panel header="템플릿 선택" key="1" className="data_collapse_panel">
              <div className="select_card_templete">
                <div className="select_page_size_div">
                  <div>카드</div>
                  <div>
                    <select defaultValue="카드선택" size="small" onChange={this.onCardChangeHandler} value={this.state.card_selected} style={{ width: 195 }}>
                      <option key="default1" value="카드선택">
                        카드선택
                      </option>
                      {cardTypeListOption}
                    </select>
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>면</div>
                  <div>
                    <select defaultValue="면선택" size="small" onChange={this.onFaceChangeHandler} style={{ width: 195 }}>
                      <option key="default2" value="면선택">
                        면선택
                      </option>
                      {cardFaceListOption}
                    </select>
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>행</div>
                  <div>
                    <select defaultValue="행선택" onChange={this.onRowChangeHandler} size="small" style={{ width: 195 }}>
                      <option key="default3" value="행선택">
                        행선택
                      </option>
                      {cardRowListOption}
                      {cardSelectionOption}
                    </select>
                  </div>
                </div>
              </div>
            </Panel>

            <Panel header="폰트설정" key="3" className="data_collapse_panel">
              <div className="select_card_templete" style={{ height: "600px" }}>
                <div className="select_page_size_div">
                  <div>폰트</div>
                  <div>
                    <Input type="text" size="small" onChange={this.onChangeFontType} value={this.state.fontType} style={{ width: 125 }} />
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>색</div>
                  <div>
                    <Input type="color" size="small" onChange={this.onChangeFontColor} value={this.state.fontColor} style={{ width: 125 }} />
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>크기</div>
                  <div>
                    <InputNumber size="small" onChange={this.onChangeFontSize} value={this.state.fontSize} style={{ width: 100, fontSize: 10 }} type="number" />
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>볼드</div>
                  <div>
                    <Checkbox onChange={this.onChangeFontBold} checked={this.state.fontBold} />
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>이탈릭</div>
                  <div>
                    <Checkbox onChange={this.onChangeFontItalic} checked={this.state.fontItalic} />
                  </div>
                </div>
                <div className="select_page_size_div">
                  <div>밑줄</div>
                  <div>
                    <Checkbox onChange={this.onChangeFontUnderLine} checked={this.state.fontUnderLine} />
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

        <Affix offsetBottom={0}>
          <div className="save_page_setting">
            <Button type="primary" onClick={this.onFinish} shape="round" size="small">
              적용
            </Button>
            <Button type="primary" shape="round" size="small">
              취소
            </Button>
            <Button type="primary" shape="round" size="small">
              설정초기화
            </Button>
          </div>
        </Affix>
      </>
    );
  }
}

export default FontSetting;
