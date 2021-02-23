import React, { Component } from 'react';
import { Table, Badge, Menu, Dropdown, Space} from 'antd';

class SelectedIndexCardCount extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {    
        const columns = [
            {
              title: '목차',
              key : 'key',
              dataIndex: 'indexSelected',
              align :'center',
            },
            {
              title: '학습완료울',
              key : 'key',
              dataIndex: 'completedRatio',
              align :'center',
            },
            {
              title: '전체카드',
              key : 'key',
              dataIndex: 'total',
              align :'center',
              render: (text,key) => {
                if(key.key === "1"){
                  return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                } else {
                  return <span>{text}</span>
                }
              }
            },
            {
                title: '미학습카드',
                key : 'key',
                dataIndex: 'yet',
                align :'center',
                render: (text,key) => {
                  if(key.key === "1"){
                    return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                  } else {
                    return <span>{text}</span>
                  }
                }
              },
              {
                title: '학습중카드',
                key : 'key',
                align :'center',
                children: [
                    {
                      title: '전체학습중카드',
                      key : 'key',
                      dataIndex: 'ingTotal',
                      align :'center',
                      render: (text,key) => {
                        if(key.key === "1"){
                          return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                        } else {
                          return <span>{text}</span>
                        }
                      }
                    },
                    {
                        title: '금일이전 복습필요*',
                        key : 'key',
                        dataIndex: 'ingByToday',
                        align :'center',
                        render: (text,key) => {
                          if(key.key === "1"){
                            return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}({key.ingByNow})</span>
                          } else {
                            return <span>{text}({key.ingByNow})</span>
                          }
                        }
                        
                    },
                    {
                        title: '내일이후 복습필요',
                        key : 'key',
                        dataIndex: 'ingAfterTomorrow',
                        align :'center',
                        render: (text,key) => {
                          if(key.key === "1"){
                            return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                          } else {
                            return <span>{text}</span>
                          }
                        }
                    },
                ]
              },
              {
                title: '학습완료카드',
                key : 'key',
                dataIndex: 'completed',
                align :'center',
                render: (text,key) => {
                  if(key.key === "1"){
                    return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                  } else {
                    return <span>{text}</span>
                  }
                }
              },
              {
                title: '복습보류카드',
                key : 'key',
                dataIndex: 'suspend',
                align :'center',
                render: (text,key) => {
                  if(key.key === "1"){
                    return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                  } else {
                    return <span>{text}</span>
                  }
                }
              },
          ];

        const flip_card_num_total =[]
        const flip_card_num_yet =[]
        const flip_card_num_ing_after_tomorrow =[]
        const flip_card_num_ing_not_studying =[]
        const flip_card_num_ing_total =[]
        const flip_card_num_ing_until_now =[]
        const flip_card_num_ing_until_today =[]
        const flip_card_num_hold =[]
        const flip_card_num_completed =[]

        const read_card_num_total =[]
        const read_card_num_yet =[]
        const read_card_num_ing_after_tomorrow =[]
        const read_card_num_ing_not_studying =[]
        const read_card_num_ing_total =[]
        const read_card_num_ing_until_now =[]
        const read_card_num_ing_until_today =[]
        const read_card_num_hold =[]
        const read_card_num_completed =[]

        const hold_card_num_total =[]
        const completed_card_num_total =[]

        
        
        
        if(this.props.checkedIndex){
          console.log(this.props.checkedIndex)
          var selectedIndex_length =this.props.checkedIndex.length
          console.log('this.props.book_list : ', this.props.books)
          this.props.checkedIndex.map(selectedIndex => {
            this.props.books.map(book =>{
              console.log(book.index_info)
              book.index_info.map(index=>{
                console.log(index)
                if(index._id === selectedIndex ){
                  flip_card_num_total.push(index.num_cards.flip.total)
                  flip_card_num_yet.push(index.num_cards.flip.yet)
                  flip_card_num_ing_after_tomorrow.push(index.num_cards.flip.ing.after_tomorrow)
                  flip_card_num_ing_not_studying.push(index.num_cards.flip.ing.not_studying)
                  flip_card_num_ing_total.push(index.num_cards.flip.ing.total)
                  flip_card_num_ing_until_now.push(index.num_cards.flip.ing.until_now)
                  flip_card_num_ing_until_today.push(index.num_cards.flip.ing.until_today)
                  flip_card_num_hold.push(index.num_cards.flip.hold)
                  flip_card_num_completed.push(index.num_cards.flip.completed)

                  read_card_num_total.push(index.num_cards.read.total)
                  read_card_num_yet.push(index.num_cards.read.yet)
                  read_card_num_ing_after_tomorrow.push(index.num_cards.read.ing.after_tomorrow)
                  read_card_num_ing_not_studying.push(index.num_cards.read.ing.not_studying)
                  read_card_num_ing_total.push(index.num_cards.read.ing.total)
                  read_card_num_ing_until_now.push(index.num_cards.read.ing.until_now)
                  read_card_num_ing_until_today.push(index.num_cards.read.ing.until_today)
                  read_card_num_hold.push(index.num_cards.read.hold)
                  read_card_num_completed.push(index.num_cards.read.completed)

                  hold_card_num_total.push(index.num_cards.total.hold)
                  completed_card_num_total.push(index.num_cards.total.completed)
                }
              })
            })
          })
        }

          const flip_card_num_total_sum = flip_card_num_total.reduce((a, b) => a + b, 0)
          const flip_card_num_yet_sum = flip_card_num_yet.reduce((a, b) => a + b, 0)
          const flip_card_num_ing_after_tomorrow_sum = flip_card_num_ing_after_tomorrow.reduce((a, b) => a + b, 0)
          const flip_card_num_ing_not_studying_sum = flip_card_num_ing_not_studying.reduce((a, b) => a + b, 0)
          const flip_card_num_ing_total_sum = flip_card_num_ing_total.reduce((a, b) => a + b, 0)
          const flip_card_num_ing_until_now_sum = flip_card_num_ing_until_now.reduce((a, b) => a + b, 0)
          const flip_card_num_ing_until_today_sum = flip_card_num_ing_until_today.reduce((a, b) => a + b, 0)
          const flip_card_num_hold_sum = flip_card_num_hold.reduce((a, b) => a + b, 0)
          const flip_card_num_completed_sum = flip_card_num_completed.reduce((a, b) => a + b, 0)

          const read_card_num_total_sum = read_card_num_total.reduce((a, b) => a + b, 0)
          const read_card_num_yet_sum = read_card_num_yet.reduce((a, b) => a + b, 0)
          const read_card_num_ing_after_tomorrow_sum = read_card_num_ing_after_tomorrow.reduce((a, b) => a + b, 0)
          const read_card_num_ing_not_studying_sum = read_card_num_ing_not_studying.reduce((a, b) => a + b, 0)
          const read_card_num_ing_total_sum = read_card_num_ing_total.reduce((a, b) => a + b, 0)
          const read_card_num_ing_until_now_sum = read_card_num_ing_until_now.reduce((a, b) => a + b, 0)
          const read_card_num_ing_until_today_sum = read_card_num_ing_until_today.reduce((a, b) => a + b, 0)
          const read_card_num_hold_sum = read_card_num_hold.reduce((a, b) => a + b, 0)
          const read_card_num_completed_sum = read_card_num_completed.reduce((a, b) => a + b, 0)

          const hold_card_num_total_sum = hold_card_num_total.reduce((a, b) => a + b, 0)
          const completed_card_num_total_sum = completed_card_num_total.reduce((a, b) => a + b, 0)

          const data = [
            {
              key: '1',
              indexSelected:`전체책 선택결과 : ${selectedIndex_length}개의 목차가 선택됨`,
              completedRatio: '31%',
              total:flip_card_num_total_sum+read_card_num_total_sum,
              yet:flip_card_num_yet_sum+read_card_num_yet_sum,
              ingTotal:flip_card_num_ing_total_sum+read_card_num_ing_total_sum,
              ingByNow:flip_card_num_ing_until_now_sum+read_card_num_ing_until_now_sum,
              ingByToday:flip_card_num_ing_until_today_sum+read_card_num_ing_until_today_sum+flip_card_num_ing_until_now_sum+read_card_num_ing_until_now_sum,
              ingAfterTomorrow:flip_card_num_ing_after_tomorrow_sum+read_card_num_ing_after_tomorrow_sum,
              completed:hold_card_num_total_sum,
              suspend:completed_card_num_total_sum,
              children: [
                {
                  key: '2',
                  indexSelected:"읽기카드",
                  completedRatio: '31%',
                  total:read_card_num_total_sum,
                  yet:read_card_num_yet_sum,
                  ingTotal:read_card_num_ing_total_sum,
                  ingByNow:read_card_num_ing_until_now_sum,
                  ingByToday:read_card_num_ing_until_today_sum+read_card_num_ing_until_now_sum,
                  ingAfterTomorrow:read_card_num_ing_after_tomorrow_sum,
                  completed:read_card_num_completed_sum,
                  suspend:read_card_num_hold_sum,
                },
                {
                  key: '3',
                  indexSelected:"뒤집기카드",
                  completedRatio: '31%',
                  total:flip_card_num_total_sum,
                  yet:flip_card_num_yet_sum,
                  ingTotal:flip_card_num_ing_total_sum,
                  ingByNow:flip_card_num_ing_until_now_sum,
                  ingByToday:flip_card_num_ing_until_today_sum+flip_card_num_ing_until_now_sum,
                  ingAfterTomorrow:flip_card_num_ing_after_tomorrow_sum,
                  completed:flip_card_num_completed_sum,
                  suspend:flip_card_num_hold_sum,
                },
              ]
            },
          ]







      return (
        <Table columns={columns} 
                pagination={false} 
                dataSource={data} 
                size='small'
                className="choose_index_top_table"
                bordered
                // expandable={{ expandedRowRender }}
                />
      );
  }
}

