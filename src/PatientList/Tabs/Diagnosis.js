import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import {Select, Slider, Button} from "antd";

const Diagnosis = () => {

    const options = [{label:"Aggression", value: "Aggression"}, {label:"Agitation", value: "Agitation"},
                                              {label:"Anger", value: "Anger"}, {label:"Anxiety", value: "Anxiety"}];

    const [symptoms, setSymptoms] = useState([])

    const marks = {
        0: "None",
        25: "Mild",
        50: "Moderate",
        75: "Moderate to Severe",
        100: "Severe",
    }

    const handleChange = (value, i) => {

    };

    const handleAdd = () =>{
        const symptomList = [...symptoms, []]
        setSymptoms(symptomList)
    }

    return(
        <>
        {symptoms.map((data, i) => {
            return(
                <div>
                <Select
                    mode="single"
                    allowClear
                    showSearch={true}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={symp => handleChange(symp, i)}
                    options={options}
                />
                <Slider marks={marks} step={null} defaultValue={0} />
                </div>
        )

            })}
            <Button type="primary" onClick={() => handleAdd()}>Add</Button>
        </>


    )
}

export default Diagnosis