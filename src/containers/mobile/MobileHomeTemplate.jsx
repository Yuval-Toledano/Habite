import React from "react";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";

function MobileHomeTemplate({ children }) {
    
    function doSomething(value) {
        console.log("doSomething called by child with value:", value);
    }

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { doSomething });
        }
        return child;
        });

    console.log(childrenWithProps)


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
