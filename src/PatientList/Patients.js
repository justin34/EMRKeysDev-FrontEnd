import { Avatar, List, Radio, Space } from 'antd';
import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];
const PatientList = () => {
    const [data, setData] =  useState([


    ]);
    const params = useParams();
    const userId = params.userId;

    axios.get("http://localhost:8000/users/" + userId + "/patients").then(res => {
        let patients = res.data;
        for(let i = 0; i < patients.length; i++){
            let added = false;
            for(let v = 0; v < data.length; v++){

                if(data[v].id == patients[i]["id"]){
                    added = true;
                }
            }
            if(!added) setData(prevState => [...prevState, {
                id: patients[i]["id"],
                name: patients[i]["name"],
                DOB: patients[i]["DOB"],
                notes: patients[i]["notes"]
            }]);
        }
    })

    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    return (
        <>

            <p>{JSON.stringify(data)}</p>
            <List
                pagination={{
                    position,
                    align,
                }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFyCHt4JOh--j6glcSf2pVsy884mnPwm1Qz6NkBdgiCmHO46jwp7kxCJO9viYZ2ZvRelw&usqp=CAU`} />
                            }
                            title={<a href="#">{item.name}</a>}
                            description={"Date of birth: "+item.DOB+ "Note: " + item.notes}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};
export default PatientList;