import React, { Component } from "react";
import Category from "./Category";
import MyPicture from "./image/한국사기출500제.png";
import InputTag from "./InputTag";

class BookSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div
          style={{
            height: 400,
            width: 800,
            background: "yellowgreen",
            display: "flex",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "yellow",
            }}
          >
            <img
              width="200"
              height="300"
              src={MyPicture}
              alt="Thumbnail"
              style={{
                borderRadius: "8px",
              }}
            ></img>
            <button
              style={{
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
                width: "70%",
                height: "30px",
                fontSize: "1rem",
              }}
            >
              미리보기
            </button>
          </div>
          <div
            style={{
              background: "green",
              fontSize: "2rem",
              paddingLeft: "1rem",
              // display: "flex",
              width: 600,
            }}
          >
            <div>책 이름 :</div>
            <div>저자 :</div>
            <div>출판사 :</div>
            <div>
              금액 : <input type="number" name="price" value="0"></input>
            </div>
            <div>
              카테고리
              <Category />
              관련 단어 입력
              <InputTag />
            </div>
          </div>
        </div>

        <div
          style={{
            height: 400,
            width: 800,
            background: "#1CCDFF",
            display: "flex",
            margin: "0 auto",
          }}
        >
          책 소개
          <br />
          <br />
          <br />
          <br />
          <br /> 펼쳐보기
        </div>

        <div
          style={{
            height: 400,
            width: 800,
            background: "#32F4FF",
            display: "flex",
            margin: "0 auto",
          }}
        >
          저자소개
        </div>

        <div
          style={{
            height: 400,
            width: 800,
            background: "#20D9DD",
            display: "flex",
            margin: "0 auto",
          }}
        >
          목차
        </div>
        <div
          style={{
            height: 400,
            width: 800,
            background: "#FADF63",
            display: "flex",
            margin: "0 auto",
          }}
        >
          리뷰
        </div>
      </div>
    );
  }
}

export default BookSummary;
