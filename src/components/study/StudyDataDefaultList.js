import React, { Component } from 'react';
import { Table } from 'antd';
import { StarTwoTone,StarOutlined,EyeOutlined,EyeInvisibleOutlined,ArrowUpOutlined,ArrowDownOutlined,CopyOutlined,DeleteOutlined} from '@ant-design/icons';
import axios from 'axios'
import './StudyDataDefaultList.css'
import Button from '../styledComponents/defaultButton'
import StudySettingModal from './StudySettingModal'
import StudyData from './StudyData'

class StudyDataDefaultList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          visible:false,
          studyDataVisible:false,
          visible_array:[{book_id:'', visible:false}],
          study_data_visible_array:[{book_id:'', studyDataVisible:false}],
          study_configuration:[],
          book_status:[]
        };
      }
    
      showModal = () => {
        this.setState(prevState=>({
          visible_array:{...prevState.visible_array, visible:true}
        }));
      };
    
      handleOk = () => {
        this.setState(prevState=>({
          visible_array:{...prevState.visible_array, visible:false}
        }));
      };
    
      handleCancel = () => {
        this.setState(prevState=>({
          visible_array:{...prevState.visible_array, visible:false}
        }));
      };
      onFinish = values => {
        console.log('level config axios data to server :',values);
        axios.post('api/studysetup/set-level-config',{
          book_id: values.book_id,
          difficulty_setting:values.difficulty_setting,
          exp_setting:values.exp_setting,
          lev_setting:values.lev_setting,
        }).then(res => {
          console.log('res after level config : ', res.data)
        })
      };
      getStudySetting = (value) =>{
        console.log('get study setting book_id', value)
        axios.post('api/studysetup/get-level-config',{
          book_id: value
        }).then(res => {
          console.log("get-level-config", res.data.level_config)
          this.setState({
            study_configuration:res.data.level_config
          })
          this.setState({
            visible_array:{book_id:res.data.level_config.book_id, visible:true}
          })
          this.showModal()
        })
      }
    
      getStudyData = (value) =>{
        console.log("get card status bookID",value)
        axios.post('api/book/get-card-status',{
          book_id: value
        }).then(res => {
          console.log("res after get-card-status", res.data)
          this.setState({
            book_status:res.data
          })
          this.setState({
            study_data_visible_array:{book_id:value, studyDataVisible:true}
          })
          this.studyDataShowModal()
        })
          
      }
    
      studyDataShowModal = () => {
        this.setState(prevState=>({
          study_data_visible_array:{...prevState.study_data_visible_array, studyDataVisible:true}
        }));
      };
    
      studyDataHandleOk = () => {
        this.setState(prevState=>({
          study_data_visible_array:{...prevState.study_data_visible_array, studyDataVisible:false}
        }));
      };
    
      studyDataHandleCancel = () => {
        this.setState(prevState=>({
          study_data_visible_array:{...prevState.study_data_visible_array, studyDataVisible:false}
        }));
      };
      
    render() { 
        const columns = [
            {
              title: '카테고리',
              dataIndex: 'category',
            },
            {
              title: '책이름',
              dataIndex: 'book_title',
            },
            {
              title: '학습완료율',
              dataIndex: 'progress',
            },
            {
              title: '카드총합(미학습/복습/완료/보류/졸업)',
              dataIndex: 'remain_new',
            },
            {
              title: '일일학습목표',
              dataIndex: 'today_goal',
            },
            {
              title: '최근학습일',
              dataIndex: 'recent_study',
            },
            {
              title: '일일 학습목표',
              dataIndex: 'today_goal',
            },
            {
              title: '즐겨찾기',
              dataIndex: 'like',
              render: (text, record) => {
                if(record.like === true){
                    return <StarTwoTone onClick={()=>this.props.onClickLike({value:'true',bookId:this.props.bookInfo._id})} twoToneColor="#52c41a" style={{fontSize:'14px'}}/>
                } else {
                  return <StarOutlined onClick={()=>this.props.onClickLike({value:'false',bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>
                }
              }
            },
            {
              title: '순서이동',
              dataIndex: 'reorder',
              render: () => <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
              <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></>
            },
            {
              title: '숨긴책보기',
              dataIndex: 'hide',
              render: (text, record) => {
                if(record.hide === true){
                    return <EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>
                } else {
                  return <EyeInvisibleOutlined onClick={()=>this.props.onClickHideOrShow({value:true,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>
                }
              }
            },
            {
              title: '학습정보 상세보기',
              render: (text, record) => {
                if(record){
                    return <><Button size="small" onClick={()=>this.getStudyData(record.book_id)} >상세보기</Button>
                    <StudyData studySetting={this.state.study_configuration} handleOk={this.studyDataHandleOk} book_status={this.state.book_status} info={record} isModalVisible={this.state.study_data_visible_array} handleCancel={this.studyDataHandleCancel}/>
                    </>
                } 
              }
            },
            {
              title: '학습설정',
              dataIndex: 'key',
              render: (text, record) => {
                if(record){
                return <><Button size="small" onClick={()=>this.getStudySetting(record.book_id)} >학습설정</Button>
                    <StudySettingModal studySetting={this.state.study_configuration} handleOk={this.handleOk} info={record} onFinish={this.onFinish} isModalVisible={this.state.visible_array} handleCancel={this.handleCancel}/>
                    </>
                } 
              }
            },
            {
              title: '임시책 생성',
              dataIndex: 'key',
              render: (text, record) => {
                if(record){
                    return <CopyOutlined />
                } 
              }
            },
            {
              title: '책삭제',
              dataIndex: 'key',
              render: (text, record) => {
                if(record){
                    return <DeleteOutlined />
                } 
              }
            },
          ];
      
      
          const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              this.props.selectBook({book_id: selectedRowKeys,book_info:selectedRows})
            },
            getCheckboxProps: (record) => ({
              disabled: record.name === 'Disabled User',
              name: record.name,
            }),
          };
      
      
          if(this.props.book_list){
            console.log('this.props.book_list : ', this.props.book_list)
            var plz = []
            this.props.book_list.map(book => book.book_ids.map((item)=> plz.push(item)))
            var data = plz.map(book =>({
              key: book._id,
              book_id: book._id,
              category: book.category_id.name,
              book_title : book.title,
              progress:'00%',
              remain_new:'00장',
              today_review:'00장',
              today_goal:'00장',
              recent_study:'00월/00일/0000년',
              like:book.like,
              reorder: '위/아래',
              hide: book.hide_or_show,
            }))
            console.log('data generated to make table :',data)
            
          }
          
        return ( 
            <div className="study_data_default_list">
                <Table
                    className='study_table_list'
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size='small'
                />
            </div>
         );
    }
}
 
export default StudyDataDefaultList;
