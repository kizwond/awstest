import React, {Component} from 'react';
import { Table,Avatar,Progress } from 'antd';
import { ApiOutlined,UserOutlined} from '@ant-design/icons';
import { Chart } from 'react-charts'

class MentorList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    function MyChart() {
      const data = React.useMemo(
        () => [
          {
            label: 'Series 1',
            
            data: [{ x: 1, y: 10 }, { x: 2, y: 30 }, { x: 3, y: 20 },{ x: 4, y: 10 }, { x: 5, y: 70 }, { x: 6, y: 40 },{ x: 7, y: 90 }, { x: 8, y: 60 }, { x: 9, y: 20 },{ x: 10, y: 60 }, { x: 11, y: 40 }, { x: 12, y: 90 },{ x: 13, y: 10 }, { x: 14, y: 60 }, { x: 15, y: 70 },{ x: 16, y: 10 }, { x: 17, y: 60 }, { x: 18, y: 70 },{ x: 19, y: 10 }, { x: 20, y: 60 }, { x: 21, y: 70 }]
          }
        ],
        []
      )
    
      const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom', showTicks:false },
          { type: 'linear', position: 'left', showTicks:false, outerPadding:0,tickPadding:0,innerPadding:0 }
        ],
        []
      )
    
      return (
        <div
          style={{
            width: '150px',
            height: '30px'
          }}
        >
          <Chart data={data} axes={axes}  />
        </div>
      )
    }
    const columns = [
      {
        title: '책',
        width:'150px',
        dataIndex: 'book_title',
      },
      {
        title: '멘토',
        dataIndex: 'name',
        width:'100px',
        render: (text) => <><Avatar size={15} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {text}</>,
      },
      {
        title: '학습완료율',
        dataIndex: 'progress',
        render: (text) => <Progress size="large" style={{fontSize:"10px"}} percent={text} showInfo={false}/>,
      },
      {
        title: '평균레벨',
        dataIndex: 'average_lev',
        align: 'right',
      },
      {
        title: '최근학습일',
        dataIndex: 'recent_study',
        align: 'right',
      },
      {
        title: '최근100회 학습시간 그래프',
        dataIndex: 'graph',
        align: 'right',
        render: (text) => <div style={{width:"150px", float:"right",marginBottom:"-20px"}}><MyChart /></div>,
      },
      {
        title: '일일평균 학습횟수',
        dataIndex: 'average_daily',
        align: 'right',
      },
      {
        title: '일일평균 완료카드 수',
        dataIndex: 'completed',
        align: 'right',
      },
      {
        title: '카드총합(미학습/복습/완료/보류/졸업)',
        dataIndex: 'card_total',
        align: 'right',
      },
      {
        title: '멘토링취소',
        dataIndex: 'hide',
        align: 'right',
        render: () => <><ApiOutlined style={{fontSize:'14px'}}/></>
      },
    ];
    if(this.props.my_study_result.length > 0){
      console.log("here?")
    
      var data = this.props.my_study_result.map(book =>({
        key: book._id,
        name: book.mentor_id,
        book_title : book.book_id,
        category: '수능영어독해',
        progress:'30',
        average_lev:'00 Lev.',
        graph:'그래프',
        recent_study:'2020-10-30',
        completed:'00장',
        average_daily:'00회',
        card_total: '480(00/00/00/00)',
      }))
      console.log(data)
    }
    return (
      <div >
      <Table
        className='study_table_list'
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
      />
    </div>
     );
  }
}
 
export default MentorList;
