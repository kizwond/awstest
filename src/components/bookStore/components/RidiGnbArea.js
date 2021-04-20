/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddSellBookModalForRidi from "./AddSellBookModalForRidi";

class RidiGnbArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="GNBWrapper">
          <header css={header}>
            <div className="GNBContainer" css={gnbContainer}>
              <div className="NavigationWrapper" css={navigationWrapper}>
                <div className="LogoSearchArea" css={logoSearchArea}>
                  <ul className="LogoWrapper" css={logoWrapper}>
                    <li className="LogoItem" css={logoItem}>
                      <Link className="LogoItemLink" to="/">
                        <img css={logoImage} src="logo_white.png" alt="CogBook" />
                      </Link>
                    </li>
                  </ul>
                  <form className="SearchWrapper" css={searchWrapper}>
                    <label className="SearchBoxWrapper" css={searchBoxWrapper}>
                      <img src="round_search_black_18dp.png" alt="검색" css={searchImage} />
                      <input className="SearchBox" type="search" placeholder="제목, 저자, 출판사 검색" css={searchBox} />
                    </label>
                  </form>
                  <ul className="ButtonWrapper" css={gnbButtonWrapper}>
                    <li>
                      {/* <button
                      css={css`
                        height: 30px;
                        color: white;
                        background: #1f8ce6;
                        padding: 0 16px;
                        border: 1px solid #99d1ff;
                      `}
                    >
                      회원가입
                    </button> */}
                      <AddSellBookModalForRidi />
                    </li>
                    <li>
                      <button css={gnbButton}>로그인</button>
                    </li>
                  </ul>
                </div>
              </div>

              <ul className="SubMainGNB" css={subMainGNB}>
                <li className="SubMainGNB-Item-Wrapper-Selected" css={subMainGNBItemWrapper_Selected}>
                  <Link to="/" className="StyledAnchorForSubMainGNB" css={styledAnchorForSubMainGNB}>
                    <img src="home_white_24dp (1).svg" alt="홈" css={subMainGNBItemIcon} />
                    <span className="SubMainGNBItemLabelStyle" css={subMainGNBItemLabelStyle}>
                      홈
                    </span>
                  </Link>
                  <div className="SubMainGNB_Selected" selected css={subMainGNBSelected}></div>
                </li>
                <li className="SubMainGNB-Item-Wrapper" css={subMainGNBItemWrapper}>
                  <Link to="/" className="StyledAnchorForSubMainGNB" css={styledAnchorForSubMainGNB}>
                    <img src="notifications_white_24dp.svg" alt="홈" css={subMainGNBItemIcon} />
                    <span className="SubMainGNBItemLabelStyle" css={subMainGNBItemLabelStyle}>
                      알림
                    </span>
                  </Link>
                  <div className="SubMainGNB_UnSelected" css={subMainGNB_UnSelected}></div>
                </li>
                <li className="SubMainGNB-Item-Wrapper" css={subMainGNBItemWrapper}>
                  <Link to="/" className="StyledAnchorForSubMainGNB" css={styledAnchorForSubMainGNB}>
                    <img src="shopping_cart_white_24dp.svg" alt="홈" css={subMainGNBItemIcon} />
                    <span className="SubMainGNBItemLabelStyle" css={subMainGNBItemLabelStyle}>
                      카트
                    </span>
                  </Link>
                  <div className="SubMainGNB_UnSelected" css={subMainGNB_UnSelected}></div>
                </li>
                <li className="SubMainGNB-Item-Wrapper" css={subMainGNBItemWrapper}>
                  <Link to="/" className="StyledAnchorForSubMainGNB" css={styledAnchorForSubMainGNB}>
                    <img src="person_outline_white_24dp.svg" alt="홈" css={subMainGNBItemIcon} />
                    <span className="SubMainGNBItemLabelStyle" css={subMainGNBItemLabelStyle}>
                      마이콕북
                    </span>
                  </Link>
                  <div className="SubMainGNB_UnSelected" css={subMainGNB_UnSelected}></div>
                </li>
              </ul>
            </div>
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default RidiGnbArea;

const header = css`
  background: #1f8ce6;
  max-width: 100%;
`;

const gnbContainer = css`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const navigationWrapper = css`
  padding: 16px 16px 24px 20px;
`;

const logoSearchArea = css`
  display: flex;
  flex-direction: row;
`;

const logoWrapper = css`
  min-height: 30px;
  display: flex;
  flex: none;
  margin-bottom: 0;
  margin-right: 20px;
`;

const logoItem = css`
  display: flex;
  align-items: center;
  line-height: 0;
`;

const logoImage = css`
  width: 119px;
  height: 36px;
`;

const searchWrapper = css`
  max-width: 340px;
  flex: 1;
`;

const searchBoxWrapper = css`
  display: flex;
  align-items: center;
  border-radius: 3px;
  background-color: white;
`;

const searchImage = css`
  width: 24px;
  height: 24px;
  margin: 0 4px 0 6px;
  opacity: 0.7;
  flex: none;
`;

const searchBox = css`
  flex: 1;
  height: 36px;
  background: none;
  appearance: none;
  box-shadow: none;
  border: none;
  font-size: 16px;
  outline: none;
`;

const gnbButtonWrapper = css`
  flex: 1;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const gnbButton = css`
  height: 30px;
  color: #1f8ce6;
  background: white;
  padding: 0 16px;
  border: 1px solid #99d1ff;
`;

const subMainGNB = css`
  display: flex;
  padding: 0 20px;
`;

const subMainGNBItemWrapper_Selected = css`
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  height: 37px;
  padding-bottom: 0px;
`;

const subMainGNBItemWrapper = css`
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  height: 37px;
  padding-bottom: 4px;
`;

const styledAnchorForSubMainGNB = css`
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 5px 2px 4px;
`;

const subMainGNBItemIcon = css`
  margin-right: 10px;
  width: 22px;
  height: 22px;
`;

const subMainGNBItemLabelStyle = css`
  height: 16px;
  margin-left: 5px;
  text-align: center;
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const subMainGNBSelected = css`
  display: block;
  background: rgb(153, 209, 255);
  height: 5px;
  width: 100%;
  top: 1px;
`;

const subMainGNB_UnSelected = css`
  display: block;
  background: transparent;
  height: 5px;
  width: 100%;
  top: 1px;
`;
