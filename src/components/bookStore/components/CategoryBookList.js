import React, { Component } from "react";
// import "./stylesCategoryLink.css";
import styled, { css } from "styled-components";

const StyledDiv = styled.div`
  /* all: initial; */
  &.thumb {
    /* float: left; */
    /* position: relative; */
    /* display: inline; */
    margin-right: 20px;
  }
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  /* display: block; */

  /* margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px; */
  text-align: left;
`;

const StyledLi = styled.li`
  /* clear: both; */
  padding-top: 20px;
  width: 1240px;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;

class CategoryBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <StyledDiv>
        <StyledUl>
          {this.props.categorybooklist.map((item) => {
            return (
              <StyledLi>
                <div className="thumb">
                  <a
                    className="sp_thmb thmb100x"
                    href="/book-detail"
                    title={item.book_info.title}
                  >
                    <img
                      width="100px"
                      src="https://picsum.photos/id/24/200/300"
                      alt="thumb"
                    ></img>
                  </a>
                </div>
                <div>
                  <dl>
                    <dt>
                      <span className="tit">
                        {item.book_info.intro_author}{" "}
                      </span>
                    </dt>
                    <dd className="text_intro">{item.book_info.intro_book}</dd>
                    <dd className="book_info">
                      <a href="/">
                        {" "}
                        {item.book_info.category.map((it) => (
                          <span>{it} / </span>
                        ))}{" "}
                      </a>
                      <em> | </em>
                      {item.book_info.publisher}
                      <em> | </em>
                      {item.book_info.author}
                      <em> | </em>
                      <span className="price">12,000원</span>
                      <em> | </em>
                      391회 다운로드
                    </dd>
                    <dd style={BookTag}>
                      <span className="hashtag_title">Tag </span>
                      <span className="hashtag">
                        {item.book_info.hashtag.map((it) => (
                          <span>{it}</span>
                        ))}{" "}
                      </span>
                    </dd>
                  </dl>
                </div>
              </StyledLi>
            );
          })}
        </StyledUl>
      </StyledDiv>
    );
  }
}

export default CategoryBookList;

const BookTag = {
  fontSize: "10px"
}