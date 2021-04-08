import React, { Component } from "react";
import { Layout, Table, Tag } from "antd";
import TocSider from "./TocSider";
import axios from "axios";

import CategoryBookList from "./components/CategoryBookList";

const { Content } = Layout;

const value = sessionStorage.getItem("category");

class LinkCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
    };
  }

  componentDidMount() {
    axios.get("/api/bookstore/get-sellbooklist").then((res) => {
      this.setState({
        bookList: res.data.sellbooklist,
      });
    });
  }

  render() {
    const bookList = this.state.bookList;
    const categoryBookList = bookList.filter((it) =>
      it.book_info.category.includes(value)
    );
    console.log(value);
    console.log(categoryBookList);

    const category_columns = [
      {
        title: "책 이름",
        dataIndex: "booktitle",
        key: "booktitle",
      },
      {
        title: "태그",
        dataIndex: "booktags",
        key: "booktags",
        render: (booktags) => {
          return (
            <>
              {booktags.map((hashtag) => (
                <Tag key={hashtag} color="blue">
                  {hashtag.toUpperCase()}
                </Tag>
              ))}
            </>
          );
        },
      },
    ];

    const category_data = categoryBookList.map((item) => ({
      book_id: item._id,
      booktitle: item.book_info.title,
      booktags: item.book_info.hashtag,
    }));

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
            <CategoryBookList categorybooklist={categoryBookList} />
            {/* <ul>{showCategoryBookList}</ul> */}
            <Table
              columns={category_columns}
              dataSource={category_data}
              pagination={{ position: ["bottomLeft"] }}
            ></Table>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LinkCategory;
