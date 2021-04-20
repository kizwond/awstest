/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import React, { Component } from "react";
import { Rate } from "antd";
import ShowButton from "./ShowButton";
import axios from "axios";

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      user_id: "",
      book_id: "",
      root_id: "",
      parent_id: "",
      level: 0,
      isDeleted: "no",
      time_created: null,
      rating: 0,
      content: "",
    };
  }
  handleChange = (value) => {
    console.log(value);
    this.setState({ rating: value });
  };

  showComment = () => this.setState({ showComment: !this.state.showComment });

  sendCommentToServer = (event) => {
    event.preventDefault();
    const nowTime = new Date();
    // const register_comment = {
    //   user_id: "Jooka",
    //   book_id: sessionStorage.getItem("book_id"),
    //   root_id: "1123",
    //   parent_id: "",
    //   level: 1,
    //   isDeleted: "no",
    //   time_created: nowTime,
    //   rating: this.state.rating,
    //   content: this.state.content,
    // };

    const user_id = "Jooka";
    const sellbook_id = sessionStorage.getItem("book_id");
    const root_id = "1123";
    const parent_id = "";
    const level = 1;
    const isDeleted = "no";
    const time_created = nowTime;
    const rating = this.state.rating;
    const content = this.state.content;

    // console.log(register_comment);

    // axios.post("api/bookstore/register-book-comment", {register_comment : register_comment}).then((res) => {
    axios.post("api/bookstore/register-book-comment", { user_id, sellbook_id, root_id, parent_id, level, isDeleted, time_created, rating, content }).then((res) => {
      console.log(res.data);
    });
  };

  changeReveiw = (e) => {
    e.preventDefault();
    this.setState({
      content: String(e.target.value),
    });
  };

  render() {
    return (
      <div
        className="BookDetailBox BookReviewArea"
        css={css`
          padding-bottom: 70px;
        `}
      >
        <div
          className="BookDetailTitle BookReviewTitle"
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
          리뷰
        </div>
        <div
          css={css`
            display: flex;
            padding-bottom: 30px;
          `}
        >
          <Global
            styles={css`
              .bigStar svg {
                width: 40px;
                height: 40px;
              }

              .smallStar svg {
                width: 10px;
                height: 10px;
              }

              .smallStar > li:not(:last-child) {
                margin-right: 2px;
              }

              /* .ReviewListWrapper:first-child {
                border-top: 0;
              } */
            `}
          />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              flex: 0.2;
              align-items: center;
            `}
          >
            <div>구매자 별점</div>
            <div>점수</div>
            <div>
              <Rate className="smallStar" disabled defaultValue={2} />
            </div>
            <ul>
              <li>별5개 : 50명</li>
              <li>별4개 : 40명</li>
              <li>별3개 : 30명</li>
              <li>별2개 : 20명</li>
              <li>별1개 : 10명</li>
            </ul>
            <hr width="80%" />
            <div>176명이 평가함</div>
          </div>
          <div
            css={css`
              flex: 0.8;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <div>
              <Rate className="bigStar" onChange={this.handleChange} />
            </div>
            <div>
              {/* 폼태그에는 eventDefault를 무조건 걸어줘야한다. 폼 자체적으로 event거시기 거시기가 있어서이다. */}
              <form>
                <label>
                  <textarea
                    rows="4"
                    cols="50"
                    type="textarea"
                    css={css`
                      display: block;
                    `}
                    onChange={this.changeReveiw.bind(this)}
                  />
                  {/* 글자 10자이상되면 버튼 파랑색으로 변경됨 */}
                  <button
                    css={css`
                      float: right;
                      color: #fff;
                      background: #1f8ce6;
                      border: 1px solid #0077d9;
                      box-shadow: 0 1px 1px 0 rgba(31, 140, 230, 0.3);
                      font-size: 12px;
                      padding: 8px 18px;
                      opacity: 0.5;
                    `}
                    onClick={this.sendCommentToServer}
                  >
                    리뷰 남기기
                  </button>
                </label>
              </form>
            </div>
          </div>
        </div>

        <ReviewList2 />
      </div>
    );
  }
}

export default StarRating;

