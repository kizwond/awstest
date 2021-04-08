import React, { Component } from "react";
import { Layout } from "antd";
import BookSummary from "./BookSummary";
import TocSider from "./TocSider";

const { Content } = Layout;

class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout
        style={{
          width: "1440px",
          display: "flex",
          margin: "0 auto",
        }}
      >
        <TocSider />
        <Layout
          className="site-layout"
          style={{
            // background: "gray",
            marginLeft: "220px",
          }}
        >
          <Content
            style={{ margin: "0 auto", overflow: "initial", width: "1200px" }}
          >
            <BookSummary />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DetailBook;
