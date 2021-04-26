/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import React, { Component } from "react";
import { Rate } from "antd";
import ShowButton from "./ShowButton";
import axios from "axios";
import WriteComment from "./WriteComment";

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

      book_comment: [],
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
    //   sellbook_id: sessionStorage.getItem("book_id"),
    //   root_id: "",
    //   parent_id: "",
    //   level: 1,
    //   isDeleted: "no",
    //   time_created: nowTime,
    //   rating: this.state.rating,
    //   content: this.state.content,
    // };

    const user_id = "Jooka";
    const sellbook_id = sessionStorage.getItem("book_id");
    const root_id = null;
    const parent_id = null;
    const level = 1;
    const isDeleted = "no";
    const time_created = nowTime;
    const rating = this.state.rating;
    const content = this.state.content;

    // 서버에 파일 보낼 때 { register_comment }으로 보내면 { register_comment { .... }}형식으로 전송됨, 두번째로 보내는게 맞음.
    // POST /api/bookstore/get-book-info 200 73.048 ms - 12259
    //     req.isAuthenticated true
    //     북코멘트를 등록합니다.
    //     {
    //       register_comment: {
    //         user_id: 'Jooka',
    //         sellbook_id: '60739e56ad7ba776d9cd73d2',
    //         root_id: '',
    //         parent_id: '',
    //         level: 1,
    //         isDeleted: 'no',
    //         time_created: '2021-04-20T23:47:58.979Z',
    //         rating: 4,
    //         content: 'dfadfdfe'
    //       }
    //     }
    // axios.post("api/bookstore/register-book-comment", { register_comment }).then((res) => {
    axios.post("api/bookstore/register-book-comment", { user_id, sellbook_id, root_id, parent_id, level, isDeleted, time_created, rating, content }).then((res) => {
      console.log("첫번째 댓글 보내고 받은 파일", res.data.book_comment);
      this.props.updateStateBookComment(res.data.book_comment);
    });
  };

  changeReveiw = (e) => {
    e.preventDefault();
    this.setState({
      content: String(e.target.value),
    });
  };

  render() {
    // console.log(this.props.book_comment);
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
                    value={this.state.content}
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
                    onClick={this.sendCommentToServer.bind(this)}
                  >
                    리뷰 남기기
                  </button>
                </label>
              </form>
            </div>
          </div>
        </div>

        <ReviewList2 book_comment={this.props.book_comment} updateStateBookComment={(value) => this.props.updateStateBookComment(value)} />
      </div>
    );
  }
}

export default StarRating;

class ReviewList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      book_comment: [],
      visiblie: [{comment_id : '', visiblie: false}],
    };
  }

  sendCommentToServer = (event) => {
    const nowTime = new Date();

    const user_id = "Jooka";
    const sellbook_id = sessionStorage.getItem("book_id");
    const root_id = event.target.dataset.root_id;
    const parent_id = event.target.dataset.id;
    const level = 1 + Number(event.target.dataset.level);
    const isDeleted = "no";
    const time_created = nowTime;
    const rating = 0;
    const content = this.state.content;

    axios.post("api/bookstore/register-book-comment", { user_id, sellbook_id, root_id, parent_id, level, isDeleted, time_created, rating, content }).then((res) => {
      console.log("두번째 댓글 보내고 받은 파일", res.data);
      this.updateBookComment(res.data.book_comment);
      console.log(this.state.book_comment, "ReviewList2 서버에서 res받아서 스테이트에 등록잘됐는지 확인용");
    });
  };

  updateBookComment(data) {
    this.setState({ book_comment: data }, () => {
      console.log(this.state.book_comment);
    });
  }
  changeReply = (e) => {
    e.preventDefault();
    this.setState({
      content: String(e.target.value),
    });
  };
  changeVisivility = (comment_id, visiblie) => {
    console.log("here clicked!!!")
    // if(this.state.visiblie.comment_id === comment_id){
    //   if(this.state.visiblie.visiblie === true){
    //     var value = false;
    //   } else {
    //     value = true;
    //   }
    // }
    const new_viState = { comment_id:comment_id, visiblie:!visiblie}
    console.log(this.state.visiblie)
    const eli = this.state.visiblie.findIndex((item)=>item.comment_id === comment_id)
    console.log(eli)
    if(eli === -1) {
      const new_state = this.state.visiblie.concat(new_viState)
      this.setState(prevState=>({
        visiblie:new_state
      }));
    } else {
      this.state.visiblie.splice(eli, 1);
      const new_state = this.state.visiblie.concat(new_viState)
      this.setState(prevState=>({
        visiblie:new_state
      }));
    }
    
    
  };
  render() {
    let comments = this.props.book_comment;
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

      let comments = levelArray.map((child) => {
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
                    {/* data- 형식으로 attribute(속성)을 저장하면 event발생시 해당 target에서 dataset.속성이름으로 속성값을 불러 올 수 있다. */}
                    <button
                      data-id={child._id}
                      data-book_id={child.book_id}
                      data-root_id={child.root_id}
                      data-level={child.level}
                      data-isdeleted={child.isDeleted}
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
                <ShowButton comment_id={comment._id} changeVisivility={this.changeVisivility} visiblie={this.state.visiblie} comments={comments} />
                <WriteComment
                  id={comment._id}
                  book_id={comment.book_id}
                  level={comment.level}
                  isDeleted={comment.isDeleted}
                  updateStateBookComment={(value) => this.props.updateStateBookComment(value)}
                  changeVisivility={this.changeVisivility}
                  comment_id={comment._id}
                />
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
