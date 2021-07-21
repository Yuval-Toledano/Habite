import React from "react";
import NotificationBar from "../../components/MobileNotification/MobileBar";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";
import { ModeCommentTwoTone } from "@material-ui/icons";

function MobileHomeTemplate({ children }) {
    const mode = children.mode;
    console.log("This is mode of pagetemplate:" + mode);

    return (
        <div className="" id="wrapper" mode={mode}>
            
                {/* NotificationBar starts here */}
                <NotificationBar/>
                {/* NotificationBar ends here */}

                {/* Page content starts here */}
                <div>
                    {children}
                </div>
                {/* Page content end here */}

                {/* BottomBar starts here */}
                <Bottombar/>
                {/* BottomBar ends here */}
            
        </div>
    );
}

export default MobileHomeTemplate;

