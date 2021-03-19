import React, { Component } from "react";
import { Affix, Collapse, Form, Switch, Select, Input, InputNumber } from "antd";
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from "@ant-design/icons";
import Button from "../../styledComponents/defaultButton";
import axios from "axios";

const { Panel } = Collapse;
const { Option } = Select;

class CardSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_selected: "",
      direction: "left-right",
      face1Ratio: 0,
      face2Ratio: 0,
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
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }
  getKey() {
    return this.keyCount++;
  }

  onFinish = () => {
    const initialValues = {
      card_direction: this.state.direction,
      outer_margin: {
        top: this.state.marginTop,
        right: this.state.marginRight,
        left: this.state.marginLeft,
        bottom: this.state.marginBottom,
      },
      inner_padding: {
        top: this.state.paddingTop,
        bottom: this.state.paddingBottom,
        left: this.state.paddingLeft,
        right: this.state.paddingRight,
      },
      background_color: this.state.backgroundColor,
      left_right_ratio: {
        face1: this.state.face1Ratio,
        face2: this.state.face2Ratio,
      },
      border: {
        mode: "package",
        package: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
        top: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
        bottom: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
        left: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
        right: { type: this.state.borderStyle, thickness: this.state.borderThickness, color: this.state.borderColor },
      },
    };
    console.log("before submit : ", initialValues);

    axios
      .post("api/cardtype/update-cardstyle", {
        cardtype_id: this.state.card_selected,
        updated_card_style: initialValues,
        book_id: this.props.cardType[0].book_id,
      })
      .then((res) => {
        console.log(res.data);
        this.props.getCardTypeList();
      });
  };
  onChangeDirection = (direction) => {
    console.log(direction);
    this.setState({
      direction: direction,
    });
  };
  onChangeface1Ratio = (face1Ratio) => {
    console.log(face1Ratio);
    this.setState({
      face1Ratio: face1Ratio,
    });
  };
  onChangeface2Ratio = (face2Ratio) => {
    console.log(face2Ratio);
    this.setState({
      face2Ratio: face2Ratio,
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

    // this.props.onCardChangeHandler(e)
    this.getInitialValues(e.target.value);
  };

  getInitialValues = (id) => {
    console.log("11111111111111111111111111", id);
    const direction = [];
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
        direction.push(value.card_style.card_direction);
        margin.push(value.card_style.outer_margin);
        padding.push(value.card_style.inner_padding);
        background_color.push(value.card_style.background_color);
        left_right_ratio.push(value.card_style.left_right_ratio);
        packageDetail.push(value.card_style.border.package);
        borderTopDetail.push(value.card_style.border.top);
        borderRightDetail.push(value.card_style.border.right);
        borderBottomDetail.push(value.card_style.border.bottom);
        borderLeftDetail.push(value.card_style.border.left);
        console.log(value);
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

    if (left_right_ratio.length > 0) {
      var face1_ratio = left_right_ratio[0].face1;
      var face2_ratio = left_right_ratio[0].face2;
    } else {
      face1_ratio = left_right_ratio[0].face1;
      face2_ratio = left_right_ratio[0].face2;
    }

    const initialValues = {
      card_direction: direction[0],
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
      left_right_ratio: {
        face1: face1_ratio,
        face2: face2_ratio,
      },
      border: {
        mode: "package",
        package: packageDetail[0],
        top: borderTopDetail[0],
        bottom: borderBottomDetail[0],
        left: borderLeftDetail[0],
        right: borderRightDetail[0],
      },
    };

    console.log(packageDetail);

    console.log("선택한 카드타입의 기본값 :", initialValues);
    this.setState({
      direction: initialValues.card_direction,
    });

    this.setState({
      face1Ratio: initialValues.left_right_ratio.face1,
    });
    this.setState({
      face2Ratio: initialValues.left_right_ratio.face2,
    });

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
    if (this.props.cardType) {
      var cardTypeListOption = this.props.cardType.map((card_type) => (
        <option key={this.getKey()} value={card_type._id}>
          {card_type.name} - ({card_type.type} 카드)
        </option>
      ));
      var cardFaceListOption = this.props.cardType.map((card_type) => {
        if (card_type._id === this.state.card_selected) {
          if (card_type.type === "read") {
            return;
          } else if (card_type.type === "flip-normal") {
            return (
              <>
                <option value="1면">1면</option>
                <option value="2면">2면</option>
              </>
            );
          }
        }
      });
    }

    return (
      <>
        <div className="page_setting_container">
          <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
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
                {/* <div className='select_page_size_div'>
                    <div>면</div>
                    <div>
                      <select defaultValue="면선택" onChange={this.onFaceChangeHandler} value={this.state.card_selected} size='small' style={{ width: 195 }}>
                        <option key="default2" value="면선택">면선택</option>
                        {cardFaceListOption}
                      </select>
                    </div>
                </div> */}
                {/* <div className='select_page_size_div'>
                    <div>행</div>
                    <div>
                      <Select defaultValue="행선택" size='small' style={{ width: 195 }}>
                        <Option key="default3" value="행선택">행선택</Option>
                      </Select>
                    </div>
                </div> */}
              </div>
            </Panel>
            <Panel header="레이아웃" key="2" className="data_collapse_panel">
              <div>
                <div>
                  <div>방향</div>
                  <div>
                    <Select size="small" onChange={this.onChangeDirection} value={this.state.direction}>
                      <Option value="left-right">좌우</Option>
                      <Option value="top-bottom">상하</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div></div>
                  <div className="layout_example_img">
                    <img src="img/leftright.png" width="90px" alt="좌우" />
                    <img src="img/updown.png" width="90px" alt="상하" />
                  </div>
                </div>
                <div>
                  <div>면간 비율</div>
                  <div className="layout_ratio">
                    <div>
                      1면 <InputNumber size="small" onChange={this.onChangeface1Ratio} value={this.state.face1Ratio} style={{ width: 100, fontSize: 10 }} type="number" />%
                    </div>
                    <div>
                      2면 <InputNumber size="small" onChange={this.onChangeface2Ratio} value={this.state.face2Ratio} style={{ width: 100, fontSize: 10 }} type="number" />%
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="카드 배경색" key="3" className="data_collapse_panel">
              <div className="select_card_bg_color_container">
                <div className="select_card_bg_color">
                  <div>배경색</div>
                  <div className="select_card_bg_color_right">
                    <div>
                      <Input type="color" size="small" onChange={this.onChangeBackgroundColor} value={this.state.backgroundColor} style={{ width: 125 }} type="color" />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="카드 테두리 바깥쪽 여백" key="4" className="data_collapse_panel">
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
            <Panel header="카드 테두리 안쪽 여백" key="5" className="data_collapse_panel_numbering">
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
            <Panel header="카드 테두리" key="6" className="data_collapse_panel_page_top">
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

export default CardSetting;
