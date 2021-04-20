import { BlockOutlined } from "@ant-design/icons";
import React, { Component } from "react";

class ShowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblie: false,
    };
  }

  changeVisivility = () => {
    this.setState({ visiblie: !this.state.visiblie });
  };
  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
          <button style={{ display: "block" }} onClick={this.changeVisivility}>
            댓글보기
          </button>
        </div>
        <div style={{ display: this.state.visiblie ? "block" : "none", borderTop: "1px solid #c4d1de" }}>{this.props.comments}</div>
      </>
    );
  }
}

export default ShowButton;
