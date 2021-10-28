/**
 * 支付页面
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormConatiner from "../components/FormContainer";
import { savePaymentMethods } from "../actions/cartActions.js";
import CheckoutStepsScreen from "./CheckoutStepsScreen";
import { Button, Col, Form } from "react-bootstrap";

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.state);

    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethods(paymentMethod));
        history.push("/placeorder");
    };
    return (
        <FormConatiner>
            <CheckoutStepsScreen step1 stp2 step3 />
            <h1>支付方式</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">选择支付方式</Form.Label>
                
                <Col>
                    <Form.Check
                        type="radio"
                        label="微信或者支付宝"
                        id="微信"
                        name="paymentMethod"
                        value="微信"
                        checked
                        onChange={(e) => {
                            setPaymentMethod(e.target.value);
                        }}
                    ></Form.Check>

                    <Form.Check
                        type="radio"
                        label="PayPal"
                        id="PayPal"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                        onChange={(e) => {
                            setPaymentMethod(e.target.value);
                        }}
                    ></Form.Check>
                </Col>
                </Form.Group>
                <Button type='submie' variant='primary'>
                继续下一步
            </Button>
            </Form>
          
        </FormConatiner>
    );
};

export default PaymentScreen;
