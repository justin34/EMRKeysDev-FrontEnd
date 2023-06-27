import logo from './logo.svg';
import './App.css';
import React, {useRef, useState} from "react";
import NavBar from "./navBar/NavagationBar.js";
import Calendar from "./Calendar/Calendar.js"
import SideBar from "./SideBar/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
    const styles = {
        wrap: {
            display: "flex"
        },
        left: {
            marginRight: "5px"
        },
        main: {
            flexGrow: "1"
        }
    };

  return (
    <div className="App" style={styles.wrap}>
        <div style={styles.left}>
        <SideBar/>
        </div>
        <div style={styles.main}>
        <NavBar/>
        <Calendar/>
        </div>

    </div>
  );
}

export default App;
