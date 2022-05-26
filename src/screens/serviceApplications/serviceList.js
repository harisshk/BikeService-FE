import React, { useEffect, useState } from "react";
import Table from '../../components/Table'
import { Button } from "@mui/material";
import { AlertSnackbar } from "../../components/Snackbar";
import Loader from '../../components/Loader'
import { useSelector } from "react-redux";
import { getUserServices } from "../../services/servicesService";
import dateFormat from "dateformat";

const ServiceList = () => {
    const profileData = useSelector(data => data?.profile)
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const columns = [
        { title: "Owner Name", field: "owner.name" },
        { title: "Bike Make", field: "bike.bikeMake" },
        { title: "Bike Model", field: "bike.bikeModel" },
        { title: "Estimated amount", field: "serviceAmount" },
        { title: "Status", field: "status" },
        {
            title: "Booked for ",
            field: "createdAt",
            render: (rowData) => {
                return (
                    <div>
                        <p style={{ margin: "0px" }}>{dateFormat(rowData.bookedDate, "mmm dS, yyyy ")}
                        </p>
                    </div>
                );
            },
        },
    ];
    const fetchBikes = async () => {
        setIsLoading(true)
        const response = await getUserServices(profileData?.id)
        const { success, data } = response
        if (success) {
            setServices(data)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchBikes()
    }, [])
    return (
        <>
            <Table data={services} columns={columns} />
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={isLoading} />
        </>
    )
}

export default ServiceList