import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import './PatientForm.css'
import Diagnosis from './Tabs/Diagnosis';
import { Tabs , TabItemType, Card,Space , Layout} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Header, Content, Footer, Sider } = Layout;


const PatientForm = () =>{
    const [patientData, setPatientData] =  useState({
        "id": 8,
        "name": "Marry hill",
        "DOB": "1988-11-16",
        "notes": "This is the note",
        "profile_picture": "/media/profilePictures/DefaultProfilePic.png"
    });
    const params = useParams()
    const patientId = params.patientId
    const userId =  params.userId
    const [editorValue, setEditorValue] = useState('');

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
                        width: "min-content",
                        height: "min-content",
                    }
                    }

                >
                    <img src={"http://localhost:8000" + patientData.profile_picture}
                         alt={"Patient Photo"}
                        width={200}
                        height={200}/>
                    <h2>{patientData.name}</h2>
                    <p>{patientData.DOB}</p>
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
                            children: <Diagnosis/>,

                        },
                        ]
                    }

                    />
                </Content>
                <Sider
                    style={{backgroundColor:"whitesmoke",}
                    }
                    width={"max-content"}>

                    <ReactQuill
                        value={editorValue}
                        onChange={(value) => setEditorValue(value)}
                        style={{width : "500px",
                                height: "90%"}}
                    />

                </Sider>


            </Layout>

        </Layout>



)};
export default PatientForm;