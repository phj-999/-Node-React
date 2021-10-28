/**
 * 订单的页面（已经提交后的）
 *前后端联调  支付成功返回一个对象id status upata——time email-adddress  支付时间
 */

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getOredrDetails, payOrder } from "../actions/orderActions";
import * as actionTypes from "../contents/orderConntents";
import { v4 as uuidv4 } from "uuid"; //yarn add uuid

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false); //弹出框默认关闭
  //支付二维码图片
  const [image, setImage] = useState("");
  // 二维码下面的字体
  const [text, setText] = useState("i请扫码");
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    order,
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //保留小数点后两位
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 1000).toFixed(2);
    };
    //计算商品价格
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.pushState("/login");
    }

    if (!order || order.id !== orderId || successPay) {
      dispatch({ type: actionTypes.ORDER_PAY_RESET });
      dispatch(getOredrDetails(orderId));
    }
  }, [order, orderId, dispatch, userInfo, successPay]);

  //创建开启和弹出框的函数
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setImage("https://www.thenewstep.cn/pay/index.php?" + "pid=" + order._id);
  };

  const handlePayment = () => {
    setImage("https://www.thenewstep.cn/pay/index.php?" + "pid=" + order._id);
    setShow(true);
    //设置定时器监听支付
    let timer = setInterval(() => {
      //请求支付
      axios.get("/status").then((res) => {
        if (res.data.state === 0) {
          setText("请扫码");
        } else if (res.data.status === 1) {
          setText("已完成扫码 请支付");
        } else if (res.data.status === 2) {
          //创建支付结果对象
          const paymentResult = {
            id: uuidv4(),
            status: res.data.status,
            updata_time: new Date.now(),
            email_address: order.user.email,
          };
          dispatch(payOrder(orderId, paymentResult));
          setText("支付成功");
          setShow(false);
          clearTimeout(timer);
        }
      });
    }, 1000);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>订单号：{order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>收货地址</h2>
              <p>
                <strong>收件人地址：</strong>
              </p>
              <P>
                <strong>姓名：{order.user.name}</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </P>
              <p>
                {order.shippingAddress.province},{order.shippingAddress.city},
                {order.shippingAddress.address},
                {order.shippingAddress.postalCode},
                {order.isDelivered ? (
                  <Message variant="success">
                    发货时间：{order.DeliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">未发货</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <p>
                <strong>支付方法：</strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">支付时间:{order.PaidAt}</Message>
              ) : (
                <Message variant="danger">待支付</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {order.orderItems.length === 0 ? (
                <Message>购物车为空</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ￥{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>订单总价</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>产品总价</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>运费</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>订单总价</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={handleShow}
                  disabled={order.orderItems === 0}
                >
                  去支付
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>订单号：{order._id}</Modal.Title>
                    <Row>
                      <Col md={6}>
                        <Image src="/images" style={{ textAlign: "center" }} />
                        <p style={{ backgroundColor: "green", color: "white" }}>
                          请扫码
                        </p>
                      </Col>
                      <Col>
                        <Image src="/" />
                      </Col>
                    </Row>
                  </Modal.Header>
                  <Modal.Body>
                    <p>支付金额：{order.totalPrice}</p>
                    <p>支付方式：{order.paymentMethod}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Save change
                    </Button>
                  </Modal.Footer>
                </Modal>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
