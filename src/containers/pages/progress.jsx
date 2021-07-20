import React, { useState } from "react";
import ProgressCategories from "../../components/progressComponents/progressSidebar";
import { PersonalProgressCard } from "../../components/progressComponents/progressPersonalCard";
import { GroupProgressCard } from "../../components/progressComponents/progressGroupCard";
import { BadgeProgressCard } from "../../components/progressComponents/progressBadgeCard";
import { Title, SubTitle } from "../../components/designSystem/common";
import { Separator } from '../../components/marginer/marginer';
import { Group } from "@material-ui/icons";

function ProgressPage() {

    var [progressCard, setProgressCard] = useState(<PersonalProgressCard />)

    function PersonalCard() {
        setProgressCard(progressCard = <PersonalProgressCard />)
    }

    function BadgeCard() {
        setProgressCard(progressCard = <BadgeProgressCard />)
    }

    function GroupCard() {
        setProgressCard(progressCard = <GroupProgressCard />)
    }

    return (
        <>
            <div className="content">
                {/* Page header */}
                <div className="header">
                    <Title>Progress</Title>
                    <SubTitle size={16}>
                        Track your personal and your group’s progress throughout the
                        challenges
                    </SubTitle>
                    <Separator />
                </div>
            </div>
            {/* Page content ends here */}
            <div className="row">
                <div className="col-3 progressCategories">
                    <ProgressCategories personal={PersonalCard} badge={BadgeCard} group={GroupCard}/>
                </div>
                <div className="col-9 progressCard">
                    {progressCard}
                </div>
            </div>
        </>
    );
}

export default ProgressPage;
