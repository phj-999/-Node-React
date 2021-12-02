import React from "react";
import styles from "./ProductCollection.module.css";
import { Row, Col, Typography, Divider } from "antd";

interface PropsType {
    title : JSX.Element,//title可以接受传入一个react组件，所以类型是JSX.Element
    sideImage: string,
    products: any[]  //有不确定定型
}

export const ProductCollection: React.FC<PropsType> = ({title,sideImage,products})=>
{
    <div className={styles.content}>
         <Divider orientation="left">{title}</Divider>
          {/**栅格布局 整体分为两个区块 一个span是4 一个是20 */}
          <Col span={4}>
          <img src={sideImage} className={styles["side-image"]} alt="" />
          </Col>
          {/**此处为右侧栅格，整体分为上下两个部分 2个行布局Row */}
          <Col span={20}>
              {/**此处为上面的行 又分左右两部分 */}
              <Row>
                  {/**上方左侧 放推荐页最大图面 */}
                  <Col span={12}>
                  sxx
                  </Col>
                  {/**上方右侧 放4个图片 又分上下两行 */}
                  <Col span={12}>
                      {/**各分两列 */}
                  <Row></Row>
                  <Row></Row>
                  </Col>
              </Row>

{/**此处为下面的行 */}
              <Row>
              </Row>
          </Col>
    </div>
}