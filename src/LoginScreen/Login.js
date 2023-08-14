import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Login.css"
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";



const Login = () => {
    const navigate = useNavigate();
    const [test, setTest] = useState("");
    const onFinish = (values) => {
        axios.get('http://localhost:8000/users/').then(res => {
            let users = res.data;
            let found = false;
            for(let i = 0; i < users.length; i++ ){

                if((values['username'] == users[i]['username'] || values['username'] == users[i]['email']) && values['password'] == users[i]['password']) {
                    navigate("/home/" + users[i]['id'], {replace: true});
                    found = true;

                }
            }
            if(!found){
                setTest("Wrong User Name or Password")
            }

        } )
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
    <div className="center">
        <p style={{
            color:"red"
        }} >{test}</p>
    <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username/Email"
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>

    </div>
    );
}
export default Login;

