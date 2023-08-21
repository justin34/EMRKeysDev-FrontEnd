import React, { useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './PatientForm.css'
import Diagnosis from './Tabs/Diagnosis';
import {Tabs, Card, Layout, Button, Input, DatePicker} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from "dayjs";

const { Header, Content, Footer, Sider } = Layout;


const PatientForm = () =>{
    const [patientData, setPatientData] =  useState({
        "id": 1,
        "name": "Jane Doe",
        "DOB": "1999-09-09",
        "notes": "This is the note",
        "profile_picture": "/media/profilePictures/DefaultProfilePic.png"
    });
    const [editPacient, setEditPacient] = useState(true)
    const params = useParams()
    const patientId = params.patientId
    const userId =  params.userId

    const [editorValue, setEditorValue] = useState('');
    const [doUpdateNote, setDoUpdateNote] = useState(true)


    const [profilePicture, setProfilePicture] = useState();
    const [pacientName, setPacientName] = useState("");
    const [DOB, setDOB] = useState();



    function UpdateNote({ children }){
        if(!doUpdateNote)
            return children
        let childWithProps = React.cloneElement(children, {
                value: editorValue
            })
        setDoUpdateNote(false)

        return childWithProps
    }

    function addTextToNote(text, replace=false)  {
        if(replace)
            setEditorValue(text);
        else
            setEditorValue(editorValue + text);
        setDoUpdateNote(true)

    }

    const toggleEditPacient = () => {

        setEditPacient(!editPacient);

        if(!editPacient){

            if(!pacientName)
                setPacientName(patientData.name);
            if(profilePicture === null)
                return;
            if(!(DOB instanceof dayjs))
                setDOB(dayjs(patientData.DOB, "YYYY-MM-DD"));

            const newPatientData = new FormData();

            setEditorValue(editorValue + "<strong>Editing</strong>")
            setDoUpdateNote(true)

            newPatientData.append('name', pacientName);
            newPatientData.append('DOB', dayjs(DOB).format('YYYY-MM-DD'));
            //newPatientData.append('profile_picture', profilePicture,  profilePicture.name);
            console.log(newPatientData)

            axios({
                method:"post",
                url: "http://localhost:8000/patients/" + patientId,
                data: newPatientData,
                headers: {"Content-Type": "multipart/form-data"}
            }).then(function (res){
                console.log(res);
            }).catch(function (res){
                console.log(res);
            })
            setPacientName(patientData.name);
            setDOB(dayjs(patientData.DOB, "YYYY-MM-DD"));


        }
    }

    const setDate = (date, dateString) => {
        setDOB(dateString);
    }

    axios.get("http://localhost:8000/patients/" + patientId).then(res => {

            let patient = res.data;
            if(patient.id != patientData.id)
                setPatientData(patient);

    })




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
                            label: "Current Symptoms",
                            key: 1,
                            children: <Diagnosis updateText={addTextToNote}/>,

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
                                onChange={(value) => {setEditorValue(value);
                                    console.log(editorValue);}}
                                style={{width : "500px",
                                    height: "90%"}}
                            /></UpdateNote>:<ReactQuill
                            value={editorValue}
                            onChange={(value) => {setEditorValue(value);
                                console.log(editorValue);}}
                            style={{width : "500px",
                                height: "90%"}}
                        />
                    }



                </Sider>


            </Layout>

        </Layout>



)};
export default PatientForm;