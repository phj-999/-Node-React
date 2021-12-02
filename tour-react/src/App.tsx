import React from "react";
import { Row, Col } from "antd";

import { Header, Footer, Carousel, SideMenu } from "./components";
import styles from "./App.module.css";
import { productList1, productList2, productList3 } from "./mockups";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>
        {/**栅格布局 列比例1：3 */}
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        {/**产品推荐 */}
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              爆款推荐
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList1}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              新品上市
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList2}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              国内游推荐
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList3}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
