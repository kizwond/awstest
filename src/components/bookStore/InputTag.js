import React, { Component } from "react";
import "./InputTag.css";

let hashtag = [];

class InputTag extends Component {
  constructor() {
    super();

    this.state = {
      tags: [],
    };
  }

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (
        this.state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase())
      ) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val] });
      hashtag = [...hashtag, val];
      this.tagInput.value = null;

      // 부모 컴포넌트 state 업데이트
      this.props.hashtag(hashtag);
      //
    } else if (e.key === "Backspace" && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  };

  render() {
    const { tags } = this.state;

    return (
      <div
        style={{
          width: "100%",
          background: "orange",
          fontSize: "1rem",
        }}
      >
        <div className="input-tag">
          <ul className="input-tag__tags">
            {tags.map((tag, i) => (
              <li name="hashtag" key={tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    this.removeTag(i);
                  }}
                >
                  +
                </button>
              </li>
            ))}

            <li className="input-tag__tags__input">
              <input
                type="text"
                onKeyDown={this.inputKeyDown}
                placeholder="해쉬태그 입력"
                ref={(c) => {
                  this.tagInput = c;
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default InputTag;
