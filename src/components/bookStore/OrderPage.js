/** @jsxImportSource @emotion/react */
import React, { Component } from "react";
import axios from "axios";
import RidiGnbArea from "./components/RidiGnbArea";
import { GlobalStyle } from "./components/GlobalStyle";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Link } from "react-router-dom";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inModification: true,
      title: "",
      category: [],
      hashtag: [],
      author: "",
      publisher: "",
      thumbnail: null,
      intro_book: "",
      intro_author: "",
      indexes: "",
      price: 0,
      promotion_name: "",
      promotion_gap: "",
      promotion_price: 0,
      promotion_period_from: 0,
      promotion_period_to: 0,
      original_book_id: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get("/api/bookstore/get-sellbooklist").then((res) => {
      let somebook = res.data.sellbooklist.find((iid) => iid._id === sessionStorage.getItem("book_id"));
      this.setState({
        title: somebook.book_info.title,
        category: somebook.book_info.category,
        hashtag: somebook.book_info.hashtag,
        author: somebook.book_info.author,
        publisher: somebook.book_info.publisher,
        bookcover_medium: somebook.book_info.bookcover.url_large,
        intro_book: somebook.book_info.intro_book,
        intro_author: somebook.book_info.intro_author,
        indexes: somebook.book_info.indexes,
        price: somebook.book_info.price,
        // promotion_name: "",
        // promotion_gap: "",
        // promotion_price: 0,
        // promotion_period_from: 0,
        // promotion_period_to: 0,
        original_book_id: somebook._id,
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    console.log("OrderPage 컴포 랜더링됨");
    return (
      <div>
        <GlobalStyle />
        <RidiGnbArea />
        안녕하세요.
      </div>
    );
  }
}

export default OrderPage;

const bookDetailPage = css`
  display: flex;
  width: 1015px;
  margin: 0 auto;
`;

const bookDetailArea = css`
  flex: 802.5;
`;

const bookDetailWrapper = css`
  margin-left: 26px;
  padding-right: 35px;
`;

const mainInfoWrapper = css`
  display: flex;
  padding-top: 30px;
`;

const bookcoverWrapper = css`
  flex: 220;
`;

const bookcoverBox = css`
  display: flex;
  justify-content: start;
`;

const bookcoverDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const previewButton = css`
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  line-height: 1em;
  vertical-align: baseline;
  transition: background 0.2s, color 0.2s;
  background: #fff;
  border: 1px solid #1f8ce6;
  box-shadow: 0 1px 1px 0 rgb(31 140 230 / 30%);
  font-size: 13px;
  margin-top: 9px;
  width: 130px;
  padding: 12px 0;
  color: #1f8ce6;
`;

const mainInfoData = css`
  margin: 20px 0;
`;

const CategoryItems = styled.li`
  display: inline;
  margin-right: 10px;
  font-size: 12px;
  color: #333;
  &::after {
    content: ",";
  }
  &::before {
    content: "  ";
  }
  &:last-child:after {
    content: "";
  }
`;
