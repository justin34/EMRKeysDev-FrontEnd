import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useParams} from "react-router-dom";

const Navbar = () => {
    const userId = useParams().userId
    const items = [

        {
            label: (
                <a href={"/home/" + userId} target="_blank" rel="noopener noreferrer" style={{
                    textDecoration: 'none'}}>
                    <h2>Home</h2>
                </a>
            ),
            key: 'home',
        },
    ];
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Navbar;
