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
            ????????????
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
                ????????????
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
              <div>??? ?????? : {this.state.title} </div>
              <div>?????? : {this.state.author} </div>
              <div>????????? : {this.state.publisher}</div>
              <div>?????? : {this.state.price}</div>
              <div>
                ???????????? :{" "}
                {this.state.category.map((item) => (
                  <span>{item} </span>
                ))}
              </div>
              <div>???????????? : {this.state.hashtag}</div>
            </div>
          </div>

          <div
            style={
              {
                // background: "#1CCDFF",
              }
            }
          >
            ??? ?????? : {this.state.intro_book}
            <br /> ????????????
          </div>

          <div
            style={
              {
                // background: "#32F4FF",
              }
            }
          >
            ???????????? : {this.state.intro_author}
          </div>

          <div
            style={{
              // background: "#20D9DD",
              display: "flex",
            }}
          >
            ?????? : {this.state.indexes}
          </div>
          <div
            style={{
              // background: "#FADF63",
              display: "flex",
            }}
          >
            ??????
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
            ????????????
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
                ????????????
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
                ?????? :
                <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title} />
              </div>
              <div>
                ?????? :
                <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
              </div>
              <div>
                ????????? :
                <input type="text" name="publisher" value={this.state.publisher} onChange={this.handleInputChange} />
              </div>
              <div>
                ?????? :
                <input type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
              </div>
              <div>
                ????????????
                {/* ???????????? ?????? ???????????? ?????? ?????? ?????? ??????????????? */}
                <Category categoryState={this.categoryState} hashtag={this.hashTagState} />
              </div>
              <div>???????????? : {this.state.hashtag}</div>
            </div>
          </div>

          <div
            style={{
              background: "#1CCDFF",
              display: "flex",
            }}
          >
            ??? ?????? :
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
            ???????????? : {this.state.intro_author}
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
            ?????? : {this.state.indexes}
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
            ??????
          </div>
        </div>
      );
    }

    return <>{contents} </>;
  }
}

export default BookDetail;
