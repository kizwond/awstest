/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TocSider from "../TocSider";

class FavoriteCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryVisible: false,
    };
    this.showCategory = this.showCategory.bind(this);
  }

  showCategory = () => {
    this.setState({ isCategoryVisible: !this.state.isCategoryVisible });
  };
  render() {
    return (
      <>
        <TocSider visible={this.state.isCategoryVisible} />
        <div
          className="GnbSub"
          css={css`
            border-bottom: 1px solid #e6e8eb;
          `}
        >
          <div
            className="Categorytop"
            css={css`
              max-width: 1000px;
              margin: 0 auto;
            `}
          >
            <ul
              className="CategoryTopWrapper"
              css={css`
                display: flex;
                flex-direction: row;
                height: 48px;
                align-items: center;
              `}
            >
              <li
                className="CategoryTopItemWrapper"
                css={css`
                  height: 100%;
                  color: #404740;
                  cursor: pinter;
                `}
              >
                <span
                  css={css`
                    display: flex;
                    padding: 0 20px;
                    align-items: center;
                    font-weight: bolder;
                    line-height: 48px;
                    height: 100%;
                    width: 100%;
                    cursor: pointer;
                  `}
                  onClick={this.showCategory}
                >
                  <img
                    src="category_black_24dp.svg"
                    alt="카테고리"
                    css={css`
                      width: 22px;
                      height: 22px;
                      opacity: 0.7;
                    `}
                  />
                </span>
              </li>
              <li
                className="CategoryTopItemWrapper"
                css={css`
                  height: 100%;
                  margin-right: 10px;
                  text-align: center;
                  color: #404740;
                  cursor: pointer;
                `}
              >
                <Link
                  to="/"
                  css={css`
                    display: inline-block;
                    padding: 0 22px;
                    font-size: 16px;
                    font-weight: bolder;
                    line-height: 48px;
                    height: 100%;
                    width: 100%;
                  `}
                >
                  <span>영단어</span>
                </Link>
              </li>
              <li
                className="CategoryTopItemWrapper"
                css={css`
                  height: 100%;
                  margin-right: 10px;
                  text-align: center;
                  color: #404740;
                  cursor: pinter;
                `}
              >
                <Link
                  to="/"
                  css={css`
                    display: inline-block;
                    padding: 0 22px;
                    font-size: 16px;
                    font-weight: bolder;
                    line-height: 48px;
                    height: 100%;
                    width: 100%;
                  `}
                >
                  <span>과학</span>
                </Link>
              </li>
              <li
                className="CategoryTopItemWrapper"
                css={css`
                  height: 100%;
                  margin-right: 10px;
                  text-align: center;
                  color: #404740;
                  cursor: pinter;
                `}
              >
                <Link
                  to="/"
                  css={css`
                    display: inline-block;
                    padding: 0 22px;
                    font-size: 16px;
                    font-weight: bolder;
                    line-height: 48px;
                    height: 100%;
                    width: 100%;
                  `}
                >
                  <span>인문</span>
                </Link>
              </li>
              <li
                className="CategoryTopItemWrapper"
                css={css`
                  height: 100%;
                  margin-right: 10px;
                  text-align: center;
                  color: #404740;
                  cursor: pinter;
                `}
              >
                <Link
                  to="/"
                  css={css`
                    display: inline-block;
                    padding: 0 22px;
                    font-size: 16px;
                    font-weight: bolder;
                    line-height: 48px;
                    height: 100%;
                    width: 100%;
                  `}
                >
                  <span>회화</span>
                </Link>
              </li>
              <li
                className="CategoryTopItemWrapper"
                css={css`
                  height: 100%;
                  margin-right: 10px;
                  text-align: center;
                  color: #404740;
                  cursor: pinter;
                `}
              >
                <Link
                  to="/"
                  css={css`
                    display: inline-block;
                    padding: 0 22px;
                    font-size: 16px;
                    font-weight: bolder;
                    line-height: 48px;
                    height: 100%;
                    width: 100%;
                  `}
                >
                  <span>전문가</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default FavoriteCategory;
