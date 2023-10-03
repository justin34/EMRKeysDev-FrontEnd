import React, { useState } from "react";
import {Input, DatePicker, Button, Space, Select, Cascader} from "antd";
import "./styles.css"
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";


const MedicalHis = ({ updateText }) => {

    const [medicationMap, setMedicationMap] = useState([]) // Creates a list for medication objects to be added too
    const [medications, setMedications] = useState()

    const [medicalHisMap, setMedHisMap] = useState([])
    const [medicalHis, setMedicalHis] = useState([])
    const [medHisOptions, setHisOptions] = useState([{
        value:"Alzheimer’s/Dementia",
        label: "Alzheimer’s/Dementia",
        children: [
            {
                value:"Patient",
                label:"Patient"
            },
            {
                value: "Family",
                label: "Family Member"
            }
        ]
    }])


    const addMedication = (medication, i) =>{

    }

    const editDosage = (dosage, i) => {


    }

    const editDate = (date, dateString) => {

    }
    const handleAddMed = () => {
        const dataMap = [...medicationMap, []]
        if(dataMap.length === 1)
            updateText("<u><strong><h3>Medical History</h3></strong></u>")
        setMedicationMap(dataMap)


    }

    const handleAddMedHis = () => {
        const dataMap = [...medicalHisMap, []]
        setMedHisMap(dataMap)


    }


    const handleAlergAdd = () => {

    }

    const handleHisSelect = (his, i) => {
        let data = medicalHis
        if (data.length <= i){
            data = [...data, his]
        }else
            data[i] = his

        setMedicalHis(data)
    }

    const isFamily = (i) => {
        if(medicalHis.length <= i)
            return false

        if(medicalHis[i][1] === "Family")
            return true

        return false
    }


    return(
        <>
            <Space direction={"vertical"}>
                <div>
                    <h5>Current Medication</h5>
                    <hr/>
                </div>
                {medicationMap.map((data, i) => {  // map to add a number of medicaitons
                   return( <div key={i}>
                        <div className={"rowC"}>
                            <Space>
                                <Input style={{
                                    width: "50vh"
                                }} placeholder={"Medication"} onChange={(value) => addMedication(value.target.value, i)}></Input>
                                <Input placeholder={"Daily Dosage"} onChange={(value) => editDosage(value.target.value, i)}/>
                                <p>Start Date:</p>
                                <DatePicker onChange={editDate}/>
                            </Space>
                        </div>

                    </div>)


                })}

                <Button type="primary" onClick={() => handleAddMed()}>Add</Button>
                <br/>
                <div>
                    <h5>Allergies</h5>
                    <hr/>
                </div>
                <p>Type Allergies into the box below</p>
                <Select
                    mode="tags"
                    style={{
                        width:"100vh"
                    }}
                    onChange={handleAlergAdd}
                    tokenSeparators={[',']}
                />
                <p>other:</p>
                <TextArea/>
                <br/>
                {medicalHisMap.map((data, i) => {
                    return(
                        <div key={i}>
                            <Space>
                                <Cascader
                                    expandTrigger={"hover"}
                                    options={medHisOptions}
                                    showSearch={true}
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={history => handleHisSelect(history, i)}

                                />
                                {isFamily(i)?<Input placeholder={"Who? "}/>:<></> }
                            </Space>

                        </div>
                    )

                })}
                <Button type="primary" onClick={() => handleAddMedHis()}>Add</Button>
            </Space>

        </>
    )

}
export default MedicalHis