import React from 'react';
import StockImg from "./StockImg.jpg"
import { slide as Menu } from 'react-burger-menu';


const SideBar = () => {
    return (
        <div style={{
            backgroundColor: 'palegreen',
            height: "100vh",
            padding: 0
        }}>

                    <a className="navbar-brand" href={window.location.pathname + "/patients"}>
                        <img src={StockImg} alt="stuff" width="100" height="100"/>
                        <p>Patient list</p>
                    </a>
                <hr style={{
                    position: "relative",
                    top: "6px",
                    border: "none",
                    height: "3px",
                    backgroundColor: "black",
                }}/>
                    <a className="navbar-brand" href="#">
                        <img src={StockImg} alt="stuff" width="100" height="100"/>
                        <p>Appointments</p>
                    </a>
            <hr style={{
                position: "relative",
                top: "6px",
                border: "none",
                height: "3px",
                backgroundColor: "black",
            }}/>
                    <a className="navbar-brand" href="#">
                        <img src={StockImg} alt="stuff" width="100" height="100"/>
                        <p>Help</p>
                    </a>
            <hr style={{
                position: "relative",
                top: "6px",
                border: "none",
                height: "3px",
                backgroundColor: "black",
            }}/>
        </div>
    )
}

export default SideBar