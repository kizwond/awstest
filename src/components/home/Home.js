import axios from "axios";
import React, { Component } from "react";

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//          }
//     }
//     componentDidMount() {
//         axios.get('api/user/user-auth')
//         .then(res => {
//           this.props.updatedLoginState(res.data.isLoggedIn)
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       }

//     render() {
//         if(this.props.isLoggedIn === true){
//             var loggedin = "로그인상태입니다"
//         } else {
//             loggedin = "로그아웃상태입니다."
//         }
//         return (
//             <div style={{width:"1440px", margin:"auto",marginTop:"10px"}} >HomePage {loggedin} </div>
//           );
//     }
// }

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const level1 = comments.map((comment) => {
     

      if (comment.children.length > 0) {
        // 임시 칠드런을 만들어 놓고
        let tmp_children = comment.children.slice();

        // 해당 children의 최대 level 구하기
        let levels = tmp_children.map((comment) => comment.level);
        let max_level = Math.max(...levels);

        // 일단 2레벨부터 깔아놓자.
        comment.children = tmp_children.filter((child) => child.level == 2);

        // 3레벨 이상이 있는 경우, 레벨 하나씩 뿌려준다.
        if (max_level >= 3) {
          for (var level = 3; level <= max_level; level++) {
            for (var i = tmp_children.length - 1; i >= 0; i--) {
              let position = comment.children.findIndex((original) => tmp_children[i].parent_id == original._id && tmp_children[i].level == level);
              // console.log('position',level, j, position)
              if (position >= 0) {
                comment.children.splice(position + 1, 0, tmp_children[i]);
              }
            }
          }
        }
      }

      const levelArray = comment.children;

      const comments = levelArray.map((child) => {
        return (
          <div key={child._id} style={{ marginLeft: `${child.level * 10}px`, marginTop: "5px" }}>
            <span style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ width: "150px" }}>
                레벨 {child.level} / 나 {child._id} / 부모 {child.parent_id}
              </span>
              <span style={{ width: "100px" }}>작성자 : {child.user_id}</span>
              <span style={{ width: "200px" }}>내용 : {child.content}</span>
              <span> 날짜 : {child.time_created.slice(0, 25)}</span>
            </span>
          </div>
        );
      });

      return (
        <div key={comment._id}>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ width: "150px" }}>
              레벨 {comment.level} / 나 {comment._id} / 부모 {comment.parent_id}
            </span>
            <span style={{ width: "100px" }}>작성자 : {comment.user_id}</span>
            <span style={{ width: "200px" }}>내용 : {comment.content}</span>
            <span> 날짜 : {comment.time_created.slice(0, 25)}</span>
          </span>
          {comments}
        </div>
      );
    });
    console.log(level1);
    return (
      <>
        <div style={{ margin: "auto", width: "1000px", marginTop: "50px" }}>comment</div>
        <div style={{ margin: "auto", width: "1000px", height: "500px", marginTop: "50px" }}>{level1}</div>
      </>
    );
  }
}

export default Home;

const comments = [
  {
    _id: "123",
    user_id: "jukka",
    book_id: "abcdefghijklmn",
    root_id: null,
    parent_id: null,
    level: 1,
    isDeleted: "no",
    time_created: "Wed Apr 14 2021 14:37:58 GMT+0900 (대한민국 표준시)",
    rating: 1,
    content: "재밌네요",
    children: [
      {
        _id: "124",
        user_id: "aaa",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:38:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말",
      },
      {
        _id: "125",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:39:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "동감입니다.",
      },
      {
        _id: "128",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "124",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:40:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말 아닌데",
      },
      {
        _id: "129",
        user_id: "jukka",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "124",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:41:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말 아닌데2",
      },
      {
        _id: "131",
        user_id: "kizwond",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "124",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:42:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "그짓말 아닌데3!!!!!!!!!!!!!!!!!!!!!",
      },
      {
        _id: "130",
        user_id: "sangil",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "123",
        level: 2,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:41:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "참신하네요",
      },
      {
        _id: "134",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "128",
        level: 4,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:42:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "주작 냄새가...",
      },
      {
        _id: "170",
        user_id: "eon",
        book_id: "abcdefghijklmn",
        root_id: "123",
        parent_id: "125",
        level: 3,
        isDeleted: "no",
        time_created: "Wed Apr 14 2021 14:43:58 GMT+0900 (대한민국 표준시)",
        rating: null,
        content: "취향이 독특하시네요",
      },
    ],
  },
];
