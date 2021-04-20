import React, { Component } from "react";
import Category from "./Category";
import InputTag from "./InputTag";
import axios from "axios";

class BookDetail extends Component {
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
    this.changeMode = this.changeMode.bind(this);
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

  changeMode() {
    this.setState({ inModification: !this.state.inModification });
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
    const inModification = this.state.inModification;

    let contents = null;

    if (inModification) {
      contents = (
        <div
          style={{
            fontSize: "12px",
          }}
        >
          <button onClick={this.changeMode} style={{ width: "5rem", height: "2rem", fontSize: "12px" }}>
            수정하기
          </button>
          <div
            style={{
              // background: "yellowgreen",
              display: "flex",
              margin: "0 auto",
            }}
          >
            <div
              style={
                {
                  // backgroundColor: "blue",
                }
              }
            >
              <img
                width="400"
                height="600"
                src={this.state.bookcover_medium}
                alt="Thumbnail"
                style={{
                  borderRadius: "8px",
                }}
              ></img>
              <button
                style={{
                  display: "block",
                  margin: "5px auto",
                  height: "30px",
                  fontSize: "12px",
                }}
              >
                미리보기
              </button>
            </div>
            <div
              style={{
                flex: "1",
                // background: "yellow",
                paddingLeft: "1rem",
                marginRight: "2rem",
              }}
            >
              <div>책 이름 : {this.state.title} </div>
              <div>저자 : {this.state.author} </div>
              <div>출판사 : {this.state.publisher}</div>
              <div>금액 : {this.state.price}</div>
              <div>
                카테고리 :{" "}
                {this.state.category.map((item) => (
                  <span>{item} </span>
                ))}
              </div>
              <div>해쉬태그 : {this.state.hashtag}</div>
            </div>
          </div>

          <div
            style={
              {
                // background: "#1CCDFF",
              }
            }
          >
            책 소개 : {this.state.intro_book}
            <br /> 펼쳐보기
          </div>

          <div
            style={
              {
                // background: "#32F4FF",
              }
            }
          >
            저자소개 : {this.state.intro_author}
          </div>

          <div
            style={{
              // background: "#20D9DD",
              display: "flex",
            }}
          >
            목차 : {this.state.indexes}
          </div>
          <div
            style={{
              // background: "#FADF63",
              display: "flex",
            }}
          >
            리뷰
          </div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
          <div>dk</div>
        </div>
      );
    } else {
      contents = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={this.changeMode} style={{ width: "5rem", height: "2rem" }}>
            저장하기
          </button>
          <div
            style={{
              width: 1200,
              background: "yellowgreen",
              display: "flex",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "yellow",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "blue",
              }}
            >
              <img
                width="500"
                height="700"
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
                  width: "40%",
                  height: "30px",
                  fontSize: "1rem",
                }}
              >
                미리보기
              </button>
            </div>
            <div
              style={{
                flex: "1",
                background: "green",
                fontSize: "2rem",
                paddingLeft: "1rem",
              }}
            >
              <div>
                제목 :
                <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title} />
              </div>
              <div>
                저자 :
                <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
              </div>
              <div>
                출판사 :
                <input type="text" name="publisher" value={this.state.publisher} onChange={this.handleInputChange} />
              </div>
              <div>
                금액 :
                <input type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
              </div>
              <div>
                카테고리
                {/* 편집할대 기존 카테고리 정보 표시 방법 연구해야함 */}
                <Category categoryState={this.categoryState} hashtag={this.hashTagState} />
              </div>
              <div>해쉬태그 : {this.state.hashtag}</div>
            </div>
          </div>

          <div
            style={{
              background: "#1CCDFF",
              display: "flex",
            }}
          >
            책 소개 :
            <input type="text" name="intro_book" value={this.state.intro_book} onChange={this.handleInputChange} />
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
            저자소개 : {this.state.intro_author}
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
            목차 : {this.state.indexes}
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

    return <>{contents} </>;
  }
}

export default BookDetail;
