import React, { children } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import NotificationBar from "../../components/MobileNotification/MobileBar";




function MobileHomeTemplate({ children }) {

    return (
        <div className="pageTemplate container-fluid p-0 g-0" id="wrapper">
            <div className="row justify-content-end w-100 h-100 g-0">
                {/* NotificationBar starts here */}
                <NotificationBar/>
                {/* NotificationBar ends here */}

                {/* Page content starts here */}
                <div className="col-12">{children}</div>
                {/* Page content end here */}

                {/* BottomBar starts here */}
                {/* BottomBar ends here */}
            </div>
        </div>
    );
}

export default MobileHomeTemplate;