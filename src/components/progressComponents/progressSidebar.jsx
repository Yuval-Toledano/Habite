import React, {useState, useEffect} from 'react'
import {auth, db} from "../../firebase"
import { ProgressCategoriesData } from "./progressCategoriesData";
import { ProgressCategoriesTitle, ProgressCategoriesIconDiv} from '../designSystem/common';
import { ProgressSidebarButton } from "../../components/button/button";
import StarIcon from "@material-ui/icons/Star";
import WidgetsIcon from "@material-ui/icons/Widgets";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";


function ProgressCategories(props) {

    return (
        <div className="row">
            <ul className="list-unstyled">
                <li className="row" key="Personal Journey" 
                id = "Personal Journey"
                className="ProgressCategoriesDiv">
                    <ProgressSidebarButton onClick={props.personal}>
                        <div className="d-flex justify-content-center">
                            <ProgressCategoriesIconDiv className="col-2 d-flex justify-content-center align-items-center">
                                <StarIcon />
                            </ProgressCategoriesIconDiv>
                            <ProgressCategoriesTitle className="col-10 d-flex justify-content-start align-items-center" id="progressBarTitle">
                                Personal Journey
                            </ProgressCategoriesTitle>
                        </div>
                    </ProgressSidebarButton>
                </li>
                <li className="row" key="Badge collection" 
                id = "Badge collection"
                className="ProgressCategoriesDiv">
                    <ProgressSidebarButton onClick={props.badge}>
                        <div className="d-flex justify-content-center">
                            <ProgressCategoriesIconDiv className="col-2 d-flex justify-content-center align-items-center">
                                <WidgetsIcon />
                            </ProgressCategoriesIconDiv>
                            <ProgressCategoriesTitle className="col-10 d-flex justify-content-start align-items-center" id="progressBarTitle">
                                Badge collection
                            </ProgressCategoriesTitle>
                        </div>
                    </ProgressSidebarButton>
                </li>
                <li className="row" key="Group journey" 
                id = "Group journey"
                className="ProgressCategoriesDiv">
                    <ProgressSidebarButton onClick={props.group}>
                        <div className="d-flex justify-content-center">
                            <ProgressCategoriesIconDiv className="col-2 d-flex justify-content-center align-items-center">
                                <SupervisorAccountIcon />
                            </ProgressCategoriesIconDiv>
                            <ProgressCategoriesTitle className="col-10 d-flex justify-content-start align-items-center" id="progressBarTitle">
                                Group journey
                            </ProgressCategoriesTitle>
                        </div>
                    </ProgressSidebarButton>
                </li>
            </ul>
        </div>
    )
}

export default ProgressCategories