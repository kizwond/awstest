import React, { Component } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import Category from "../Category";

class AddSellBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      title: "",
      category: [],
      hashtag: [],
      author: "",
      publisher: "",
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

      thumbnail: null,
      book_cover_url_original: "",
      book_cover_url_small: "",
      book_cover_url_medium: "",
      book_cover_url_large: "",
      prev_book_cover_url_original: null,

      sell_book_list: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  // 이미지 업로드 후, ok버튼을 안누르고 모달창을 종료할 경우
  // 예를들어 뒤로가기||취소버튼||x버튼 등을 누르면
  // 서버에서 이미지를 삭제할수 있도록 저장된 이미지 url를 서버에 다시 보내줘야한다.
  // 아직 그 작업 안됨

  handleCancel = (event) => {
    this.setState({
      isModalVisible: false,

      title: "",
      category: [],
      hashtag: [],
      author: "",
      publisher: "",
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

      thumbnail: null,
      book_cover_url_original: "",
      book_cover_url_small: "",
      book_cover_url_medium: "",
      book_cover_url_large: "",
      prev_book_cover_url_original: null,
    });
  };

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

  handleOk = (event) => {
    this.setState({ isModalVisible: false });

    const book_info = {
      title: this.state.title,
      category: this.state.category,
      hashtag: this.state.hashtag,
      author: this.state.author,
      publisher: this.state.publisher,
      intro_book: this.state.intro_book,
      intro_author: this.state.intro_author,
      indexes: this.state.indexes,
      price: +this.state.price,
      bookcover: {
        url_original: this.state.book_cover_url_original,
        url_small: this.state.book_cover_url_small,
        url_medium: this.state.book_cover_url_medium,
        url_large: this.state.book_cover_url_large,
      },
      prev_book_cover_url: this.state.prev_book_cover_url_original,
      promotion: {
        name: this.state.promotion_name,
        gap: String(this.state.gap),
        promotion_price: this.state.promotion_price,
        period: {
          from: this.state.promotion_period_from,
          to: this.state.promotion_period_to,
        },
      },
      original_book_id: "",
    };

    axios.post("api/bookstore/create-sellbook", { book_info: book_info }).then((res) => {
      console.log(res.data);
      this.setState({
        title: "",
        category: [],
        hashtag: [],
        author: "",
        publisher: "",
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
        thumbnail: null,
        book_cover_url_original: "",
        book_cover_url_small: "",
        book_cover_url_medium: "",
        book_cover_url_large: "",
        prev_book_cover_url_original: null,
      });
      this.resetCheckbox();
    });

    event.preventDefault();
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleImageInput(e) {
    this.setState({
      thumbnail: e.target.files[0],
    });
  }
  uploadImgHandler = () => {
    const formData = new FormData();
    formData.append("file", this.state.thumbnail);
    formData.append("prev_book_cover", this.state.prev_book_cover_url_original);

    axios.post("api/bookstore/upload-thumbnail", formData).then((res) => {
      this.setState({
        book_cover_url_original: res.data.url_original,
        book_cover_url_small: res.data.url_small,
        book_cover_url_medium: res.data.url_medium,
        book_cover_url_large: res.data.url_large,
        prev_book_cover_url_original: res.data.url_original,
        thumbnail: null,
      });
      console.log(this.state.book_cover_url_small);
    });
  };
  resetCheckbox() {
    const chkbox = document.querySelectorAll('input[name="category"]');

    for (let i = 0; i < chkbox.length; ++i) {
      chkbox[i].checked = false;
    }

    const hstags = document.querySelectorAll('li[name="hashtag"]');

    for (let i = 0; i < hstags.length; ++i) {
      hstags[i].value = false;
    }
  }

  render() {
    return (
      <div style={{ fontSize: "12px" }}>
        <Button style={{ marginLeft: "220px" }} type="primary" onClick={this.showModal}>
          새 책 추가
        </Button>
        <Modal title="새 책 추가" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} okText="새 책 만들기" cancelText="취소" afterClose={this.resetCheckbox}>
          <label style={{ display: "block", marginTop: "15px" }}>
            제목
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            카테고리
            <Category categoryState={this.categoryState} hashtag={this.hashTagState} />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            저자
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            출판사
            <input
              type="text"
              name="publisher"
              value={this.state.publisher}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            표지 올리기
            <input
              type="file"
              name="file"
              onChange={(e) => this.handleImageInput(e)}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>
          <button onClick={this.uploadImgHandler}>업로드이미지</button>
          {this.state.book_cover_url_small && (
            <>
              <img src={`${this.state.book_cover_url_small}`} alt="img" width="150px" style={{ marginTop: "10px" }} />
            </>
          )}
          <label style={{ display: "block", marginTop: "15px" }}>
            책 소개
            <textarea
              // type="textarea"
              name="intro_book"
              rows="5"
              cols="33"
              value={this.state.intro_book}
              onChange={this.handleInputChange}
              style={
                {
                  // position: "absolute",
                  // left: "120px",
                  // border: "1px solid gray",
                }
              }
            />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            저자 소개
            <input
              type="text"
              name="intro_author"
              value={this.state.intro_author}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            목차
            <input
              type="text"
              name="indexes"
              value={this.state.indexes}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>
          <label style={{ display: "block", marginTop: "15px" }}>
            정가
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "15px" }}>
            프로모션 이름
            <input
              type="text"
              name="promotion_name"
              value={this.state.promotion_name}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "15px" }}>
            차감액
            <input
              type="number"
              name="promotion_gap"
              value={this.state.promotion_gap}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "15px" }}>
            할인가
            <input
              type="number"
              name="promotion_price"
              value={this.state.promotion_price}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "15px" }}>
            프로모션 기간
            <span
              style={{
                position: "absolute",
                left: "120px",
              }}
            >
              <input
                type="date"
                name="promotion_period_from"
                value={this.state.promotion_period_from}
                onChange={this.handleInputChange}
                style={{
                  marginRight: "10px",
                }}
              />
              {" ~ "}
              <input
                type="date"
                name="promotion_period_to"
                value={this.state.promotion_period_to}
                onChange={this.handleInputChange}
                style={{
                  marginLeft: "10px",
                }}
              />
            </span>
          </label>
        </Modal>
      </div>
    );
  }
}

export default AddSellBookModal;
