import React from "react";
import { useSelector } from "react-redux";
import CustomerDashboard from "./customer";
import OwnerDashboard from "./owner";

function Dashboard() {
    const profile = useSelector(state => state?.profile)
    return (
        <div>
            {profile?.role === "CUSTOMER" && <CustomerDashboard />}
            {profile?.role === "OWNER" && <OwnerDashboard />}
        </div>
    )
}

export default Dashboard