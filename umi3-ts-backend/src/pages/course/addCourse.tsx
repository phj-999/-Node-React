import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import {
  getTypeList,
  add,
  getEditCourse,
  editCourse,
} from '@/service/courseApi';
import { AddData, Response } from '@/utils/types';
import { history, useParams } from 'umi';


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 8 },
};

const { Option } = Select;

const addCourse = () => {
  const [typeList, setTypeList] = useState<AddData[]>([] as AddData[]);
  const { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    getTypeDatas();
    id && init(id);
  }, []);

  const getTypeDatas = () => {
    getTypeList().then((res: Response) => {
      setTypeList(res.datas as AddData[]);
    });
  };

  const onFinish = (values: object) => {
    id
      ? editCourse({ id, ...values }).then((res: Response) => {
          if (res && res.success) {
            message.success(res.msg);
            history.push('/course/list');
            return;
          }
          message.error(res ? res.msg : '编辑失败');
        })
      : add(values).then((res: Response) => {
          if (res && res.success) {
            message.success(res.msg);
            history.push('/course/list');
            return;
          }
          message.error(res ? res.msg : '添加失败');
        });
  };

  // 获取编辑课程的信息
  const init = (id: string) => {
    getEditCourse({ id }).then((res: Response) => {
      if (res && res.success && res.datas) {
        form.setFieldsValue({ ...res.datas });
      }
    });
  };

  return (
    <div>
      <Form {...layout} name="basic" onFinish={onFinish} form={form}>
        <Form.Item
          label="课程类别"
          name="type"
          rules={[{ required: true, message: 'Please input your type!' }]}
        >
          <Select>
            {typeList.map((item: { value: string; label: string }, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="课程名称"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程总价"
          name="totalPrice"
          rules={[{ required: true, message: 'Please input your totalPrice!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程数量"
          name="amount"
          rules={[{ required: true, message: 'Please input your amount!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程地址"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default addCourse;
