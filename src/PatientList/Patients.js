import { Avatar, List, Radio, Space } from 'antd';
import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

// This is the implementation for the list patients page

const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];
const PatientList = () => {
    const [data, setData] =  useState([  // this is a state that holds the patient data


    ]);
    const params = useParams(); // this holds all the url paramaters as defined in index.js
    const userId = params.userId;

    // gets data from the backend and updates the data list
    axios.get("http://localhost:8000/users/" + userId + "/patients").then(res => {
        let patients = res.data;
        for(let i = 0; i < patients.length; i++){
            let added = false;
            for(let v = 0; v < data.length; v++){ // makes sure to not add duplicate data

                if(data[v].id === patients[i]["id"]){
                    added = true;
                }
            }
            if(!added) {
                setData(patients)}
        }
    })

    const [position, setPosition] = useState('bottom'); // state for the position of the list
    const [align, setAlign] = useState('center'); // state for alignment
    return (
        <>

            <List
                pagination={{
                    position,
                    align,
                }}
                dataSource={data} // every patient has a profile_picture, id, name, DOB, snd notes param
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar src={"http://localhost:8000" + item.profile_picture} />
                            }
                            title={<a href={"/patients/" + userId + "/" + item.id}>{item.name}</a>}
                            description={"Date of birth: "+item.DOB+ " Note: " + item.notes}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};
export default PatientList;