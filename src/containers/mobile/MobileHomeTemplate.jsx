import React, { children } from "react";
import NotificationBar from "../../components/MobileNotification/MobileBar";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";

function MobileHomeTemplate({ children }) {

    return (
        <div className="pageTemplate container-fluid p-0 g-0" id="wrapper">
            <div className="">
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
        </div>
    );
}

export default MobileHomeTemplate;