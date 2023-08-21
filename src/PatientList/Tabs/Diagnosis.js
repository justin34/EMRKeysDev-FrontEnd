import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import {Select, Slider, Button} from "antd";
import axios from "axios";

const Diagnosis = ({ updateText }) => {

    const options = [{label:"Aggression", value: "Aggression"}, {label:"Agitation", value: "Agitation"},
                                              {label:"Anger", value: "Anger"}, {label:"Anxiety", value: "Anxiety"}];

    const [dataMap, setDataMap] = useState([])

    const [symptoms, setSymptoms] = useState([])

    const [aINote, setAINote] = useState("")

    const patientId = useParams().patientId




    const marks = {
        0: "None",
        25: "Mild",
        50: "Moderate",
        75: "Moderate to Severe",
        100: "Severe",
    }

    const handleSympSelect = (value, i) => {
        let temp = symptoms
        if(temp.length <= i){
            temp = [...symptoms, {
                symptom: value,
                severity: 0
            }]
            setSymptoms(temp)
            return;
        }

        temp[i].symptom = value
        setSymptoms(temp)
    };

    const requestNote = () => {
        const tempformatedSymptoms = symptoms;
        const lisToRem = []

        for (let i = 0; i < tempformatedSymptoms.length; i++){
            switch (symptoms[i].severity){
                case 0:
                    lisToRem.push(i);
                    break;
                case 25:
                    tempformatedSymptoms[i].severity = "mild";
                    break;
                case 50:
                    tempformatedSymptoms[i].severity = "moderate";
                    break;
                case 75:
                    tempformatedSymptoms[i].severity = "moderate to severe";
                    break;
                case 100:
                    tempformatedSymptoms[i].severity = "severe";
                    break;
                default:
                    lisToRem.push(i)

            }

            for(let i = 0; lisToRem.length; i++){
                tempformatedSymptoms.splice(lisToRem[i], 1)
            }


             let formatedSymptoms = { "symptoms": tempformatedSymptoms}

            updateAndPost(formatedSymptoms)

        }


    }

    const updateAndPost = (data) => {

        axios({
            method:"post",
            url: "http://localhost:8000/ainotes/" + patientId,
            data: data,
            headers: {"Content-Type": "application/json"}
        }).then(function (res){
            console.log(res);
            axios.get("http://localhost:8000/ainotes/" + patientId).then(res => {
                console.log(res.data)

                updateText(res.data[0]["note"])

            })
        }).catch(function (res){
            console.log(res);
        })


    }

    const handleSevaSelect = (value, i) => {
      const temp = symptoms;
      if(temp.length <= i) {
          alert("You must select a symptom first")
          return;
      }
      temp[i].severity = value;
      setSymptoms(temp);

      console.log(JSON.stringify(symptoms))
    }

    const handleAdd = () =>{
        const dataList = [...dataMap, []]
        if(dataList.length === 1)
            updateText("<u><strong><h2>Psych Assessment</h2></strong></u>")
        setDataMap(dataList)
    }

    return(
        <>
        {dataMap.map((data, i) => {
            return(
                <div key={i}>
                <Select
                    mode="single"
                    allowClear
                    showSearch={true}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={symp => handleSympSelect(symp, i)}
                    options={options}
                />
                <Slider marks={marks} step={null} defaultValue={0} onChange={(value) => handleSevaSelect(value, i)} />
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