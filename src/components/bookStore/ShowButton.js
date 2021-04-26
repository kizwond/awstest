import React, { Component } from "react";

class ShowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    if(this.props.visiblie){
      const tmp = this.props.visiblie.find((item)=>item.comment_id === this.props.comment_id)
     console.log(tmp)
     if(tmp){
      var visiblie = tmp.visiblie
     }
     
    }
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
          <button style={{ display: "block" }} onClick={()=>this.props.changeVisivility(this.props.comment_id, visiblie)}>
            댓글보기
          </button>
        </div>
        <div style={{ display: visiblie ? "block" : "none", borderTop: "1px solid #c4d1de" }}>{this.props.comments}</div>
      </>
    );
  }
}

export default ShowButton;
