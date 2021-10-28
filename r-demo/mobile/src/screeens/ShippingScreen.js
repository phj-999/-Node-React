
/***
 * 收货地址
 */

 import React, { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { Form, Button, Row, Col } from "react-bootstrap";
 import Message from "../components/Message";
 import Loader from "../components/Loader";
 import FormConatiner from '../components/FormContainer';
 import {saveShippingAddress} from '../actions/cartActions.js';
import  CheckoutStepsScreen from './CheckoutStepsScreen';

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [province, setProvince] = useState(shippingAddress.province)


    //提交收货地址
const submitHandler =(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,province}))
    history.push('/payment')
}

    return (
        <FormConatiner>

                <CheckoutStepsScreen step1 stp2 step3/>
 
            <h1>收货地址</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>详细地址</Form.Label>
                    <Form.Control type='text' placeholder='请输入收货地址' value={address} onChange={e=>setAddress(e.target.value)}></Form.Control>
                </Form.Group>
            
               
                <Form.Group controlId='city'>
                    <Form.Label>所在城市地区：</Form.Label>
                    <Form.Control type='text' placeholder='请输入所在城市地区：' value={city} onChange={e=>setCity(e.target.value)}></Form.Control>
                </Form.Group>

            
                <Form.Group controlId='postalCode'>
                    <Form.Label>邮编：</Form.Label>
                    <Form.Control type='text' placeholder='请输入邮政编码：' value={postalCode} onChange={e=>setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='province'>
                    <Form.Label>省份：</Form.Label>
                    <Form.Control type='text' placeholder='请输入省份：' value={province} onChange={e=>setProvince(e.target.value)}></Form.Control>
                </Form.Group>

<Button type='submit' variant='primary'>下一步</Button>
            </Form>
        </FormConatiner>
    )
}

export default ShippingScreen