export default SelectedIndexCardCount;






// const expandedRowRender = () => {
//   const columns = [
//     { title: '목차', dataIndex: 'indexSelected', key: 'date' },
//     { title: '학습완료율', dataIndex: 'completedRatio', key: 'name' },
//     { title: '전체카드', dataIndex: 'total', key: 'name' },
//     { title: '미학습카드', dataIndex: 'yet', key: 'name' },
//     { title: '전체학습중카드', dataIndex: 'ingTotal', key: 'name' },
//     { title: '금일이전 복습필요', dataIndex: 'ingByToday', key: 'name' },
//     { title: '금일이전 복습필요', dataIndex: 'ingAfterTomorrow', key: 'name' },
//     { title: '학습완료카드', dataIndex: 'completed', key: 'name' },
//     { title: '복습보류카드', dataIndex: 'suspend', key: 'name' },
//   ];

//   const data = [
//     {
//       key: '1',
//       indexSelected:'------------>읽기카드',
//       completedRatio: '31%',
//       total:flip_card_num_total_sum+read_card_num_total_sum,
//       yet:flip_card_num_yet_sum+read_card_num_yet_sum,
//       ingTotal:flip_card_num_ing_total_sum+read_card_num_ing_total_sum,
//       ingByNow:flip_card_num_ing_until_now_sum+read_card_num_ing_until_now_sum,
//       ingByToday:flip_card_num_ing_until_today_sum+read_card_num_ing_until_today_sum+flip_card_num_ing_until_now_sum+read_card_num_ing_until_now_sum,
//       ingAfterTomorrow:flip_card_num_ing_after_tomorrow_sum+read_card_num_ing_after_tomorrow_sum,
//       completed:hold_card_num_total_sum,
//       suspend:completed_card_num_total_sum,
//     },
//   ]


