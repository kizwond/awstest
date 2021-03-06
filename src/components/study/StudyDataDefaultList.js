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
          // this.studyDataShowModal()
        })
          
      }
    
      // studyDataShowModal = () => {
        // this.setState(prevState=>({
        //   study_data_visible_array:{...prevState.study_data_visible_array, studyDataVisible:true}
        // }));
      // };
    
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
              title: '????????????',
              dataIndex: 'category',
            },
            {
              title: '?????????',
              dataIndex: 'title',
            },
            {
              title: '???????????????',
              dataIndex: 'progress',
            },
            {
              title: '????????????(?????????/??????/??????/??????/??????)',
              dataIndex: 'remain_new',
            },
            {
              title: '??????????????????',
              dataIndex: 'today_goal',
            },
            {
              title: '???????????????',
              dataIndex: 'recent_study',
            },
            {
              title: '?????? ????????????',
              dataIndex: 'today_goal',
            },
            {
              title: '????????????',
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
              title: '????????????',
              dataIndex: 'reorder',
              render: () => <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
              <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></>
            },
            {
              title: '???????????????',
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
              title: '???????????? ????????????',
              render: (text, record) => {
                if(record){
                    return <><Button size="small" onClick={()=>this.getStudyData(record.book_id)} >????????????</Button>
                    <StudyData studySetting={this.state.study_configuration} handleOk={this.studyDataHandleOk} book_status={this.state.book_status} info={record} isModalVisible={this.state.study_data_visible_array} handleCancel={this.studyDataHandleCancel}/>
                    </>
                } 
              }
            },
            {
              title: '????????????',
              dataIndex: 'key',
              render: (text, record) => {
                if(record){
                return <><Button size="small" onClick={()=>this.getStudySetting(record.book_id)} >????????????</Button>
                    <StudySettingModal studySetting={this.state.study_configuration} handleOk={this.handleOk} info={record} onFinish={this.onFinish} isModalVisible={this.state.visible_array} handleCancel={this.handleCancel}/>
                    </>
                } 
              }
            },
            {
              title: '????????? ??????',
              dataIndex: 'key',
              render: (text, record) => {
                if(record){
                    return <CopyOutlined />
                } 
              }
            },
            {
              title: '?????????',
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
              title : book.title,
              progress:'00%',
              remain_new:'00???',
              today_review:'00???',
              today_goal:'00???',
              recent_study:'00???/00???/0000???',
              like:book.like,
              reorder: '???/??????',
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
