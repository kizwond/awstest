import React, { Component } from "react";
import { Layout } from "antd";
import axios from "axios";
import BookSummary from "./BookSummary";
import TocSider from "./TocSider";

const { Content } = Layout;

class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_info: [],
    };
  }

  componentDidMount() {
    axios
      .post("/api/bookstore/get-sellbooklist", {
        book_id: sessionStorage.getItem("book_id"),
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ book_info: res.data.book_info });
      });
  }
  render() {
    return (
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
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 0 auto",
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        > */}
        <TocSider />
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
            display: "flex",
            alignItems: "stretch",
            flex: "1 1 auto",
          }}
        >
          <Content style={{ margin: "24px 16px 0" }}>
            <BookSummary />
          </Content>
        </Layout>
        {/* </div> */}
      </Layout>
    );
  }
}

export default DetailBook;
