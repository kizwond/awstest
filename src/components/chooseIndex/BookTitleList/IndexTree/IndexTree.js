import React, { Component } from 'react';
import { Tree,Progress } from 'antd';
import { CarryOutOutlined,SearchOutlined } from '@ant-design/icons';
import Button from '../../../styledComponents/defaultButton'
import "./IndexTree.css"

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    if(this.props.level){
      const level = this.props.level
      if(level === 5){
        var ellipsisWidth = "110px"
      } else {
        ellipsisWidth = "100%"
      }

      if(level===5){
        var ellipsisStyleWidth = "90px"
      } else if(level === 4){
        ellipsisStyleWidth = "100px"
      } else if(level === 3){
        ellipsisStyleWidth = "110px"
      } else if(level === 2){
        ellipsisStyleWidth = "120px"
      } else if(level === 1){
        ellipsisStyleWidth = "130px"
      }
      var ellipsisStyle = {
          width:ellipsisStyleWidth,
          overflow:"hidden",
          textOverflow:"ellipsis",
          whiteSpace:"nowrap"
      }
    }
    const table = this.props.table
    return ( 
      <div style={{width:"100%"}}>
        <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginRight:"5px", width:ellipsisWidth}}><span style={ellipsisStyle}>{table.name}</span><SearchOutlined onClick={()=>this.props.onClickHideDetail(table._id)}/></div> 
          <div style={{flexShrink:0,fontSize:"10px", width:"635px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
            <span style={{width:"64px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.completed}%</span> 
            <span style={{width:"53px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.total}</span> 
            <span style={{width:"64px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.yet}</span> 
            <span style={{width:"86px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.ing.total}</span>
            <span style={{width:"107px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.ing.until_now + table.num_cards.total.ing.until_today}({table.num_cards.total.ing.until_now})</span>
            <span style={{width:"102px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.ing.after_tomorrow}</span>
            <span style={{width:"76px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.completed}</span>
            <span style={{width:"76px", textAlign:"center", marginRight:"8px", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.total.hold}</span>
          </div>
        </div>
        <div id={table._id} className="detail_info" style={{display:"no ne"}}>
          <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between",paddingTop:"1px"}}>
            <div>읽기카드</div> 
            <div style={{fontSize:"10px",width:"635px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
              <span style={{width:"64px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.completed}%</span> 
              <span style={{width:"53px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.total}</span> 
              <span style={{width:"64px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.yet}</span> 
              <span style={{width:"86px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.ing.total}</span>
              <span style={{width:"107px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.ing.until_now + table.num_cards.read.ing.until_today}({table.num_cards.read.ing.until_now})</span>
              <span style={{width:"102px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.ing.after_tomorrow}</span>
              <span style={{width:"76px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.completed}</span>
              <span style={{width:"76px", textAlign:"center", marginRight:"8px", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.read.hold}</span>
            </div>
          </div>
          <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between",paddingTop:"1px"}}>
            <div>뒤집기카드</div> 
            <div style={{fontSize:"10px",width:"635px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
              <span style={{width:"64px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.completed}%</span> 
              <span style={{width:"53px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.total}</span> 
              <span style={{width:"64px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.yet}</span> 
              <span style={{width:"86px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.ing.total}</span>
              <span style={{width:"107px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.ing.until_now + table.num_cards.flip.ing.until_today}({table.num_cards.flip.ing.until_now})</span>
              <span style={{width:"102px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.ing.after_tomorrow}</span>
              <span style={{width:"76px", textAlign:"center", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.completed}</span>
              <span style={{width:"76px", textAlign:"center", marginRight:"8px", background:"#ffffff",borderLeft:"1px solid #f5f5f5"}}>{table.num_cards.flip.hold}</span>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 



class IndexTree extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      key:'',
      ckeckedKeys:[]
     };
  }
  expandTree = () => {
    console.log("here")
    this.props.updateExpandState()
    console.log("indextree", this.props.expand)
    this.setState({ key: Math.random() });
  }
  onClickHideDetail = (index_id) => {
    console.log(index_id)
    // document.getElementById(index_id).classList.remove('detail_show');
    // document.getElementById(index_id).classList.add('detail_hide');
    
    if(document.getElementById(index_id).style.display === "none"){
      document.getElementById(index_id).style.display = "block"
    } else {
      document.getElementById(index_id).style.display = "none"
    }
  }
  onCheck = (checkedKeys, info) => {
    console.log(checkedKeys)
    this.setState({ckeckedKeys:checkedKeys})
    // this.props.getSelected(info)
    console.log('info',info)
    const value = info.checkedNodes.map((item)=> item.index_id)
    console.log('value',value)
    var filtered = value.filter(function (el) {
      return el != null;
    });
    console.log('filtered',filtered)

    if(info.checked === true){
      const sessionData = JSON.parse(sessionStorage.getItem("selectedIndex"))
      if(sessionData){
        sessionStorage.setItem("selectedIndex", JSON.stringify(sessionData.concat(filtered)));
        const removeDuplicate = JSON.parse(sessionStorage.getItem("selectedIndex"))
        const removed = [...new Set(removeDuplicate)]
        sessionStorage.setItem("selectedIndex", JSON.stringify(removed));
        console.log("here fired1111111111111111111111111111111111")
        this.props.onCheckIndex(removed)
      } else {
        sessionStorage.setItem("selectedIndex", JSON.stringify(filtered));
        console.log("here fired2222222222222222222222222222222222")
        this.props.onCheckIndex(filtered)
      }
    } else {
      console.log("unckeck",info.node)
      const resultAll = []
      resultAll.push(info.node.index_id)
      const parentIndex = []
      if(info.node.parent){
        console.log(info.node.parent)
        parentIndex.push(info.node.parent)
      }

      const temp = resultAll.concat(parentIndex)
      
      const children = []
      info.node.children.map((item)=> children.push(item.index_id))
      info.node.children.map((item)=> item.children.map(item => children.push(item.index_id)))
      info.node.children.map((item)=> item.children.map(item => item.children.map(item=>children.push(item.index_id))))
      info.node.children.map((item)=> item.children.map(item => item.children.map(item=>item.children.map(item=>children.push(item.index_id)))))
      // info.node.children.map((item)=> item.children.map(item => item.children.map(item=>item.children.map(item=>item.children.map(children.push(item.index))))))

      const deleteThis = temp.concat(children)
      const sessionData = JSON.parse(sessionStorage.getItem("selectedIndex"))
      const finalArray = sessionData.filter(val => !deleteThis.includes(val));

      sessionStorage.setItem("selectedIndex", JSON.stringify(finalArray));
      console.log("here fired33333333333333333333333333333333333")
      this.props.onCheckIndex(finalArray)
    }
    console.log('get item : ',JSON.parse(sessionStorage.getItem("selectedIndex")))
  };

  tableLevelInfoHandler1 = (level, table) => {
    return ({
      title: (<><IndexComponent level={level} onClickHideDetail={this.onClickHideDetail} table={table}/></>),
      index_id:table._id,
      book_id:this.props.book_id,
      key: table.seq,
      level: level,
      icon: <CarryOutOutlined />,
      children: [],})
  }

  tableLevelInfoHandler2 = (level, table) => {
    return ({
      title: (<><IndexComponent level={level} onClickHideDetail={this.onClickHideDetail} table={table}/></>),
      index_id:table._id,
      parent:table.parent,
      book_id:this.props.book_id,
      key: table.seq,
      level: level,
      icon: <CarryOutOutlined />,
      children: [],})
  }
  render() {

    // const onSelect = this.props.onSelect 
    let level_all =[];
    this.props.book.map((table, index)=>{
      // 여기서 인덱스별 total 값을 가져와서 외부 array에 넣고 (ex. cards_total_in_book = []; array안에 값을 전부 더한다음 전체선택 treeData에 넣어주기)
        if(table){
          if(table.level === 1){
            let level = this.tableLevelInfoHandler1(1,table)
              level_all.push(level)
          } else {
            let level = this.tableLevelInfoHandler2(table.level,table)
              level_all.push(level)  
          } 
        }
        return null
      }
    )


    const level_5 = obj => obj.level === 5;
    const level_4 = obj => obj.level === 4;
    const level_3 = obj => obj.level === 3;
    const level_2 = obj => obj.level === 2;
    if(level_all.length > 0){
      //목차 레벨 존재여부 검사
      let level_5_exist = level_all.some(level_5)
      let level_4_exist = level_all.some(level_4)
      let level_3_exist = level_all.some(level_3)
      let level_2_exist = level_all.some(level_2)

      //level_5 exist
      if(level_5_exist === true){
        let temp_data_4 = []

        for(var i = 0; i < level_all.length; i += 1) {
          if(level_all[i]['level'] === 4) {
            temp_data_4.push(level_all[i])
          } else if(level_all[i]['level'] === 5 && temp_data_4.length > 0) {
            for(var a = 0; a < temp_data_4.length; a += 1) {
              level_all[i].parent = temp_data_4[temp_data_4.length - 1].index_id
              temp_data_4[temp_data_4.length - 1]['children'].push(level_all[i])
              break;
            }
          } 
        }
         i = 0;
        while (i < level_all.length) {
          if (level_all[i]['level'] === 5) {
            level_all.splice(i, 1);
          } else {
            ++i;
          }
        }

        if(temp_data_4.length > 0){
          let temp_data_3 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 3) {
              temp_data_3.push(level_all[i])
            } else if(level_all[i]['level'] === 4) {
              for( a = 0; a < temp_data_3.length; a += 1) {
                level_all[i].parent = temp_data_3[temp_data_3.length - 1].index_id
                temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_3.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 4) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_2 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for( a = 0; a < temp_data_2.length; a += 1) {
                level_all[i].parent = temp_data_2[temp_data_2.length - 1].index_id
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for( a = 0; a < temp_data_1.length; a += 1) {
                level_all[i].parent = temp_data_1[temp_data_1.length - 1].index_id
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }
        //level_4 exist
      } else if(level_4_exist === true){
        let temp_data_3 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 3) {
              temp_data_3.push(level_all[i])
            } else if(level_all[i]['level'] === 4) {
              for( a = 0; a < temp_data_3.length; a += 1) {
                level_all[i].parent = temp_data_3[temp_data_3.length - 1].index_id
                temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
        
        if(temp_data_3.length > 0){
           i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 4) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }

          let temp_data_2 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for( a = 0; a < temp_data_2.length; a += 1) {
                level_all[i].parent = temp_data_2[temp_data_2.length - 1].index_id
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for( a = 0; a < temp_data_1.length; a += 1) {
                level_all[i].parent = temp_data_1[temp_data_1.length - 1].index_id
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }
        //level_3 exist
      } else if(level_3_exist === true){
        let temp_data_2 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for( a = 0; a < temp_data_2.length; a += 1) {
                level_all[i].parent = temp_data_2[temp_data_2.length - 1].index_id
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
        
        if(temp_data_2.length > 0){
           i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 3) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }
    
          let temp_data_1 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for( a = 0; a < temp_data_1.length; a += 1) {
                level_all[i].parent = temp_data_1[temp_data_1.length - 1].index_id
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }
        //level_2 exist
      } else if(level_2_exist === true){

        let temp_data_1 = []
        for( i = 0; i < level_all.length; i += 1) {
          if(level_all[i]['level'] === 1) {
            temp_data_1.push(level_all[i])
          } else if(level_all[i]['level'] === 2) {
            for( a = 0; a < temp_data_1.length; a += 1) {
              level_all[i].parent = temp_data_1[temp_data_1.length - 1].index_id
              temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
              break;
            }
          } 
        }

        if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
        }

      }
    }

    if(level_all.length > 0){
      var treeData = [{
        title: (<><div>전체선택</div> 
                            {/* <div style={{fontSize:"10px",width:"80%", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                              <span style={{width:"79px", textAlign:"center"}}><Progress size="large" style={{fontSize:"10px"}} percent={table.num_cards.total.completed} /></span> 
                              <span style={{width:"37px", textAlign:"center"}}>{table.num_cards.total.total}</span> 
                              <span style={{width:"80px", textAlign:"center"}}>{table.num_cards.total.yet}</span> 
                              <span style={{width:"37px", textAlign:"center"}}>{table.num_cards.total.ing.total}</span>
                              <span style={{width:"134px", textAlign:"center"}}>{table.num_cards.total.ing.until_now + table.num_cards.total.ing.until_today}({table.num_cards.total.ing.until_today})</span>
                              <span style={{width:"125px", textAlign:"center"}}>{table.num_cards.total.ing.after_tomorrow}</span>
                              <span style={{width:"95px", textAlign:"center"}}>{table.num_cards.total.completed}</span>
                              <span style={{width:"95px", textAlign:"center", marginRight:"8px"}}>{table.num_cards.total.hold}</span>
                            </div> */}
                            </>),
        key: 'default',
        children: level_all,
      }]
    }

    return (
      <>
      <span><Button size="small" onClick={this.expandTree}>목차펼치기/접기</Button></span>
        <Tree
          checkable
          key={this.state.key}
          // multiple={true}
          // showLine={true}
          showIcon={true}
          defaultExpandAll={this.props.expand}
          // onSelect={onSelect}
          onCheck={this.onCheck}
          treeData={treeData}
          defaultCheckedKeys={this.state.ckeckedKeys}
          // style={{width:"100%", fontSize:"11px", backgroundColor:"#ffffff"}}
          style={{width:"100%", fontSize:"11px", backgroundColor:"#f5f5f5", paddingBottom:"10px"}}
        />
      </>
    );
  }
}

export default IndexTree;