import React, { useState, useEffect, useRef, state } from "react";
import { Children } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import NotificationBar from "../../components/MobileNotification/MobileBar";

function MobileHomeTemplate({ children }) {

    return (
        <div className="pageTemplate container-fluid p-0 g-0" id="wrapper">
            <div className="row justify-content-end w-100 h-100 g-0">
                <img src={Teal} alt="Upper background color" />
                {/* NotificationBar starts here */}
                
                {/* NotificationBar ends here */}

                {/* Page content starts here */}
                <div className="col-9 mx-3 my-5">{children}</div>
                {/* Page content end here */}

                {/* BottomBar starts here */}
                {/* BottomBar ends here */}
            </div>
        </div>
    );
}

export default MobileHomeTemplate;