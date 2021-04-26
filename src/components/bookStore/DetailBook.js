/** @jsxImportSource @emotion/react */
import React, { Component } from "react";
import Category from "./Category";
import InputTag from "./InputTag";
import axios from "axios";
import RidiGnbArea from "./components/RidiGnbArea";
import { GlobalStyle } from "./components/GlobalStyle";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import FavoriteCategory from "./components/FavoriteCategory";
import StarRating from "./StarRating";

class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToPurchageOrder: false,
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

      book_id: "",

      book_comment: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.post("api/bookstore/get-book-info", { sellbook_id: sessionStorage.getItem("book_id") }).then((res) => {
      console.log(res.data.book_comment, "디테일북에서 서버에서 받은 코멘트 정보");
      this.setState(
        {
          title: res.data.sellbook.book_info.title,
          category: res.data.sellbook.book_info.category,
          hashtag: res.data.sellbook.book_info.hashtag,
          author: res.data.sellbook.book_info.author,
          publisher: res.data.sellbook.book_info.publisher,
          bookcover_medium: res.data.sellbook.book_info.bookcover.url_large,
          intro_book: res.data.sellbook.book_info.intro_book,
          intro_author: res.data.sellbook.book_info.intro_author,
          indexes: res.data.sellbook.book_info.indexes,
          price: res.data.sellbook.book_info.price,
          // promotion_name: "",
          // promotion_gap: "",
          // promotion_price: 0,
          // promotion_period_from: 0,
          // promotion_period_to: 0,
          original_book_id: res.data.sellbook._id,
          book_id: res.data.sellbook._id,
          book_comment: res.data.book_comment,
        },
        function () {
          console.log(this.state.book_comment);
        }
      );
    });
  }

  categoryState = (value) => {
    this.setState({
      category: value,
    });
  };

  hashTagState = (value) => {
    this.setState({
      hashtag: value,
    });
  };

  goToPurchageOrder() {
    this.setState({ goToPurchageOrder: !this.state.inModification });
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
    console.log("DetailBook render() 메서드 실행됨");
    console.log(this.state.book_comment, "디테일북 render - 서버에서 받은 코멘트 정보를 this.state에 업데이트 홗인용");
    // debugger;
    return (
      <React.Fragment>
        <GlobalStyle />
        <RidiGnbArea />
        <FavoriteCategory />

        <div className="BookDetailPage" css={bookDetailPage}>
          <div className="BookDetailArea" css={bookDetailArea}>
            <div className="BookDetailWrapper" css={bookDetailWrapper}>
              <div
                className="MainInfoArea"
                css={css`
                  padding-bottom: 40px;
                `}
              >
                <div className="MainInfoWrapper" css={mainInfoWrapper}>
                  <div className="BookcoverWrapper" css={bookcoverWrapper}>
                    <div className="BookcoverBox" css={bookcoverBox}>
                      <div className="BookcoverDiv" css={bookcoverDiv}>
                        <img className="BookcoverImage" width="200" height="320" src={this.state.bookcover_medium} alt="Thumbnail"></img>
                        <button className="PreviewButton" css={previewButton}>
                          미리보기
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      flex: 500;
                      width: 510.06px;
                    `}
                  >
                    <ul>
                      카테고리 :
                      {this.state.category.map((item, i) => (
                        <CategoryItems key={i} className="CategoryItem">
                          {item}
                        </CategoryItems>
                      ))}
                    </ul>
                    <ul>
                      해쉬태그 :
                      {this.state.hashtag.map((item, i) => (
                        <CategoryItems key={i} className="CategoryItem">
                          {item}
                        </CategoryItems>
                      ))}
                    </ul>
                    <div
                      css={css`
                        margin-top: 12px;
                        font-size: 30px;
                        line-height: 1.3em;
                        color: #333;
                        font-weight: 700;
                        word-break: keep-all;
                        word-wrap: break-word;
                      `}
                    >
                      <h3>{this.state.title}</h3>
                    </div>
                    <div
                      className="MainInfoData"
                      css={css`
                        margin: 13px 0 0 0;
                      `}
                    >
                      <Rate disabled defaultValue={4} /> <span>4점</span>
                      <span>(74명)</span>
                    </div>
                    {/* 저자 관련 페이지 작성해야함 */}
                    <div css={mainInfoData}>
                      <div style={{ paddingBottom: "5px" }}>
                        <Link
                          to=""
                          css={css`
                            font-size: 13px;
                            color: #666;
                            line-height: 1em;
                            font-weight: 700;

                            cursor: pointer;
                          `}
                        >
                          {this.state.author}
                        </Link>{" "}
                        저
                      </div>
                      <div>
                        <Link
                          to=""
                          css={css`
                            font-size: 13px;
                            color: #666;
                            line-height: 1em;
                            font-weight: 700;
                            cursor: pointer;
                          `}
                        >
                          {this.state.publisher}
                        </Link>{" "}
                        출판
                      </div>
                    </div>
                    <div
                      css={css`
                        margin: 0 0 15px 0;
                      `}
                    >
                      <table
                        css={css`
                          width: 100%;
                          border-collapse: collapse;
                          border-top: 1px solid #e6e8eb;
                          border-bottom: 1px solid #e6e8eb;
                          border-spacing: 0;
                        `}
                      >
                        <tbody>
                          <tr>
                            <th
                              rowSpan="2"
                              css={css`
                                font-weight: bold;
                                text-align: center;
                                margin: 0;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                                min-height: 36px;
                                padding: 9px 0;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                color: #40474d;
                                border-right: 1px solid #e6e8eb;
                                background: #f7fafc;
                                width: 27.5%;
                              `}
                            >
                              금액
                            </th>
                            <td
                              css={css`
                                line-height: 1em;
                                letter-spacing: -0.03em;
                                width: 27.5%;
                                padding: 10px;
                                white-space: nowrap;
                                color: #808991;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                min-height: 36px;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                              `}
                            >
                              전자책 정가
                            </td>
                            <td
                              css={css`
                                width: 27.5%;
                                text-align: right;
                                font-weight: 700;
                                padding: 10px;
                                white-space: nowrap;
                                color: #808991;
                                min-height: 36px;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                              `}
                            >
                              {this.state.price}원
                            </td>
                            <td
                              css={css`
                                width: 20%;
                                padding-left: 0;
                                white-space: nowrap;
                                color: #808991;
                                min-height: 36px;
                                padding: 9px 0;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                              `}
                            >
                              10% 할인
                            </td>
                          </tr>
                          <tr
                            css={css`
                              vertical-align: inherit;
                              border-color: inherit;
                            `}
                          >
                            <td
                              css={css`
                                line-height: 1em;
                                letter-spacing: -0.03em;
                                width: 25%;
                                padding: 10px;
                                white-space: nowrap;
                                color: #1f8ce6;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                min-height: 36px;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                              `}
                            >
                              판매가
                            </td>
                            <td
                              css={css`
                                width: 27.5%;
                                text-align: right;
                                font-weight: 700;
                                padding: 10px;
                                white-space: nowrap;
                                color: #1f8ce6;
                                min-height: 36px;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                              `}
                            >
                              {this.state.price}원
                            </td>
                            <td
                              css={css`
                                color: #eb5847;
                                font-weight: 700;
                                width: 20%;
                                padding-left: 0;
                                white-space: nowrap;
                                min-height: 36px;
                                padding: 9px 0;
                                vertical-align: middle;
                                font-size: 13px;
                                box-sizing: border-box;
                                line-height: 1em;
                                letter-spacing: -0.03em;
                              `}
                            >
                              10% 할인
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <ul
                        css={css`
                          float: right;
                          display: inline-table;
                          white-space: nowrap;
                          list-style: none;
                          margin: 0;
                          padding: 0;
                          overflow: hidden;
                        `}
                      >
                        <li
                          css={css`
                            display: table-cell;
                            vertical-align: middle;
                            margin: 0;
                            padding: 0 2px 0 3px;
                            padding-left: 0;
                          `}
                        >
                          <button
                            css={css`
                              height: 48px;
                              width: 48px;
                              border: 1px solid #d1d5d9;
                              box-shadow: 0 1px 1px 0 rgb(209 213 217 / 30%);
                              border-radius: 4px;
                              display: inline-block;
                            `}
                          >
                            <img
                              src="image/favorite_black_24dp.svg"
                              alt=""
                              css={css`
                                width: 25px;
                              `}
                            />
                          </button>
                        </li>
                        <li
                          css={css`
                            display: table-cell;
                            vertical-align: middle;
                            margin: 0;
                            padding: 0 2px 0 3px;
                          `}
                        >
                          <button
                            css={css`
                              height: 48px;
                              width: 48px;
                              border: 1px solid #d1d5d9;
                              box-shadow: 0 1px 1px 0 rgb(209 213 217 / 30%);
                              border-radius: 4px;
                              display: inline-block;
                            `}
                          >
                            <img
                              src="image/shopping_cart_black_24dp.svg"
                              alt=""
                              css={css`
                                width: 25px;
                              `}
                            />
                          </button>
                        </li>
                        <li
                          css={css`
                            display: table-cell;
                            vertical-align: middle;
                            margin: 0;
                            padding: 0 2px 0 3px;
                          `}
                        >
                          <button
                            css={css`
                              height: 48px;
                              width: 48px;
                              border: 1px solid #d1d5d9;
                              box-shadow: 0 1px 1px 0 rgb(209 213 217 / 30%);
                              border-radius: 4px;
                              display: inline-block;
                            `}
                          >
                            <img
                              src="image/card_giftcard_black_24dp.svg"
                              alt=""
                              css={css`
                                width: 25px;
                              `}
                            />
                          </button>
                        </li>
                        <li
                          css={css`
                            display: table-cell;
                            vertical-align: middle;
                            margin: 0;
                            padding: 0 2px 0 3px;
                            padding-right: 0;
                          `}
                        >
                          <Link
                            to="/order"
                            css={css`
                              letter-spacing: -0.03em;
                              -webkit-font-smoothing: antialiased;
                              margin: 0;
                              -webkit-tap-highlight-color: transparent;
                              appearance: none;
                              outline: 0;
                              text-decoration: none;
                              box-sizing: border-box;
                              border-radius: 4px;
                              font-weight: 700;
                              display: inline-block;
                              text-align: center;
                              vertical-align: baseline;
                              transition: background 0.2s, color 0.2s;
                              color: #fff;
                              background: #1f8ce6;
                              border: 1px solid #0077d9;
                              box-shadow: 0 1px 1px 0 rgb(31 140 230 / 30%);
                              float: left;
                              height: 48px;
                              line-height: 46px;
                              cursor: pointer;
                              padding: 0 16px;
                              min-width: 112px;
                              font-size: 15px;
                            `}
                          >
                            구매하기
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="MetaInfoWrapper"
                  css={css`
                    display: -ms-grid;
                    display: grid;
                    -ms-grid-columns: 260px auto;
                    grid-template-columns: 260px auto;
                    margin-top: 40px;
                    padding: 20px 26px 13px;
                    border: solid 4px #f2f4f5;
                  `}
                >
                  <ul css={css``}>
                    <li
                      css={css`
                        display: table;
                        padding-bottom: 7px;
                        font-size: 12px;
                        color: #666;
                      `}
                    >
                      <span
                        css={css`
                          display: table-cell;
                          padding-right: 9px;
                          font-size: inherit;
                          line-height: 16px;
                          font-weight: 700;
                          color: #525a61;
                        `}
                      >
                        출간정보
                      </span>
                      <ul
                        css={css`
                          display: table-cell;
                        `}
                      >
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.04.07. 전자책 출간
                        </li>
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.03.10. 종이책 출간
                        </li>
                      </ul>
                    </li>
                    <li
                      css={css`
                        display: table;
                        padding-bottom: 7px;
                        font-size: 12px;
                        color: #666;
                      `}
                    >
                      <span
                        css={css`
                          display: table-cell;
                          padding-right: 9px;
                          font-size: inherit;
                          line-height: 16px;
                          font-weight: 700;
                          color: #525a61;
                        `}
                      >
                        파일정보
                      </span>
                      <ul
                        css={css`
                          display: table-cell;
                        `}
                      >
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.04.07. 전자책 출간
                        </li>
                      </ul>
                    </li>
                    <li
                      css={css`
                        display: table;
                        padding-bottom: 7px;
                        font-size: 12px;
                        color: #666;
                      `}
                    >
                      <span
                        css={css`
                          display: table-cell;
                          padding-right: 9px;
                          font-size: inherit;
                          line-height: 16px;
                          font-weight: 700;
                          color: #525a61;
                        `}
                      >
                        ISBN
                      </span>
                      <ul
                        css={css`
                          display: table-cell;
                        `}
                      >
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.04.07. 전자책 출간
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <ul css={css``}>
                    <li
                      css={css`
                        display: table;
                        padding-bottom: 7px;
                        font-size: 12px;
                        color: #666;
                      `}
                    >
                      <span
                        css={css`
                          display: table-cell;
                          padding-right: 9px;
                          font-size: inherit;
                          line-height: 16px;
                          font-weight: 700;
                          color: #525a61;
                        `}
                      >
                        출간정보
                      </span>
                      <ul
                        css={css`
                          display: table-cell;
                        `}
                      >
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.04.07. 전자책 출간
                        </li>
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.03.10. 종이책 출간
                        </li>
                      </ul>
                    </li>
                    <li
                      css={css`
                        display: table;
                        padding-bottom: 7px;
                        font-size: 12px;
                        color: #666;
                      `}
                    >
                      <span
                        css={css`
                          display: table-cell;
                          padding-right: 9px;
                          font-size: inherit;
                          line-height: 16px;
                          font-weight: 700;
                          color: #525a61;
                        `}
                      >
                        파일정보
                      </span>
                      <ul
                        css={css`
                          display: table-cell;
                        `}
                      >
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.04.07. 전자책 출간
                        </li>
                      </ul>
                    </li>
                    <li
                      css={css`
                        display: table;
                        padding-bottom: 7px;
                        font-size: 12px;
                        color: #666;
                      `}
                    >
                      <span
                        css={css`
                          display: table-cell;
                          padding-right: 9px;
                          font-size: inherit;
                          line-height: 16px;
                          font-weight: 700;
                          color: #525a61;
                        `}
                      >
                        ISBN
                      </span>
                      <ul
                        css={css`
                          display: table-cell;
                        `}
                      >
                        <li
                          css={css`
                            display: block;
                            position: relative;
                            width: 100%;
                            line-height: 16px;
                            padding-bottom: 2px;
                          `}
                        >
                          2021.04.07. 전자책 출간
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="IntroBookArea"
                css={css`
                  padding-bottom: 70px;
                `}
              >
                <div
                  className="IntroBookTitle"
                  css={css`
                    margin-bottom: 15px;
                    padding: 10px 0 8px 0;
                    border-bottom: 2px solid #7d8e9e;
                    font-size: 20px;
                    color: #59667a;
                    font-weight: 700;
                    letter-spacing: -0.03em;
                  `}
                >
                  책소개
                </div>
                <div className="IntroBookContent">
                  <p
                    className="IntroBookParagraph"
                    css={css`
                      line-height: 1.8em;
                      font-size: 13px;
                      color: #333;
                      word-break: keep-all;
                      word-wrap: break-word;
                      text-align: justify;
                    `}
                  >
                    {this.state.intro_book}
                  </p>
                </div>
                <button
                  className="ExpandView"
                  css={css`
                    display: block;
                    float: right;
                    background: 0 0;
                    font-size: 13px;
                    color: #4076b5;
                    border: none;
                  `}
                >
                  펼쳐보기
                  <span
                    css={css`
                      margin-left: 5px;
                    `}
                  >
                    <img
                      src="image/arrow_circle_down_black_24dp.svg"
                      alt=""
                      css={css`
                        width: 16px;
                        top: 3px;
                      `}
                    />
                  </span>
                </button>
              </div>

              <div
                className="BookDetailBox IntroAuthorArea"
                css={css`
                  padding-bottom: 70px;
                `}
              >
                <div
                  className="BookDetailTitle IntroAuhorTitle"
                  css={css`
                    margin-bottom: 15px;
                    padding: 10px 0 8px 0;
                    border-bottom: 2px solid #7d8e9e;
                    font-size: 20px;
                    color: #59667a;
                    font-weight: 700;
                    letter-spacing: -0.03em;
                  `}
                >
                  저자 소개
                </div>
                <div className="BookDetailContent IntroAuthorContent">
                  <p
                    className="BookDetailParagraph IntroAuthorParagraph"
                    css={css`
                      line-height: 1.8em;
                      font-size: 13px;
                      color: #333;
                      word-break: keep-all;
                      word-wrap: break-word;
                      text-align: justify;
                    `}
                  >
                    {this.state.intro_author}
                  </p>
                </div>
                <button
                  className="ExpandView"
                  css={css`
                    display: block;
                    float: right;
                    background: 0 0;
                    font-size: 13px;
                    color: #4076b5;
                    border: none;
                  `}
                >
                  펼쳐보기
                  <span
                    css={css`
                      margin-left: 5px;
                    `}
                  >
                    <img
                      src="image/arrow_circle_down_black_24dp.svg"
                      alt=""
                      css={css`
                        width: 16px;
                        top: 3px;
                      `}
                    />
                  </span>
                </button>
              </div>

              <div
                className="BookDetailBox BookTOC-Area"
                css={css`
                  padding-bottom: 70px;
                `}
              >
                <div
                  className="BookDetailTitle BookTOC-Title"
                  css={css`
                    margin-bottom: 15px;
                    padding: 10px 0 8px 0;
                    border-bottom: 2px solid #7d8e9e;
                    font-size: 20px;
                    color: #59667a;
                    font-weight: 700;
                    letter-spacing: -0.03em;
                  `}
                >
                  목차
                </div>
                <div className="BookDetailContent BookTOC-Content">
                  <p
                    className="BookDetailParagraph BookTOC-Paragraph"
                    css={css`
                      line-height: 1.8em;
                      font-size: 13px;
                      color: #333;
                      word-break: keep-all;
                      word-wrap: break-word;
                      text-align: justify;
                    `}
                  >
                    {this.state.indexes}
                  </p>
                </div>
                <button
                  className="ExpandView"
                  css={css`
                    display: block;
                    float: right;
                    background: 0 0;
                    font-size: 13px;
                    color: #4076b5;
                    border: none;
                  `}
                >
                  펼쳐보기
                  <span
                    css={css`
                      margin-left: 5px;
                    `}
                  >
                    <img
                      src="image/arrow_circle_down_black_24dp.svg"
                      alt=""
                      css={css`
                        width: 16px;
                        top: 3px;
                      `}
                    />
                  </span>
                </button>
              </div>

              <StarRating book_comment={this.state.book_comment} updateStateBookComment={(value) => this.setState({ book_comment: value })} />
            </div>
          </div>
          {/* 광고 AsideRight */}

          <div
            className="AsideRightAd"
            css={css`
              border-left: 1px solid #e6e8eb;
              flex: 215;
            `}
          >
            광고
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailBook;

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
