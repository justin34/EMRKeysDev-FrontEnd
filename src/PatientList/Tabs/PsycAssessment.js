import React, { useState } from "react";
import {useParams} from "react-router-dom";
import {Tabs} from "antd";
import MedicalHis from "./MedicalHis"
import axios from "axios";
import Diagnosis from "./Diagnosis";

// psych assessment Tab
const PsycAssessment = ({ updateText }) => {



    return(
        <>
        <Tabs type={"card"}
              items={[{
                  label: "Symptoms",
                  key: 1,
                  children: <Diagnosis updateText={ updateText }/>,

              },{
                  label: "MedicalHis",
                  key: 2,
                  children: <MedicalHis/>,
              }
              ]}


        />


        </>
    )

}
export default PsycAssessment