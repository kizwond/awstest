import { BlockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import SimpleSlider from "./SimpleSlider";

const { Content, Sider } = Layout;

// const LeftSideTOC = styled.div`
//   position: fixed;
//   transform: translateZ(0px);
//   display: block;
//   z-index: 1;
//   inset: 2.77778rem auto 0px 0px;
//   width: 16.6667rem;
//   background: rgb(239, 239, 239);
//   box-sizing: border-box;
//   color: inherit;
//   overflow-y: auto;
//   transition: transform 150ms ease-out 0s;
//   margin-top: 12px;
// `;

class BookStoreMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      // <LeftSideTOC>
      <Layout
        style={{
          width: "1440px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: "auto",
          justifyContent: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 0 auto",
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        >
          <Sider
            style={{
              zIndex: "2",
              position: "fixed",
              height: "calc(100vh - 60px)",
              overflow: "auto",
              // marginRight: "-999px",
              // paddingRight: "999px",
            }}
          >
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">초등</Menu.Item>
              <Menu.Item key="2">중등</Menu.Item>
              <Menu.Item key="3">고등</Menu.Item>
              <Menu.Item key="4">외국어</Menu.Item>
              <Menu.Item key="5">인문</Menu.Item>
              <Menu.Item key="6">사회</Menu.Item>
              <Menu.Item key="7">과학</Menu.Item>
              <Menu.Item key="8">취미</Menu.Item>
              <Menu.Item key="9">IT</Menu.Item>
              <Menu.Item key="10">컴퓨터</Menu.Item>
              <Menu.Item key="11">수학</Menu.Item>
              <Menu.Item key="12">잡지</Menu.Item>
              <Menu.Item key="13">만화책</Menu.Item>
              <Menu.Item key="14">취미</Menu.Item>
              <Menu.Item key="15">IT</Menu.Item>
              <Menu.Item key="16">컴퓨터</Menu.Item>
              <Menu.Item key="17">수학</Menu.Item>
              <Menu.Item key="18">잡지</Menu.Item>
              <Menu.Item key="19">만화책</Menu.Item>
            </Menu>
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: 200,
              display: "flex",
              alignItems: "stretch",
              flex: "1 1 auto",
            }}
          >
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "left" }}
              >
                <SimpleSlider text="Cogbook 추천" />
                <SimpleSlider text="베스트셀러" />
                <SimpleSlider text="이번달 신간" />
                <SimpleSlider text="정석시리즈" />
                <SimpleSlider />
                <SimpleSlider />
                <SimpleSlider />
                <SimpleSlider />
                <SimpleSlider />
                <SimpleSlider />
                <SimpleSlider />
              </div>
            </Content>
          </Layout>
        </div>
      </Layout>
      // </LeftSideTOC>
    );
  }
}

export default BookStoreMain;
