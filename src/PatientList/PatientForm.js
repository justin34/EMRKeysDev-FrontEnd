import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './PatientForm.css'
import Diagnosis from './Tabs/Diagnosis';
import PsycAssessment from './Tabs/PsycAssessment';
import {Tabs, Card, Layout, Button, Input, DatePicker} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from "dayjs";

const { Header, Content, Footer, Sider } = Layout;

// this is the implementation for the patient form/edit page
const PatientForm = () =>{
    const [patientData, setPatientData] =  useState({ // state for patient data with some sample data
        "id": -1,
        "name": "Jane Doe",
        "DOB": "1999-09-09",
        "notes": "This is the note",
        "profile_picture": "/media/profilePictures/DefaultProfilePic.png"
    });

    const [editPacient, setEditPacient] = useState(true) // bool to know if we are editing patient name and DOB
    const params = useParams() // params stored in url defined in index.js
    const patientId = params.patientId
    const userId =  params.userId




    const [editorValue, setEditorValue] = useState('') // store the text editor value
    const [doUpdateNote, setDoUpdateNote] = useState(false) // bool to know if we want to update the note


    const [profilePicture, setProfilePicture] = useState(patientData.profile_picture);
    const [pacientName, setPacientName] = useState();
    const [DOB, setDOB] = useState();
    useEffect(() => {
        axios.get("http://localhost:8000/patients/" + patientId).then(res => {

            const patient = res.data;
            if(patient.id !== patientData.id){
                setPatientData(patient);
                setEditorValue(patient.notes)
                setDoUpdateNote(true)
                setProfilePicture(patient.profile_picture)
                setDOB(dayjs(patient.DOB, "YYYY-MM-DD"))
                setPacientName(patient.name)
            }
            console.log("UPDATING")

        })

    }, [])


    function UpdateNote({ children }){ // updates the note by cloning the editor and replacing it with a new editor with the updated text
        if(!doUpdateNote) // if you dont have this the editor will constantly get cloned and you wont be able to type in the editor
            return children
        let childWithProps = React.cloneElement(children, {
                value: editorValue
            })
        setDoUpdateNote(false)

        updatePatientData()



        return childWithProps
    }

    function addTextToNote(text, replace=false)  { // replaces text in editor or adds to it
        if(replace)
            setEditorValue(text);
        else
            setEditorValue(editorValue + text);
        setDoUpdateNote(true)

    }

    const toggleEditPacient = () => { // toggles whether wh are on the patient edit screen

        setEditPacient(!editPacient);

        if(!editPacient){

            updatePatientData(pacientName, DOB)


        }
    }

    const updatePatientData = () => { // after we edit we update patient data
        if(!pacientName)
            setPacientName(patientData.name);
        if(profilePicture === null)

            return;
        if(!(DOB instanceof dayjs))
            setDOB(dayjs(patientData.DOB, "YYYY-MM-DD"))

        const newPatientData = new FormData();


        newPatientData.append('name', pacientName);
        newPatientData.append('DOB', dayjs(DOB).format('YYYY-MM-DD'));
        newPatientData.append("notes", editorValue)
        newPatientData.append('profile_picture', profilePicture);
        console.log(newPatientData)

        axios({
            method:"post",
            url: "http://localhost:8000/patients/" + patientId,
            data: newPatientData,
            headers: {"Content-Type": "multipart/form-data"}
        }).then(function (res){
            axios.get("http://localhost:8000/patients/" + patientId).then(res => {

                const patient = res.data;
                if(patient.id !== patientData.id){
                    setPatientData(patient);
                    setEditorValue(patient.notes)
                    setDoUpdateNote(true)
                }

            })
        }).catch(function (res){
            console.log(res);
        })

    }

    const setDate = (date, dateString) => {
        setDOB(dateString);
    }






    return (

        <Layout style={{
            backgroundColor: "white",
            height: "max-content"
        }}
        >
            <Sider
            style={{backgroundColor:"whitesmoke",}
            }
            width={"max-content"}>
                <Card
                    title="Patient"
                    bordered={false}
                    style={{
                        padding: "10px",
                        margin: "10px",
                        width: "200",
                        height: "min-content",
                    }
                    }

                >
                    {
                        editPacient?<div>
                    <img src={"http://localhost:8000" + patientData.profile_picture}
                         alt={"Patient Photo"}
                        width={200}
                        height={200}/>
                    <h2>{patientData.name}</h2>
                    <p>{patientData.DOB}</p>
                        </div>:<div>
                            <Input type="file" onChange={(file) => setProfilePicture(file.target.files[0])}/>
                            <Input size="large" placeholder={patientData.name} prefix={<UserOutlined />} onChange={(name) => setPacientName(name.target.value)} />
                            <DatePicker defaultPickerValue={dayjs(patientData.DOB, "YYYY-MM-DD")} defaultValue={dayjs(patientData.DOB, "YYYY-MM-DD")} onChange={setDate} />


                        </div>
                }
                    {
                    editPacient?<Button type='primary' onClick={() => toggleEditPacient()}>Edit Patient</Button>: <Button type='primary' onClick={() => toggleEditPacient()}>Done</Button>
                }
                </Card>
            </Sider>
            <Layout
                >
                <Content
                    >
                    <Tabs type={"card"}
                        items={[{
                            label: "Psyc Assessment",
                            key: 1,
                            children: <PsycAssessment updateText={ addTextToNote }/>,
                        },
                        ]
                    }

                    />
                </Content>
                <Sider
                    style={{backgroundColor:"whitesmoke",}
                    }
                    width={"max-content"}>
                    {
                        doUpdateNote?<UpdateNote>
                            <ReactQuill
                                value={editorValue}
                                onChange={(value) => {setEditorValue(value);}}
                                style={{width : "500px",
                                    height: "90%"}}
                            /></UpdateNote>:<ReactQuill
                            value={editorValue}
                            onChange={(value) => {setEditorValue(value);
                                updatePatientData()}}
                            style={{width : "500px",
                                height: "90%"}}
                        />
                    }



                </Sider>


            </Layout>

        </Layout>



)};
export default PatientForm;