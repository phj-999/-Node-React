import React, { Fragment, memo, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../actions/productiActions";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default memo(function ProductScreen({ history,match }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
      //添加到购物车  点击路由有当前商品id 和购买数量
      history.push(`/cart/${match.params.id}?qty=${qty}`) 
  }

  return (
    <Fragment>
      <Link className="btn btn-dark my-3" to="/">
        返回主页
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}条评论`}
                />
              </ListGroup.Item>
              <ListGroup.Item>价格：￥{product.price}</ListGroup.Item>
              <ListGroup.Item>价格：￥{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>价格：</Col>
                    <Col>
                      <strong>￥{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>库存：</Col>
                    <Col>{product.countInStock > 0 ? "有货" : "无货"}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>数量</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={addToCartHandler()}
                            className='btn-block' 
                            type='button' 
                            disabled={product.countInStock}>
                        添加到购物车
                    </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
});
