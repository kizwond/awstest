import React, { Component } from "react";
import { Affix, Collapse, Switch, Select, Input, Upload, message } from "antd";
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, UploadOutlined } from "@ant-design/icons";
import Button from "../../styledComponents/defaultButton";
import axios from "axios";

const { Panel } = Collapse;
const { Option } = Select;

class PageSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageWidth: "",
      pageHeight: "",
      pageAnnotRatio: "",
      pageColor: "",
      pageInnerPaddingTop: "",
      pageInnerPaddingBottom: "",
      pageInnerPaddingLeft: "",
      pageInnerPaddingRight: "",
      page_type: [],
    };
  }

  genExtra = () => (
    <Switch
      size="small"
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );

  onChangePageWidth = (e) => {
    this.setState({
      pageWidth: e.target.value,
    });
  };
  onChangePageHeight = (e) => {
    this.setState({
      pageHeight: e.target.value,
    });
  };
  onChangePageAnnotRatio = (e) => {
    this.setState({
      pageAnnotRatio: e.target.value,
    });
  };
  onChangePageColor = (e) => {
    this.setState({
      pageColor: e.target.value,
    });
  };
  onChangePageInnerPaddingTop = (e) => {
    this.setState({
      pageInnerPaddingTop: e.target.value,
    });
  };
  onChangePageInnerPaddingBottom = (e) => {
    this.setState({
      pageInnerPaddingBottom: e.target.value,
    });
  };
  onChangePageInnerPaddingLeft = (e) => {
    this.setState({
      pageInnerPaddingLeft: e.target.value,
    });
  };
  onChangePageInnerPaddingRight = (e) => {
    this.setState({
      pageInnerPaddingRight: e.target.value,
    });
  };

  componentDidMount() {
    this.getPageSetting();
  }
  getPageSetting = async () => {
    const value = sessionStorage.getItem("book_id");
    await axios
      .post("api/pagetype/get-pagetype", {
        book_id: value,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          page_type: res.data.pagetype,
        });
        this.defaultValue(res.data.pagetype);
      });
  };
  defaultValue = (value) => {
    const page_type_defaults = value;
    console.log(page_type_defaults[0]);
    this.setState({
      pageWidth: page_type_defaults[0].pagetype.size.width,
      pageHeight: page_type_defaults[0].pagetype.size.height,
      pageAnnotRatio: page_type_defaults[0].pagetype.annot_ratio,
      pageColor: page_type_defaults[0].pagetype.color,
      pageInnerPaddingTop: page_type_defaults[0].pagetype.inner_padding.top,
      pageInnerPaddingBottom: page_type_defaults[0].pagetype.inner_padding.bottom,
      pageInnerPaddingLeft: page_type_defaults[0].pagetype.inner_padding.left,
      pageInnerPaddingRight: page_type_defaults[0].pagetype.inner_padding.right,
    });
  };

  onFinish = () => {
    const updated_pagetype = {
      annot_ratio: Number(this.state.pageAnnotRatio),
      color: this.state.pageColor,
      inner_padding: {
        top: Number(this.state.pageInnerPaddingTop),
        bottom: Number(this.state.pageInnerPaddingBottom),
        left: Number(this.state.pageInnerPaddingLeft),
        right: Number(this.state.pageInnerPaddingRight),
      },
      size: {
        width: Number(this.state.pageWidth),
        height: Number(this.state.pageHeight),
      },
    };
    console.log(updated_pagetype);
    const value = sessionStorage.getItem("book_id");
    axios
      .post("api/pagetype/update-pagetype", {
        book_id: value,
        updated_pagetype: updated_pagetype,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          page_type: res.data.pagetype,
        });
      });
  };

  render() {
    return (
      <div className="page_setting_container">
        <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}>
          <Panel header="페이지 크기" key="1" className="data_collapse_panel">
            <div className="select_page_size">
              <div className="select_page_size_div">
                <div>판본 사이즈</div>
                <div>
                  <Select size="small" style={{ width: 195 }}>
                    <Option value="선택">선택</Option>
                    <Option value="선택">선택</Option>
                    <Option value="선택">선택</Option>
                    <Option value="선택">선택</Option>
                  </Select>
                </div>
              </div>
              <div className="select_page_size_div">
                <div>직접입력</div>
                <div>
                  <Input size="small" style={{ width: 90, fontSize: 10 }} onChange={this.onChangePageWidth} value={this.state.pageWidth} type="number" />
                </div>
                <div>
                  <Input size="small" style={{ width: 90, fontSize: 10 }} onChange={this.onChangePageHeight} value={this.state.pageHeight} type="number" />
                </div>
              </div>
              <div style={{ paddingLeft: 30, fontSize: "10px", fontStyle: "italic", marginTop: 6, color: "grey" }}>※ 선택하신 사이즈로 모든 페이지에 적용됩니다. </div>
            </div>
          </Panel>
          <Panel header="주석비율" key="2" className="data_collapse_panel">
            <div className="select_page_padding">
              <input type="number" onChange={this.onChangePageAnnotRatio} value={this.state.pageAnnotRatio} />
            </div>
          </Panel>
          <Panel header="페이지 여백" key="3" className="data_collapse_panel">
            <div className="select_page_padding">
              <div className="page_padding_container">
                <div className="padding_top">
                  <Input size="small" onChange={this.onChangePageInnerPaddingTop} value={this.state.pageInnerPaddingTop} style={{ width: 70, fontSize: 10 }} type="number" />
                </div>
                <div className="page_padding_mid_container">
                  <div>
                    <Input size="small" style={{ width: 70, fontSize: 10 }} onChange={this.onChangePageInnerPaddingLeft} value={this.state.pageInnerPaddingLeft} type="number" />
                  </div>
                  <div className="padding_img_outer">
                    <div>본문</div>
                  </div>
                  <div>
                    <Input size="small" style={{ width: 70, fontSize: 10 }} onChange={this.onChangePageInnerPaddingRight} value={this.state.pageInnerPaddingRight} type="number" />
                  </div>
                </div>
                <div className="padding_bottom">
                  <Input size="small" onChange={this.onChangePageInnerPaddingBottom} value={this.state.pageInnerPaddingBottom} style={{ width: 70, fontSize: 10 }} type="number" />
                </div>
              </div>
            </div>
          </Panel>
          <Panel header="페이지 색" key="4" className="data_collapse_panel">
            <div className="select_page_color">
              <div className="page_color_picker">
                <div>본문색</div>
                <div>
                  <input onChange={this.onChangePageColor} value={this.state.pageColor} type="color" />
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
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
      </div>
    );
  }
}

