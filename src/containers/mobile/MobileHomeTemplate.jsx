import React, { children } from "react";
import NotificationBar from "../../components/MobileNotification/MobileBar";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";

function MobileHomeTemplate({ children }) {

    return (
        <div className="" id="wrapper">
            
                {/* NotificationBar starts here */}
                <NotificationBar/>
                {/* NotificationBar ends here */}

                {/* Page content starts here */}
                {children}
                {/* Page content end here */}

                {/* BottomBar starts here */}
                <Bottombar />
                {/* BottomBar ends here */}
            
        </div>
    );
}

export default MobileHomeTemplate;

