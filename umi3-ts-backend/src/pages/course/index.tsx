import React from 'react';
import { Table, Input, Button, message } from 'antd';
import { history, Link } from 'umi';
import {
  useEffect,
  useState,
} from '@umijs/renderer-react/node_modules/@types/react';
import { Data, Response } from '@/utils/types';
import { getList, deleteCourse } from '@/service/courseApi';
const { Search } = Input;

const index = () => {
  const [datas, setDatas] = useState<Data[]>([] as Data[]);
  const [keywords, setKeywords] = useState('');
  const handleRemove = (id: string) => {
    deleteCourse({ id }).then((res: Response) => {
      if (res && res.success) {
        message.success(res.msg);
        getDatas({ keywords });
        return;
      }
      message.warning(res ? res.msg : '删除异常');
    });
  };
  // 表头
  let columns = [
    {
      title: '课程类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '课程数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '课程地址',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <>
          <a target="blank" href={text}>
            查看课程
          </a>
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: { id: string }) => (
        <>
          <Link to={`/course/edit/${record.id}`}>编辑</Link> &nbsp;
          <a onClick={() => handleRemove(record.id)}>删除</a>
        </>
      ),
    },
  ];
  const getDatas = (params: object) => {
    //请求数据 设置成表格数据
    getList(params).then((res: Response) => {
      // console.log(res.datas);
      setDatas(res.datas as Data[]);
    });
  };

  useEffect(() => {
    getDatas({ keywords });
  }, [keywords]);
  const handleSearch = (keywords: string) => {
    // console.log(keywords);
    setKeywords(keywords);
    // 搜索
    // getDatas({ keywords });
  };
  const handleAdd = () => {
    history.push('/course/add');
  };
  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        添加课程
      </Button>
      <Search
        placeholder="请输入搜索的课程名称"
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
      <Table
        columns={columns}
        dataSource={datas}
        rowKey={(datas: { id: string }) => datas.id}
      />
    </div>
  );
};

export default index;
