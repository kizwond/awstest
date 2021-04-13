import React, { Component } from "react";
import { Card } from "antd";

const { Meta } = Card;

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  move = (event) => {
    console.log("clicked");
    console.log(this.props.book_id);
    sessionStorage.setItem("book_id", this.props.book_id);
    window.location.href = "/detail-book";
  };
  render() {
    const title = this.props.title;
    const description = this.props.description;
    const pic = this.props.pic;
    const price = this.props.price;
    return (
      <>
        <Card
          onClick={this.move}
          hoverable
          bodyStyle={{ padding: 4 }}
          headStyle={{ backgorund: "blue" }}
          style={{ width: 230, height: 290, marginTop: 15 }}
          cover={<img alt="example" src={pic} style={{ height: 220 }} />}
        >
          <div
            style={{
              position: "absolute",
              display: "block",
              top: "-14px",
              left: "100px",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "34PX",
                border: "1px solid rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1477c9",
                position: "relative",
                color: "white",
                zIndex: 2,
                boxSizing: "border-box",
              }}
            >
              {price}
            </div>
          </div>
          <Meta title={title} description={description} />
        </Card>
      </>
    );
  }
}

export default MyCard;
