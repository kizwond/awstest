import React, { Component } from "react";
import { Affix, Collapse, Form, Switch, Select, Input, InputNumber } from "antd";
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from "@ant-design/icons";
import Button from "../../styledComponents/defaultButton";
import axios from "axios";

const { Panel } = Collapse;
const { Option } = Select;

class FaceSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_selected: "",
      direction: "left-right",
      backgroundColor: "#FFFFFF",
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
      paddingBottom: 0,
      borderStyle: "solid",
      borderColor: "#FFFFFF",
      borderThickness: 0,
      face_selected: "",
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey() {
    return this.keyCount++;
  }

  onFinish = () => {
    console.log(this.state.prev_face_style);
    const prev_face_style = this.state.prev_face_style;
    const update_face_style = prev_face_style.map((style) => {
      if (this.state.face_selected === style._id) {
        style.background_color = this.state.backgroundColor;
        style.outer_margin = {
          top: this.state.marginTop,
          right: this.state.marginRight,
          left: this.state.marginLeft,
          bottom: this.state.marginBottom,
        };
        style.inner_padding = {
          top: this.state.paddingTop,
          bottom: this.state.paddingBottom,
          left: this.state.paddingLeft,
          right: this.state.paddingRight,
        };
        style.border = {
          mode: "package",
          package: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
          top: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
          bottom: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
          left: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
          right: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
        };
      }
    });
    console.log("final : ", prev_face_style);

    axios
      .post("api/cardtype/update-facestyle", {
        cardtype_id: this.props.cardSetting_selected,
        updated_face_style: prev_face_style,
        book_id: this.props.cardType[0].book_id,
        // updated_face_name:Number(this.state.face_selected)
      })
      .then((res) => {
        console.log(res.data);
        this.props.getCardTypeList();
      });
  };

  onChangeBackgroundColor = (e) => {
    console.log(e.target.value);
    this.setState({
      backgroundColor: e.target.value,
    });
  };
  onChangeMarginTop = (marginTop) => {
    console.log(marginTop);
    this.setState({
      marginTop: marginTop,
    });
  };
  onChangeMarginRight = (marginRight) => {
    console.log(marginRight);
    this.setState({
      marginRight: marginRight,
    });
  };
  onChangeMarginBottom = (marginBottom) => {
    console.log(marginBottom);
    this.setState({
      marginBottom: marginBottom,
    });
  };
  onChangeMarginLeft = (marginLeft) => {
    console.log(marginLeft);
    this.setState({
      marginLeft: marginLeft,
    });
  };
  onChangePaddingTop = (paddingTop) => {
    console.log(paddingTop);
    this.setState({
      paddingTop: paddingTop,
    });
  };
  onChangePaddingRight = (paddingRight) => {
    console.log(paddingRight);
    this.setState({
      paddingRight: paddingRight,
    });
  };
  onChangePaddingBottom = (paddingBottom) => {
    console.log(paddingBottom);
    this.setState({
      paddingBottom: paddingBottom,
    });
  };
  onChangePaddingLeft = (paddingLeft) => {
    console.log(paddingLeft);
    this.setState({
      paddingLeft: paddingLeft,
    });
  };
  onChangeBorderStyle = (borderStyle) => {
    console.log(borderStyle);
    this.setState({
      borderStyle: borderStyle,
    });
  };
  onChangeBorderColor = (e) => {
    console.log(e.target.value);
    this.setState({
      borderColor: e.target.value,
    });
  };
  onChangeBorderThickness = (borderThickness) => {
    console.log(borderThickness);
    this.setState({
      borderThickness: borderThickness,
    });
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
    });
    this.props.onFaceChangeHandler(e);
    this.getInitialValues(this.props.cardSetting_selected, e.target.selectedIndex);
  };

  getInitialValues = (id, index) => {
    console.log("11111111111111111111111111", id);
    const margin = [];
    const padding = [];
    const background_color = [];
    const left_right_ratio = [];
    const packageDetail = [];
    const borderTopDetail = [];
    const borderRightDetail = [];
    const borderBottomDetail = [];
    const borderLeftDetail = [];

    console.log("22222222222222222222222222222");
    this.state.card_type.map((value) => {
      if (value._id === id) {
        console.log(value);
        margin.push(value.face_style[index - 1].outer_margin);
        padding.push(value.face_style[index - 1].inner_padding);
        background_color.push(value.face_style[index - 1].background_color);
        left_right_ratio.push(value.face_style[index - 1].left_right_ratio);
        packageDetail.push(value.face_style[index - 1].border.package);
        borderTopDetail.push(value.face_style[index - 1].border.top);
        borderRightDetail.push(value.face_style[index - 1].border.right);
        borderBottomDetail.push(value.face_style[index - 1].border.bottom);
        borderLeftDetail.push(value.face_style[index - 1].border.left);
        console.log(value);
        this.setState({
          prev_face_style: value.face_style,
        });
      }
    });

    if (margin.length > 0) {
      var top = margin[0].top;
      var bottom = margin[0].bottom;
      var left = margin[0].left;
      var right = margin[0].right;
    } else {
      top = "";
      bottom = "";
      left = "";
      right = "";
    }

    if (padding.length > 0) {
      var innerPaddingTop = padding[0].top;
      var innerPaddingBottom = padding[0].bottom;
      var innerPaddingLeft = padding[0].left;
      var innerPaddingRight = padding[0].right;
    } else {
      innerPaddingTop = "";
      innerPaddingBottom = "";
      innerPaddingLeft = "";
      innerPaddingRight = "";
    }

    if (background_color.length > 0) {
      var backgroundColor = background_color[0];
    } else {
      backgroundColor = background_color[0];
    }

    if (backgroundColor === null) {
      backgroundColor = "#ffffff";
    } else {
      backgroundColor = background_color[0];
    }

    const initialValues = {
      outer_margin: {
        top,
        right,
        left,
        bottom,
      },
      inner_padding: {
        top: innerPaddingTop,
        bottom: innerPaddingBottom,
        left: innerPaddingLeft,
        right: innerPaddingRight,
      },
      background_color: backgroundColor,
      border: {
        mode: "package",
        package: packageDetail[0],
        top: borderTopDetail[0],
        bottom: borderBottomDetail[0],
        left: borderLeftDetail[0],
        right: borderRightDetail[0],
      },
    };

    console.log("선택한 카드타입의 기본값 :", initialValues);

    this.setState({
      backgroundColor: initialValues.background_color,
    });

    this.setState({
      marginTop: initialValues.outer_margin.top,
    });
    this.setState({
      marginRight: initialValues.outer_margin.right,
    });
    this.setState({
      marginLeft: initialValues.outer_margin.left,
    });
    this.setState({
      marginBottom: initialValues.outer_margin.bottom,
    });

    this.setState({
      paddingTop: initialValues.inner_padding.top,
    });
    this.setState({
      paddingRight: initialValues.inner_padding.right,
    });
    this.setState({
      paddingLeft: initialValues.inner_padding.left,
    });
    this.setState({
      paddingBottom: initialValues.inner_padding.bottom,
    });

    this.setState({
      borderStyle: initialValues.border.package.type,
    });
    this.setState({
      borderColor: initialValues.border.package.color,
    });
    this.setState({
      borderThickness: initialValues.border.package.thickness,
    });
  };

  render() {
    console.log(this.state.readShareNoneSelected);
    if (this.props.cardType) {
      var cardTypeListOption = this.props.cardType.map((card_type) => {
        console.log(card_type);
        if (card_type.type === "flip-normal") {
          return (
            <option key={this.getKey()} value={card_type._id}>
              {card_type.name} - ({card_type.type} 카드)
            </option>
          );
        }
      });
      var cardFaceListOption = this.props.cardType.map((card_type) => {
        if (card_type._id === this.props.cardSetting_selected) {
          if (card_type.type === "read" || card_type.type === "share" || card_type.type === "none") {
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
                    <select defaultValue="면선택" size="small" onChange={this.onFaceChangeHandler} value={this.props.faceSetting_selected} style={{ width: 195 }}>
                      <option key="default2" value="면선택">
                        면선택
                      </option>
                      {cardFaceListOption}
                    </select>
                  </div>
                </div>

                <div className="" style={{ width: "100%", fontSize: "10px", marginLeft: "30px", marginTop: "10px" }}>
                  <div>※ 읽기카드, 공통지문카드 및 비학습카드는 면설정이 없습니다.</div>
                </div>
              </div>
            </Panel>

            <Panel header="면 배경색" key="3" className="data_collapse_panel">
              <div className="select_card_bg_color_container">
                <div className="select_card_bg_color">
                  <div>배경색</div>
                  <div className="select_card_bg_color_right">
                    <div>
                      <Input type="color" size="small" onChange={this.onChangeBackgroundColor} value={this.state.backgroundColor} style={{ width: 125 }} />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="면 테두리 바깥쪽 여백" key="4" className="data_collapse_panel">
              <div className="select_card_margin">
                <div className="card_margin_top">
                  상 <InputNumber size="small" onChange={this.onChangeMarginTop} value={this.state.marginTop} style={{ width: 100, fontSize: 10 }} type="number" />
                  px
                </div>
                <div className="card_margin_mid_container">
                  <div>
                    좌 <InputNumber size="small" onChange={this.onChangeMarginLeft} value={this.state.marginLeft} style={{ width: 100, fontSize: 10 }} type="number" />
                    px
                  </div>
                  <div className="">
                    <img src="img/cardmargin.png" width="100" alt="cardmargin_img" />
                  </div>
                  <div>
                    우 <InputNumber size="small" onChange={this.onChangeMarginRight} value={this.state.marginRight} style={{ width: 100, fontSize: 10 }} type="number" />
                    px
                  </div>
                </div>
                <div className="card_margin_bottom">
                  하 <InputNumber size="small" onChange={this.onChangeMarginBottom} value={this.state.marginBottom} style={{ width: 100, fontSize: 10 }} type="number" />
                  px
                </div>
              </div>
            </Panel>
            <Panel header="면 테두리 안쪽 여백" key="5" className="data_collapse_panel_numbering">
              <div className="select_card_margin">
                <div className="card_margin_top">
                  상 <InputNumber size="small" onChange={this.onChangePaddingTop} value={this.state.paddingTop} style={{ width: 100, fontSize: 10 }} type="number" />
                  px
                </div>
                <div className="card_margin_mid_container">
                  <div>
                    좌 <InputNumber size="small" onChange={this.onChangePaddingLeft} value={this.state.paddingLeft} style={{ width: 100, fontSize: 10 }} type="number" />
                    px
                  </div>
                  <div className="">
                    <img src="img/cardpadding.png" width="100" alt="cardpadding_img" />
                  </div>
                  <div>
                    우 <InputNumber size="small" onChange={this.onChangePaddingRight} value={this.state.paddingRight} style={{ width: 100, fontSize: 10 }} type="number" />
                    px
                  </div>
                </div>
                <div className="card_margin_bottom">
                  하 <InputNumber size="small" onChange={this.onChangePaddingBottom} value={this.state.paddingBottom} style={{ width: 100, fontSize: 10 }} type="number" />
                  px
                </div>
              </div>
            </Panel>
            <Panel header="면 테두리" key="6" className="data_collapse_panel_page_top">
              <Switch size="small" className="page_top_toggle" />
              <div className="card_border_container">
                <div className="select_card_bg_color">
                  <div>전체테두리</div>
                  <div className="card_border_total">
                    <div>
                      <Select size="small" onChange={this.onChangeBorderStyle} value={this.state.borderStyle} style={{ width: 100 }}>
                        <Option value="solid">solid</Option>
                        <Option value="dashed">dashed</Option>
                      </Select>
                    </div>
                    <div>
                      <Input size="small" type="color" onChange={this.onChangeBorderColor} value={this.state.borderColor} style={{ width: 20 }} />
                    </div>
                    <div>
                      <InputNumber
                        size="small"
                        onChange={this.onChangeBorderThickness}
                        value={this.state.borderThickness}
                        style={{ width: 60, fontSize: 10, lineHeight: "22px" }}
                        type="number"
                      />
                      px
                    </div>
                  </div>
                </div>
                <div style={{ paddingLeft: 50 }}>
                  <Collapse className="border_detail">
                    <Panel header="테두리 상세 설정" key="1" className="data_collapse_panel">
                      <div className="select_card_bg_color">
                        <div>상</div>
                        <div className="card_border_total">
                          <div>
                            <Select size="small" style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div>
                            <Input size="small" type="color" style={{ width: 20 }} />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60 }} type="text" />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60, fontSize: 10, lineHeight: "22px" }} suffix="px" type="number" />
                          </div>
                        </div>
                      </div>
                      <div className="select_card_bg_color">
                        <div>하</div>
                        <div className="card_border_total">
                          <div>
                            <Select size="small" style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div>
                            <Input size="small" type="color" style={{ width: 20 }} />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60 }} type="text" />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60, fontSize: 10, lineHeight: "22px" }} suffix="px" type="number" />
                          </div>
                        </div>
                      </div>
                      <div className="select_card_bg_color">
                        <div>좌</div>
                        <div className="card_border_total">
                          <div>
                            <Select size="small" style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div>
                            <Input size="small" type="color" style={{ width: 20 }} />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60 }} type="text" />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60, fontSize: 10, lineHeight: "22px" }} suffix="px" type="number" />
                          </div>
                        </div>
                      </div>
                      <div className="select_card_bg_color">
                        <div>우</div>
                        <div className="card_border_total">
                          <div>
                            <Select size="small" style={{ width: 50 }}>
                              <Option value="선택">선택</Option>
                              <Option value="선택">선택</Option>
                            </Select>
                          </div>
                          <div>
                            <Input size="small" type="color" style={{ width: 20 }} />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60 }} type="text" />
                          </div>
                          <div>
                            <Input size="small" style={{ width: 60, fontSize: 10, lineHeight: "22px" }} suffix="px" type="number" />
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className="card_border_radius_container">
                  <div>라운드</div>
                  <div className="card_border_radius">
                    <Input size="small" style={{ width: 60, fontSize: 10, lineHeight: "22px" }} suffix="px" type="number" />
                  </div>
                </div>
                <div className="card_border_radius_container">
                  <div>그림자</div>
                  <div className="card_border_radius">
                    <Input size="small" style={{ width: 60, fontSize: 10, lineHeight: "22px" }} suffix="px" type="number" />
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

export default FaceSetting;