class ReviewList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      user_id: "",
      book_id: "",
      root_id: "",
      parent_id: "",
      level: 0,
      isDeleted: "no",
      time_created: null,
      rating: 0,
      content: "",
    };
  }

  sendCommentToServer = (event) => {
    // event.preventDefault();
    const nowTime = new Date();
    console.log(event.target.info.root_id);

    const register_comment = {
      _id: "",
      user_id: "Jooka",
      book_id: sessionStorage.getItem("book_id"),
      root_id: this.state.root_id,
      parent_id: this.state.parent_id,
      level: 0,
      isDeleted: "no",
      time_created: String(nowTime),
      rating: null,
      content: this.state.content,
    };
    console.log(register_comment);

    // axios.post("api/bookstore/register-book-comment", { sellbook_id: sessionStorage.getItem("book_id"), content: { register_comment } }).then((res) => {
    //   console.log(res.data);
    // });
  };

  changeReply = (e) => {
    e.preventDefault();
    this.setState({
      content: String(e.target.value),
    });
  };

  render() {
    const level1 = comments.map((comment) => {
      if (comment.children.length > 0) {
        // 임시 칠드런을 만들어 놓고
        let tmp_children = comment.children.slice();

        // 해당 children의 최대 level 구하기
        let levels = tmp_children.map((comment) => comment.level);
        let max_level = Math.max(...levels);

        // 일단 2레벨부터 깔아놓자.
        comment.children = tmp_children.filter((child) => child.level == 2);

        // 3레벨 이상이 있는 경우, 레벨 하나씩 뿌려준다.
        if (max_level >= 3) {
          for (var level = 3; level <= max_level; level++) {
            for (var i = tmp_children.length - 1; i >= 0; i--) {
              let position = comment.children.findIndex((original) => tmp_children[i].parent_id == original._id && tmp_children[i].level == level);
              if (position >= 0) {
                comment.children.splice(position + 1, 0, tmp_children[i]);
              }
            }
          }
        }
      }

      const levelArray = comment.children;

      const comments = levelArray.map((child) => {
        return (
          <div key={child._id} style={{ background: "#f8fbfe", borderTop: "1px solid #e8edf3" }}>
            <div style={{ marginLeft: `${(child.level - 2) * 10}px`, padding: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{child.content}</div>
                <button>댓글 달기버튼</button>
              </div>
              <div>
                <span
                  css={css`
                    display: inline-block;
                    font-size: 11px;
                    color: #7d8e9e;
                    font-weight: 700;
                    width: 40px;
                  `}
                >
                  {child.user_id.substring(0, 3) + "***"}
                </span>
                <span
                  css={css`
                    font-size: 11px;
                    color: #7d8e9e;
                    font-weight: 400;
                    margin-left: 15px;
                  `}
                >
                  {KoreadateWithTime(child.time_created)}
                </span>
                {/* 댓글달기 버튼 누르면 텍스트 입력창 표시 => 컴포넌트로 표시해야함 */}

                <div>
                  <label>
                    <textarea type="textarea" rows={1} cols={40} onChange={this.changeReply} placeholder="이곳에 댓글을 남겨주세요."></textarea>
                    <button
                      info={{
                        id: child._id,
                        book_id: child.book_id,
                        root_id: child.root_id,
                        level: child.level,
                        isDeleted: child.isDeleted,
                      }}
                      onClick={this.sendCommentToServer.bind(this)}
                    >
                      댓글올리기
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      });

      function Koreadate(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return year + "." + month + "." + day;
      }

      function KoreadateWithTime(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();

        return year + "." + month + "." + day + " " + hour + ":" + min;
      }

      return (
        <React.Fragment>
          <li key={comment._id}>
            <div
              className="ReviewListWrapper"
              css={css`
                padding-top: 14px;
                display: flex;
                width: 100%;
                border-bottom: 1px solid #d1d5d9;
                /* border-bottom: 0; */
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  flex: 0.15;
                  align-items: flex-start;
                `}
              >
                <Rate style={{ display: "block" }} className="smallStar" disabled defaultValue={comment.rating} />
                <div>{comment.user_id.substring(0, 3) + "***"}</div>
                <div>{Koreadate(comment.time_created)}</div>
              </div>
              <div
                css={css`
                  flex: 0.85;
                `}
              >
                <div
                  css={css`
                    padding: 5px 8px 6px 8px;
                  `}
                >
                  {comment.content}
                </div>
                <ShowButton comments={comments} />
              </div>
            </div>
          </li>
        </React.Fragment>
      );
    });
    return (
      <>
        <div
          className="ReviewListTitle BookReviewTitle"
          css={css`
            margin-bottom: 15px;
            padding: 10px 0;
            border-bottom: 2px solid #d1d5d9;
            font-size: 15px;
            color: #40474d;
            font-weight: 700;
            letter-spacing: -0.03em;
          `}
        >
          리뷰 내용
        </div>
        <ul className="ReviewListArea">{level1}</ul>
      </>
    );
  }
}

const comments = [
  {
    _id: "123",
    user_id: "jukka",
    book_id: "abcdefghijklmn",
    root_id: null,
    parent_id: null,
    level: 1,
    isDeleted: "no",
    time_created: "Wed Apr 20 2021 14:37:58 GMT+0900 (대한민국 표준시)",
    rating: 1,
    content: "재밌네요",
    children: [
      {
        _id: "124",
        user_id: "aaa",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:38:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말",
      },
      {
        _id: "125",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:39:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "동감입니다.",
      },
      {
        _id: "128",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "124",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:40:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말 아닌데",
      },
      {
        _id: "130",
        user_id: "sangil",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:41:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "참신합니다요",
      },
      {
        _id: "134",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "128",
        level: 4,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:42:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "주작 냄새가...",
      },
      {
        _id: "135",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "125",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:43:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "취향이 독특하시네요",
      },
    ],
  },
  {
    _id: "12323",
    user_id: "kizwond",
    book_id: "abcdefghijklmn",
    root_id: null,
    parent_id: null,
    level: 1,
    isDeleted: "no",
    time_created: "Wed Apr 16 2021 14:37:58 GMT+0900 (대한민국 표준시)",
    rating: 5,
    content:
      "선생님, 문학은 필연적으로 정치적일 수밖에 없습니다... 오히려 비정치적인 소설을 찾는다 하시면 찾기 정말 힘듭니다. 순문학이 아닌 SF, 판타지, 심지어 수필 에세이같은 글에서도 정치성이 엿보이는 것이 오히려 흔합니다. 실제 에피소드를 조금 더 픽션화하시는 노력이라고 하셨는데, 주인공이 남들과 다른 능력을 지니고 그걸 해결해나가는 설정부터가 충분히 픽션적이지 않으신가요?? 이이상의 픽션을 요구하시는 거라면 다른 장르를 찾아보셔야 하지 않을까 저는 생각합니다. ",
    children: [
      {
        _id: "12324",
        user_id: "aaa",
        book_id: "abcdefghijklmn",
        root_id: "12323",
        parent_id: "12323",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:38:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말",
      },
      {
        _id: "12325",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "12323",
        parent_id: "12323",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:39:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "동감입니다.",
      },
      {
        _id: "12328",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "12323",
        parent_id: "12324",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:40:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말 아닌데",
      },
      {
        _id: "12330",
        user_id: "sangil",
        book_id: "abcdefghijklmn",
        root_id: "12323",
        parent_id: "12323",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:41:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "참신합니다요",
      },
      {
        _id: "12334",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "12323",
        parent_id: "12328",
        level: 4,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:42:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "주작 냄새가...",
      },
      {
        _id: "12335",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "12323",
        parent_id: "12325",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:43:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "취향이 독특하시네요",
      },
    ],
  },
  {
    _id: "1123",
    user_id: "cogbook",
    book_id: "abcdefghijklmn",
    root_id: null,
    parent_id: null,
    level: 1,
    isDeleted: "no",
    time_created: "Wed Apr 16 2021 14:37:58 GMT+0900 (대한민국 표준시)",
    rating: 5,
    content: "ㅎㅎㅎㅎㅎㅎㅎ",
    children: [
      {
        _id: "1124",
        user_id: "aaa",
        book_id: "abcdefghijklmn",
        root_id: "1123",
        parent_id: "1123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:38:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말",
      },
      {
        _id: "1125",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "1123",
        parent_id: "1123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:39:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "동감입니다.",
      },
      {
        _id: "1128",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "1123",
        parent_id: "1124",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:40:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말 아닌데",
      },
      {
        _id: "1130",
        user_id: "sangil",
        book_id: "abcdefghijklmn",
        root_id: "1123",
        parent_id: "1123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:41:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "참신합니다요",
      },
      {
        _id: "1134",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "1123",
        parent_id: "1128",
        level: 4,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:42:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "주작 냄새가...",
      },
      {
        _id: "1135",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "1123",
        parent_id: "1125",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:43:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "취향이 독특하시네요",
      },
    ],
  },
];
