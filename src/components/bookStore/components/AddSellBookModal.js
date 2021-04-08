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

      sell_book_list: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleCancel = (event) => {
    this.setState({
      isModalVisible: false,
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
      thumbnail: this.state.img_url,
      intro_book: this.state.intro_book,
      intro_author: this.state.intro_author,
      indexes: this.state.indexes,
      price: +this.state.price,

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

    // const book_info = new FormData();

    // let book_info2 = JSON.stringify(book_info1);
    // book_info.append("book_info", book_info2);
    // book_info.append("book_cover", this.state.thumbnail);
    // console.log(book_info);

    // // FormData의 key 확인
    // for (let key of book_info.keys()) {
    //   console.log(key);
    // }

    // // book_info의 value 확인
    // for (let value of book_info.values()) {
    //   console.log(value);
    // }

    axios
      .post("api/bookstore/create-sellbook", { book_info: book_info })
      .then((res) => {
        console.log(res.data);
        this.setState({
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
          img_url: "",
          prev_thumbnail: "",
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
    formData.append("prev_thumbnail", this.state.prev_thumbnail);

    axios.post("api/bookstore/upload-thumbnail", formData).then((res) => {
      console.log(res);
      this.setState({
        img_url: res.data.url,
        prev_thumbnail: res.data.url,
        thumbnail: null,
      });
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
        <Button
          style={{ marginLeft: "220px" }}
          type="primary"
          onClick={this.showModal}
        >
          새 책 추가
        </Button>
        <Modal
          title="새 책 추가"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="새 책 만들기"
          cancelText="취소"
          afterClose={this.resetCheckbox}
        >
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
            <Category
              categoryState={this.categoryState}
              hashtag={this.hashTagState}
            />
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
          {this.state.img_url && (
            <>
              <img
                src={`${this.state.img_url}`}
                alt="thumbnail"
                width="150px"
                style={{ marginTop: "10px" }}
              />
            </>
          )}
          <label style={{ display: "block", marginTop: "15px" }}>
            책 소개
            <input
              type="text"
              name="intro_book"
              value={this.state.intro_book}
              onChange={this.handleInputChange}
              style={{
                position: "absolute",
                left: "120px",
                border: "1px solid gray",
              }}
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
