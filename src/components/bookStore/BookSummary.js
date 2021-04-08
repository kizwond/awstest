import React, { Component } from 'react';

class BookSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="detail_container">
        <ul style={{display:"flex", flexDirection:"column"}}>
          <li style={asdfasdfasdf}>
            <div style={{marginRight:"20px"}}>
              <div style={{width:"90px", height:"100%", border:"1px solid black"}}>
                <img src="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg" alt="book" style={{width:"90px", height:"120px"}}/>
              </div>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
              <div>책제목영역</div>
              <div>별점</div>
              <div>저자이름</div>
              <div>구매정보 가격</div>
              <div>구매버튼</div>
            </div>
          </li>
          <li style={{height:"200px", border:"1px solid lightgrey"}}>출간정보박스</li>
          <li style={{height:"200px", border:"1px solid lightgrey"}}>책소개</li>
          <li style={{height:"200px", border:"1px solid lightgrey"}}>저자소개</li>
          <li style={{height:"200px", border:"1px solid lightgrey"}}>목차</li>
          <li style={{height:"200px", border:"1px solid lightgrey"}}>기타내용</li>
        </ul>

      </div>
      );
  }
}
 
export default BookSummary;
const asdfasdfasdf={

}