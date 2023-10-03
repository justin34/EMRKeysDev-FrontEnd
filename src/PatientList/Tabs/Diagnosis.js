import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import {Select, Slider, Button, Cascader} from "antd";
import axios from "axios";

const Diagnosis = ({ updateText }) => {

    const [options, setOptions] = useState([]);

    const [dataMap, setDataMap] = useState([])

    const [symptoms, setSymptoms] = useState([])

    const [aINote, setAINote] = useState("")

    const patientId = useParams().patientId


    const updateOptions = () => {
        axios.get("http://localhost:8000/symptomList/").then(res => {
            setOptions([])
            console.log(res.data)
            for (let i = 0; i < res.data.length; i++){
                setOptions(options => [...options, {
                    value: res.data[i],
                    label: res.data[i].charAt(0).toUpperCase() + res.data[i].slice(1),
                    children:[
                        {
                            value: "mild",
                            label: "Mild"
                        },
                        {
                            value: "moderate",
                            label: "Moderate"
                        },
                        {
                            value: "moderate to severe",
                            label: "Moderate to Severe"
                        },
                        {
                            value: "severe",
                            label: "Severe"
                        }
                    ]
                }])

            }
        })
    }

    const handleSympSelect = (value, i) => {
        let temp = symptoms
        if(temp.length <= i){
            temp = [...symptoms, {
                symptom: value[0],
                severity: value[1]
            }]
            setSymptoms(temp)
            return;
        }

        temp[i].symptom = value[0]
        temp[i].severity = value[1]
        setSymptoms(temp)


    };

    const requestNote = () => {

        let formatedSymptoms = { "symptoms": symptoms}

        updateAndPost(formatedSymptoms)


    }

    const updateAndPost = (data) => {
        console.log(data)
        axios({
            method:"post",
            url: "http://localhost:8000/ainotes/" + patientId,
            data: data,
            headers: {"Content-Type": "application/json"}
        }).then(function (res){
            console.log(res);
            axios.get("http://localhost:8000/ainotes/" + patientId).then(res => {
                console.log(res.data)

                const text = "<strong>Presenting symptoms:</strong><br>" + res.data[res.data.length-1]["note"]

                updateText(text)

            })
        }).catch(function (res){
            console.log(res);
        })


    }

    const handleAdd = () =>{
        const dataList = [...dataMap, []]
        if(dataList.length === 1)
            updateText("<u><strong><h2>Psych Assessment</h2></strong></u>")
        setDataMap(dataList)
        updateOptions()
    }

    return(
        <>
        {dataMap.map((data, i) => {
            return(
                <div key={i}>
                    <Cascader
                        expandTrigger={"hover"}
                        options={options}
                        showSearch={true}
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={symp => handleSympSelect(symp, i)}

                    />

                </div>
        )

            })}
            <Button type="primary" onClick={() => handleAdd()}>Add</Button>
            {
                symptoms.length >= 1?<Button type="primary" onClick={() => requestNote()}>Generate Note</Button>:<></>
            }
        </>


    )
}

export default Diagnosis