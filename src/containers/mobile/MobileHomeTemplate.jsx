import React from "react";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";

function MobileHomeTemplate({ children }) {


    return (
        <div className="" id="wrapper" style={{overflow: "hidden"}}>
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