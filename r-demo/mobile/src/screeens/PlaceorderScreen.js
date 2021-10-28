/**
 * 准备提交订单的页面（总价格页面）
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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutStepsScreen from "./CheckoutStepsScreen";
import { createOrder } from "../actions/orderActions";

const PlaceorderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //保留小数点后两位
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 1000).toFixed(2);
  };
  //计算商品价格
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty
  );

  //展示与否运费
  cart.shippingPrice = cart.itemPrice > 20 ? 0 : 10;
  //总价
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  const placeorderHander = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        PaymentAddress: cart.paymentMethod,
        itemPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, history]);

  return (
    <Fragment>
      <CheckoutStepsScreen step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>收货地址</h2>
              <p>
                <strong>收件人地址：</strong>
                {cart.shippingAddress.province},{cart.shippingAddress.city},
                {cart.shippingAddress.address},{cart.shippingAddress.postalCode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <strong>支付方法：</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {cart.cartItems.length === 0 ? (
                <Message>购物车为空</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>运费</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>订单总价</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={placeorderHander}
                  disabled={cart.cartItems === 0}
                >
                  提交订单
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceorderScreen;
