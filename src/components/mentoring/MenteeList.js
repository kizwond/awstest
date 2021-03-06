import React from 'react';
import { Table, Avatar,Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Chart } from 'react-charts'
import DefaultButton from '../styledComponents/defaultButton'

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
    <div style={{ width: '150px', height: '30px' }} >
      <Chart data={data} axes={axes}  />
    </div>
  )
}

function MenteeList() {
  const expandedRowRender = () => {
    const columns = [
      {  render: () => <div style={{width:"68px"}}></div>},
      { dataIndex: 'name',width:"100px", render: (text) => <><Avatar size={15} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {text}</>, },
      { dataIndex: 'progress',width:"85px",render: (text) => <Progress size="large" style={{fontSize:"10px"}} percent={text} showInfo={false}/>, },
      { dataIndex: 'average_lev', width:'85px',align: 'right', },
      { dataIndex: 'recent_study', align: 'right', },
      { dataIndex: 'graph',align: 'right', render: (text) => <div style={{width:"150px", float:"right",marginBottom:"-20px"}}><MyChart /></div>, },
      { dataIndex: 'average_daily', align: 'right', },
      { dataIndex: 'completed', align: 'right', },
      { dataIndex: 'card_total', align: 'right', },
      { dataIndex: 'card_added', align: 'right', },
      { dataIndex: 'detail', align: 'right', render: (text) => <DefaultButton size="small">????????????</DefaultButton>  },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: '????????????d',
        progress:'30',
        average_lev:'00 Lev.',
        graph:'?????????',
        recent_study:'2020-10-30',
        completed:'00???',
        average_daily:'00???',
        card_total: '480(00/00/00/00)',
        card_added:'50???'
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: '???', width:'150px', dataIndex: 'name'},
    { title: '??????', width:'100px', dataIndex: 'mentee_total'},
    { title: '???????????????', width:'85px',dataIndex: 'progress',render: (text) => <Progress size="large" style={{fontSize:"10px"}} percent={text} showInfo={false}/>,},
    { title: '????????????', align: 'right'},
    { title: '???????????????', align: 'right'},
    { title: '??????100??? ???????????? ?????????', align: 'right'},
    { title: '???????????? ????????????', align: 'right'},
    { title: '???????????? ???????????????', align: 'right'},
    { title: '????????????(?????????/??????/??????/??????/??????)', align: 'right'},
    { title: '??????????????????', align: 'right'},
    { title: '???????????? ????????????', align: 'right', render: (text) => <DefaultButton size="small">????????????</DefaultButton>},
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: '??????????????????',
      mentee_total:'10???',
      progress:'30',
    });
  }

  return (
    <Table
      className='study_table_list'
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
      size="small"
    />
  );
}

export default MenteeList;