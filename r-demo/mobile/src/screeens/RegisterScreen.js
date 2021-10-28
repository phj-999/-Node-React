import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";


export default LoginScreen = (props) => {
  const {location,history} = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState()
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {loading, error, userInfo} = userRegister


const redirect = location.search?location.search.split('=')[1]:'/'

useEffect(() => {
  if (userInfo) {
    history.push(redirect)
  }
}, [history,userInfo,redirect])

  //表单提交
  const submitHandler =(e)=>{
    e.preventDefault()
    if (password !== confirmPassword) {
        setMessage('密码不匹配')
    }else{
        dispatch(register(name,email,password))
    }
}


  return (
    <FormContainer>
      <h1>注册</h1>
      {message && <Message variant='danger'>{Message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading&& <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>姓名：</Form.Label>
          <Form.Control
            type="name"
            placeholder="请输入邮箱"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>邮箱：</Form.Label>
          <Form.Control
            type="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>密码：</Form.Label>
          <Form.Control
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>确认密码：</Form.Label>
          <Form.Control
            type="password"
            placeholder="请确认密码"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary"></Button>
      </Form>
      <Row className="py-3">
        <Col>
        已有账户?
          <Link to = {redirect ? `/login?redirect=${redirect}` : "/login"}>
            去登录
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
