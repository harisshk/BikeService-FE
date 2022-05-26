import React, { useEffect, useState } from "react";
import Table from '../../components/Table'
import { Button } from "@mui/material";
import { AlertSnackbar } from "../../components/Snackbar";
import Loader from '../../components/Loader'
import { useSelector } from "react-redux";
import { getUserBikes } from "../../services/bikeService";
import dateFormat from "dateformat";

const BikeList = () => {
    const profileData = useSelector(data=>data?.profile)
    const [bikes, setBikes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const columns = [
        { title: "Bike Make", field: "bikeMake" },
        { title: "Bike Model", field: "bikeModel" },
        { title: "Registration Number", field: "registrationNumber" },
        { title: "Engine Number", field: "engineNumber" },
        {
            title: "Added on",
            field: "createdAt",
            render: (rowData) => {
                return (
                    <div>
                        <p style={{ margin: "0px" }}>{dateFormat(rowData.createdAt, "mmm dS, yyyy ")}
                            <p style={{ color: "#999999", margin: "0px" }}>
                                {dateFormat(rowData.createdAt, "shortTime")}
                            </p>
                        </p>
                    </div>
                );
            },
        },
    ];
    const fetchBikes = async () => {
        setIsLoading(true)
        const response = await getUserBikes(profileData?.id)
        const { success, data } = response
        if (success) {
            setBikes(data)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchBikes()
    }, [])
    return (
        <>
            <Table data={bikes} columns={columns} />
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

export default BikeList