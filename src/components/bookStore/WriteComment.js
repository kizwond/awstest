/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Component } from "react";
import axios from "axios";

class WriteComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblie: false,
    };
  }

  changeVisivility = () => {
    this.setState({ visiblie: !this.state.visiblie });
  };

  sendCommentToServer = (event) => {
    const nowTime = new Date();

    const user_id = "Jooka";
    const sellbook_id = sessionStorage.getItem("book_id");
    const root_id = event.target.dataset.id;
    const parent_id = event.target.dataset.id;
    const level = Number(event.target.dataset.level) + 1;
    const isDeleted = "no";
    const time_created = nowTime;
    const rating = 0;
    const content = this.state.content;

    axios.post("api/bookstore/register-book-comment", { user_id, sellbook_id, root_id, parent_id, level, isDeleted, time_created, rating, content }).then((res) => {
      console.log(res.data.book_comment);
      this.props.updateStateBookComment(res.data.book_comment);
      this.changeVisivility();
      this.setState({ content: "" });
      this.props.changeVisivility(this.props.comment_id, false)
    });
  };

  changeReply = (e) => {
    e.preventDefault();
    this.setState({
      content: String(e.target.value),
    });
  };

  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
          <button style={{ display: "block" }} onClick={this.changeVisivility}>
            댓글달기
          </button>
        </div>
        <div style={{ display: this.state.visiblie ? "block" : "none", borderTop: "1px solid #c4d1de" }}>
          <textarea
            rows="4"
            cols="50"
            type="textarea"
            css={css`
              display: block;
            `}
            value={this.state.content}
            onChange={this.changeReply.bind(this)}
          />

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
            data-id={this.props.id}
            data-book_id={this.props.book_id}
            data-level={this.props.level}
            data-isdeleted={this.props.isDeleted}
            onClick={this.sendCommentToServer}
          >
            리뷰 남기기
          </button>
        </div>
      </>
    );
  }
}

export default WriteComment;
