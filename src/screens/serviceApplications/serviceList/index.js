import React from "react";
import { useSelector } from "react-redux";
import CustomerServiceList from './customerServiceList'
import OwnerServiceList from "./ownerServiceList";

function ServiceList() {
    const profile = useSelector(state => state?.profile)
    return (
        <div>
            {profile?.role === "CUSTOMER" && <CustomerServiceList />}
            {profile?.role === "OWNER" && <OwnerServiceList />}
        </div>
    )
}

export default ServiceList