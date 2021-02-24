import React, { Component } from 'react';
import { Table } from 'antd';

class SelectedIndexTotal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const columns = [
            {
              title: '선택된 책 권수',
              dataIndex: 'selection',
              align :'center',
            },
            {
              title: '선택된 목차 수',
              dataIndex: 'indexSelected',
              align :'center',
            },
            {
              title: '학습완료울',
              dataIndex: 'completedRatio',
              align :'center',
            },
            {
                title: '미학습카드',
                dataIndex: 'yet',
                align :'center',
              },
              {
                title: '기학습카드',
                dataIndex: 'ing',
                align :'center',
                children: [
                    {
                      title: '모든키학습카드',
                      dataIndex: 'ingTotal',
                      align :'center',
                    },
                    {
                        title: '현시간기준',
                        dataIndex: 'ingByNow',
                        align :'center',
                    },
                    {
                        title: '오늘기준',
                        dataIndex: 'ingByToday',
                        align :'center',
                    },
                ]
              },
              {
                title: '완료',
                dataIndex: 'completed',
                align :'center',
              },
              {
                title: '보류',
                dataIndex: 'suspend',
                align :'center',
              },
          ];
          
          const data = [
            {
              key: '1',
              selection:'00권의 책이 선택됨',
              indexSelected:'00개의 목차가 선택됨',
              completedRatio: '31%',
              yet:10,
              ing:20,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              completed:0,
              suspend:0,
            },
            {
              key: '2',
              selection:'읽기카드',
              indexSelected:'',
              completedRatio: '31%',
              yet:10,
              ing:20,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              completed:0,
              suspend:0,
            },
            {
              key: '3',
              selection:'뒤집기카드',
              indexSelected:'',
              completedRatio: '31%',
              yet:10,
              ing:20,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              completed:0,
              suspend:0,
            },
          ];
        return (
            <Table columns={columns} 
                   pagination={false} 
                   dataSource={data} 
                   size='small'
                   className="choose_index_top_table"
                   bordered
                   />
          );
    }
}

export default SelectedIndexTotal;