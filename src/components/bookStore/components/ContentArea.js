import React, { Component } from "react";
import { Layout } from "antd";
import SimpleSlider from "../SimpleSlider";
import AdSlider from "../AdSlider";

const { Content } = Layout;

class ContentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 auto",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
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
              <AdSlider text="광고" />
              <SimpleSlider
                sell_book_list={this.props.sell_book_list}
                text="Cogbook 추천"
              />
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default ContentArea;