//   const flip_card_num_total =[]
//   const flip_card_num_yet =[]
//   const flip_card_num_ing_after_tomorrow =[]
//   const flip_card_num_ing_not_studying =[]
//   const flip_card_num_ing_total =[]
//   const flip_card_num_ing_until_now =[]
//   const flip_card_num_ing_until_today =[]

//   const read_card_num_total =[]
//   const read_card_num_yet =[]
//   const read_card_num_ing_after_tomorrow =[]
//   const read_card_num_ing_not_studying =[]
//   const read_card_num_ing_total =[]
//   const read_card_num_ing_until_now =[]
//   const read_card_num_ing_until_today =[]

//   const selectedIndex_session = JSON.parse(sessionStorage.getItem("selectedIndex"))
//   console.log(selectedIndex_session)
//   if(selectedIndex_session){
//     console.log('this.props.book_list : ', this.props.books)
//     selectedIndex_session.map(selectedIndex => {
//       this.props.books.map(book =>{
//         console.log(book.index_info)
//         book.index_info.map(index=>{
//           console.log(index)
//           if(index._id === selectedIndex ){
//             flip_card_num_total.push(index.num_cards.flip.total)
//             flip_card_num_yet.push(index.num_cards.flip.yet)
//             flip_card_num_ing_after_tomorrow.push(index.num_cards.flip.ing.after_tomorrow)
//             flip_card_num_ing_not_studying.push(index.num_cards.flip.ing.not_studying)
//             flip_card_num_ing_total.push(index.num_cards.flip.ing.total)
//             flip_card_num_ing_until_now.push(index.num_cards.flip.ing.until_now)
//             flip_card_num_ing_until_today.push(index.num_cards.flip.ing.until_today)

