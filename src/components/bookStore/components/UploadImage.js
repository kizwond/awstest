import React, { Component } from "react";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={null} />
        <button type="button" onClick={null} />
      </div>
    );
  }
}

export default UploadImage;
