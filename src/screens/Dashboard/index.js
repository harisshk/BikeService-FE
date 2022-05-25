import React from "react";
import { useSelector } from "react-redux";
import CustomerDashboard from "./customer";

function Dashboard() {
    const profile = useSelector(state => state?.profile)
    return (
        <div>
            {profile?.role === "CUSTOMER" && <CustomerDashboard />}
            {/* {profile?.role === "OWNER" && <StudentDashboard />} */}
        </div>
    )
}

export default Dashboard