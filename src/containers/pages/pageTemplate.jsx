import React from "react";
import { Marginer } from "../../components//marginer/marginer";
import Sidebar from "../../components/sidebar/sidbar";
import NotificationBar from "../../components/notification/notificationBar";

function PageTemplate({ children }) {
  return (
    <div className="pageTemplate container-fluid p-0 g-0" id="wrapper">
      <div className="row justify-content-end w-100 h-100 g-0">
        {/* Sidebar starts here */}

        {/* <div className="col-2 g-0"> */}
        <Sidebar />
        {/* </div> */}

        {/* Sidebar ends here */}

        {/* <div className="col-10 g-0"> */}
        {/* Topbar starts here */}
        <NotificationBar />
        {/* Topbar ends here */}

        {/* Page content starts here */}
        <div className="col-9 mx-3 my-5">{children}</div>

        <Marginer direction="horizontal" margin={40} />
      </div>
      {/* </div> */}
    </div>
  );
}

export default PageTemplate;
