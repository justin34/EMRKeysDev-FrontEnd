import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import React, {useRef, useState, useEffect} from "react";
import axios from "axios";

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




const Calendar = () => {
    let data;
    const [dictionary, setDictionary] = useState({
        details: []

    })
    const [user, setUser] = useState(0)
    axios.get('http://localhost:8000').then(res => {
        data = res.data;
        setDictionary({
            details: data
        })
        for(let v = 0;v < data[0]['appointments'].length; v++)
        {
            let exists = false;
            for (let i = 0; i < calendarRef.current.control.events.list.length; i++) {
                let eventId = calendarRef.current.control.events.list[i].id
                if (data[0]['appointments'][v]['id'] == eventId) {
                    exists = true;
                }
            }
            if (!exists) {
                calendarRef.current.control.events.add({
                    start: data[0]['appointments'][v]["start"],
                    end: data[0]['appointments'][v]["end"],
                    id: data[0]['appointments'][v]["id"],
                    text: data[0]['appointments'][v]["title"]
                });
            }
        }
        console.log(data);

    }).catch(err => {data = err})
    const calendarRef = useRef();
    const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async args => {
            const dp = calendarRef.current.control;
            const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
            dp.clearSelection();
            if (!modal.result) { return; }
            dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: modal.result
            }
            );
        },
        eventDeleteHandling: "Update",
        onEventClick: async args => {
            const dp = calendarRef.current.control;
            const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
            if (!modal.result) { return; }
            const e = args.e;
            e.data.text = modal.result;
            dp.events.update(e);
        },
    });
    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
            startDate: args.day,

        });
    }
    useEffect(() => {

        const events =[

        ]
        const startDate = "2023-06-01";

        calendarRef.current.control.update({startDate, events});
    }, []);

    return(
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
                <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
            </div>
        </div>
    )


}
export default Calendar
