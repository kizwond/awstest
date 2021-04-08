import React, { Component } from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

class TocSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    };
  }

  move = (value) => {
    console.log("clicked");
    console.log(value);
    sessionStorage.setItem("category", value);
    window.location.href = "/link-category";
  };

  render() {
    return (
      <Sider
        width="220px"
        theme="light"
        style={{
          zIndex: "2",
          position: "fixed",
          height: "95vh",
          overflow: "auto",
        }}
      >
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item onClick={() => this.move("elementaryschool")} key="1">
            초등
          </Menu.Item>
          <Menu.Item onClick={() => this.move("middleschool")} key="2">
            중등
          </Menu.Item>
          <Menu.Item onClick={() => this.move("highshcool")} key="3">
            고등
          </Menu.Item>

          <Menu.Item onClick={() => this.move("worker")} key="4">
            직장인
          </Menu.Item>
          <hr style={{ width: "80%" }} />
          <Menu.Item onClick={() => this.move("english")} key="5">
            영어
          </Menu.Item>
          <Menu.Item onClick={() => this.move("chinese")} key="6">
            중국어
          </Menu.Item>
          <Menu.Item onClick={() => this.move("japanese")} key="7">
            일본어
          </Menu.Item>
          <Menu.Item onClick={() => this.move("coding")} key="8">
            코딩
          </Menu.Item>
          <hr style={{ width: "80%" }} />
          <Menu.Item onClick={() => this.move("go")} key="9">
            바둑
          </Menu.Item>
          <Menu.Item onClick={() => this.move("fishing")} key="10">
            낚시
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default TocSider;