class PageNumbering extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="select_page_numbering">
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <Select size="small" style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size="small" style={{ width: 60, fontSize: 10 }} suffix="px" type="number" />
            </div>
            <div>
              <BoldOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
            <div>
              <ItalicOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
            <div>
              <UnderlineOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size="small" style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: 30, fontSize: "10px", fontStyle: "italic", marginTop: 6, color: "grey" }}>
            ※ 페이지 번호 지정 위치에 따라 머릿글/바닥글과 겹칠 수 있습니다.{" "}
          </div>
        </div>
      </>
    );
  }
}
class PageTop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const props = {
      name: "file",
      action: "",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <>
        <div className="select_page_top">
          <div className="select_page_top_font">
            <div>글자 입력</div>
            <div>
              <Input size="small" style={{ width: 206 }} type="text" />
            </div>
          </div>
          <div className="select_page_top_font">
            <div>자동생성</div>
            <Select size="small" style={{ width: 206 }}>
              <Option value="목차">목차</Option>
            </Select>
          </div>
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <Select size="small" style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size="small" style={{ width: 60, fontSize: 10 }} suffix="px" type="number" />
            </div>
            <div>
              <BoldOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
            <div>
              <ItalicOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
            <div>
              <UnderlineOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
          </div>

          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size="small" style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <div className="select_page_location_img_upload">
              <div>이미지입력</div>
              <div>
                <Upload className="upload_img" {...props}>
                  <Button size="small" icon={<UploadOutlined />}>
                    그림삽입
                  </Button>
                </Upload>
              </div>
              <div style={{ paddingLeft: 30, fontSize: "10px", fontStyle: "italic", marginTop: 6, color: "grey" }}>※ 최대크기 595px X 40px </div>
            </div>
          </div>
          <div className="select_page_top_div">
            <div>사이즈</div>
            <Select size="small" style={{ width: 206 }}>
              <Option value="비율유지">최대크기 - 비율유지</Option>
            </Select>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size="small" style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class PageBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const props = {
      name: "file",
      action: "",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <>
        <div className="select_page_top">
          <div className="select_page_top_font">
            <div>글자 입력</div>
            <div>
              <Input size="small" style={{ width: 206 }} type="text" />
            </div>
          </div>
          <div className="select_page_top_font">
            <div>자동생성</div>
            <Select size="small" style={{ width: 206 }}>
              <Option value="목차">목차</Option>
            </Select>
          </div>
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <Select size="small" style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size="small" style={{ width: 60, fontSize: 10 }} suffix="px" type="number" />
            </div>
            <div>
              <BoldOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
            <div>
              <ItalicOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
            <div>
              <UnderlineOutlined style={{ marginTop: 4, fontSize: 14, border: "1px solid grey" }} />
            </div>
          </div>

          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size="small" style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <div className="select_page_location_img_upload">
              <div>이미지입력</div>
              <div>
                <Upload className="upload_img" {...props}>
                  <Button size="small" icon={<UploadOutlined />}>
                    그림삽입
                  </Button>
                </Upload>
              </div>
              <div style={{ paddingLeft: 30, fontSize: "10px", fontStyle: "italic", marginTop: 6, color: "grey" }}>※ 최대크기 595px X 40px </div>
            </div>
          </div>
          <div className="select_page_top_div">
            <div>사이즈</div>
            <Select size="small" style={{ width: 206 }}>
              <Option value="비율유지">최대크기 - 비율유지</Option>
            </Select>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size="small" style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{ width: "50%" }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PageSetting;
