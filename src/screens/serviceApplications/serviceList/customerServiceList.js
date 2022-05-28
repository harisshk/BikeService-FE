import React, { useEffect, useState } from "react";
import Table from '../../../components/Table'
import { AlertSnackbar } from "../../../components/Snackbar";
import Loader from '../../../components/Loader'
import { useSelector } from "react-redux";
import { getUserServices } from "../../../services/servicesService";
import dateFormat from "dateformat";
import ToolbarTab from "../../../components/Toolbar/Toolbar";
import { Chip } from 'primereact/chip';
import { addFilter, filterByType } from '../../../utils/FilterbyType/filterByType'

const CustomerServiceList = () => {
    const profileData = useSelector(data => data?.profile)
    const [services, setServices] = useState([])
    const [copyServices, setCopyServices] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const [filter, setFilter] = useState(["REQUESTED"])

    const columns = [
        { title: "Owner Name", field: "owner.name" },
        { title: "Bike Make", field: "bike.bikeMake" },
        { title: "Bike Model", field: "bike.bikeModel" },
        { title: "Estimated amount", field: "serviceAmount" },
        {
            title: "Status", field: "status",
            render: (rowData) => {
                switch (rowData?.status) {
                    case "PENDING":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#fff3c9", borderRadius: "10px", color: "#d68b00"
                        }} >
                            Pending
                        </p>)
                    case "REQUESTED":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#fff3c9", borderRadius: "10px", color: "#d68b00"
                        }} >
                            Requested
                        </p>)
                    case "COMPLETED":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#b2fa8e", borderRadius: "10px", color: "#267300"
                        }} >
                            Completed
                        </p>)
                    case "READYFORDELIVERY":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#b2fa8e", borderRadius: "10px", color: "#267300"
                        }} >
                            Ready for Delivery
                        </p>)
                    default:
                        break;
                }
            }
        },
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
    const fetchData = async () => {
        setIsLoading(true)
        const response = await getUserServices(profileData?.id)
        const { success, data } = response
        if (success) {
            console.log(data)
            filterByType(filter, data)
            setServices(filterByType(filter, data))
            setCopyServices(response.data)
        }
        else {
            setSnackbarOpen(false)
            setSnackbarInfo({
                message: "Cannot fetch data",
                variant: "error",
            })
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const filterHandlerType = (value) => {
        const response = addFilter(filter, value)
        setFilter(response)
        setServices(filterByType(response, copyServices))
    }
    const leftTabContents = (
        <React.Fragment>
            <div style={{ marginLeft: "10px", cursor: 'pointer' }} onClick={() => {
                filterHandlerType("REQUESTED")
            }}>
                <Chip label="Requested" style={(filter?.includes("REQUESTED")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff", cursor: 'pointer' } : { cursor: 'pointer' }} className={"toolbarButton"} />
            </div>
            <div style={{ marginLeft: "10px", cursor: 'pointer' }} onClick={() => {
                filterHandlerType("PENDING")
            }}>
                <Chip label="Pending" style={(filter?.includes("PENDING")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff", cursor: 'pointer' } : { cursor: 'pointer' }} className="toolbarButton" />
            </div>
            <div style={{ marginLeft: "10px", cursor: 'pointer' }} onClick={() => {
                filterHandlerType("READYFORDELIVERY")
            }}>
                <Chip label="Deliver Ready" style={(filter?.includes("READYFORDELIVERY")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff", cursor: 'pointer' } : { cursor: 'pointer' }} className="toolbarButton" />
            </div>
            <div style={{ marginLeft: "10px", cursor: 'pointer' }} onClick={() => {
                filterHandlerType("COMPLETED")
            }}><Chip label="Completed" style={(filter?.includes("COMPLETED")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff", cursor: 'pointer' } : { cursor: 'pointer' }} className="toolbarButton" /></div>
        </React.Fragment>
    )
    return (
        <>
            <ToolbarTab leftContents={leftTabContents} />
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

export default CustomerServiceList