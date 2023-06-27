import logo from './logo.svg';
import './App.css';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import React, {useRef, useState} from "react";
import NavBar from "./navBar/NavagationBar.js";
import "bootstrap/dist/css/bootstrap.min.css";


const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};
function App() {
  const [config, setconfig] = useState({
    viewType: 'Week'
  });
    const calendarRef = useRef();

    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
            startDate: args.day,

        });
    }

  return (
    <div className="App">
        <NavBar/>
        <div style={styles.wrap}>
            <div style={styles.left}>
                <DayPilotNavigator
                    selectMode={"Week"}
                    showMonths={1}
                    skipMonths={1}
                    onTimeRangeSelected={handleTimeRangeSelected}
                />
            </div>

            <div style={styles.main}>
                <DayPilotCalendar {...config} ref={calendarRef} />
            </div>
        </div>

    </div>
  );
}

export default App;
