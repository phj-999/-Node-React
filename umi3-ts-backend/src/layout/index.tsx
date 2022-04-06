import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import { Link, useHistory } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

const index = (props: { children: React.ReactNode }) => {
  console.log(props,'props');
  const {location} = useHistory()
  return (
    <Layout className={styles.layout}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="title">后台umi3</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/course">
            <Link to="/course">关于</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">课程</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        ></Header>
        <Content
          className="site-layout-background"
          style={{ margin: '24px 16px', padding: 24, minHeight: 'max-content' }}
        >
          {props.children}
        </Content>
        <Footer>底部</Footer>
      </Layout>
    </Layout>
  );
};
export default index;
