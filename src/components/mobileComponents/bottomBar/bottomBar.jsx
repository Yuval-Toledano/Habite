import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';

function bottomBar(props) {

    return (
        <div className="row">
            <div className="col-3">
                <HomeIcon />
            </div>
            <div className="col-3">
                <ScatterPlotIcon />
            </div>
            <div className="col-3">
                <DashboardIcon />
            </div>
            <div className="col-3">
                <PersonIcon />
            </div>
        </div>
    )
}

export default ProgressCategories