//             read_card_num_total.push(index.num_cards.read.total)
//             read_card_num_yet.push(index.num_cards.read.yet)
//             read_card_num_ing_after_tomorrow.push(index.num_cards.read.ing.after_tomorrow)
//             read_card_num_ing_not_studying.push(index.num_cards.read.ing.not_studying)
//             read_card_num_ing_total.push(index.num_cards.read.ing.total)
//             read_card_num_ing_until_now.push(index.num_cards.read.ing.until_now)
//             read_card_num_ing_until_today.push(index.num_cards.read.ing.until_today)
//           }
//         })
//       })
//     })

//     const flip_card_num_total_sum = flip_card_num_total.reduce((a, b) => a + b, 0)
//     const flip_card_num_yet_sum = flip_card_num_yet.reduce((a, b) => a + b, 0)
//     const flip_card_num_ing_after_tomorrow_sum = flip_card_num_ing_after_tomorrow.reduce((a, b) => a + b, 0)
//     const flip_card_num_ing_not_studying_sum = flip_card_num_ing_not_studying.reduce((a, b) => a + b, 0)
//     const flip_card_num_ing_total_sum = flip_card_num_ing_total.reduce((a, b) => a + b, 0)
//     const flip_card_num_ing_until_now_sum = flip_card_num_ing_until_now.reduce((a, b) => a + b, 0)
//     const flip_card_num_ing_until_today_sum = flip_card_num_ing_until_today.reduce((a, b) => a + b, 0)

//     const read_card_num_total_sum = read_card_num_total.reduce((a, b) => a + b, 0)
//     const read_card_num_yet_sum = read_card_num_yet.reduce((a, b) => a + b, 0)
//     const read_card_num_ing_after_tomorrow_sum = read_card_num_ing_after_tomorrow.reduce((a, b) => a + b, 0)
//     const read_card_num_ing_not_studying_sum = read_card_num_ing_not_studying.reduce((a, b) => a + b, 0)
//     const read_card_num_ing_total_sum = read_card_num_ing_total.reduce((a, b) => a + b, 0)
//     const read_card_num_ing_until_now_sum = read_card_num_ing_until_now.reduce((a, b) => a + b, 0)
//     const read_card_num_ing_until_today_sum = read_card_num_ing_until_today.reduce((a, b) => a + b, 0)
              
//   }
//   return <Table indentSize={30} bordered columns={columns} dataSource={data} pagination={false} />;
// };