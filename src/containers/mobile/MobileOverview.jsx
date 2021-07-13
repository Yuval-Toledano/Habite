import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory, useParams } from "react-router-dom";

export default function Overview() {
    return (
        <div>
            <h1>This is the mobile overview page</h1>
        </div>
    );
}