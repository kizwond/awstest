import React, { Component } from "react";
import { Layout } from "antd";
import axios from "axios";
import TocSider from "./TocSider";
import AddSellBookModal from "./components/AddSellBookModal";
import ContentArea from "./components/ContentArea";

// 서버로 보내는 API .post("api/bookstore/update-sellbook",

class BookStoreMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sell_book_list: [],
      search: "",
    };
  }

  componentDidMount() {
    axios.get("/api/bookstore/get-sellbooklist").then((res) => {
      console.log(res.data);
      this.setState({ sell_book_list: res.data.sellbooklist });
    });
  }

  searchIndex = (e) => {
    let value = e.target.value;

    this.setState({ search: value });
  };

  searchNow = () => {
    const abc = this.state.sell_book_list;
    const bbb = abc.filter((it) =>
      it.book_info.category.includes(this.state.search)
    );
    console.log(bbb);
  };

  render() {
    return (
      <Layout
        style={{
          width: "1440px",
          margin: "0 auto",
          fontSize: "12px",
        }}
      >
        <AddSellBookModal />
        <TocSider />

        <ContentArea sell_book_list={this.state.sell_book_list} />
      </Layout>
    );
  }
}

export default BookStoreMain;
